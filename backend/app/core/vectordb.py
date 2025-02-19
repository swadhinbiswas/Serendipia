import qdrant_client
from sentence_transformers import SentenceTransformer
from langchain.llms import Gemini  # For Gemini LLM
import os
import uuid  # For generating unique IDs

# Configuration (replace with your actual values)
QDRANT_URL = "http://localhost:6333"  # Or your Qdrant Cloud URL
GEMINI_API_KEY = os.environ.get("GOOGLE_API_KEY") # Get API Key from Environment
COLLECTION_NAME = "knowledge_base"
SIMILARITY_THRESHOLD = 0.8  # Adjust as needed

# Initialize clients and models
qdrant = qdrant_client.QdrantClient(url=QDRANT_URL)
embedding_model = SentenceTransformer("all-mpnet-base-v2")  # Or a suitable model
llm = Gemini(api_key=GEMINI_API_KEY)  # Initialize Gemini LLM

def create_qdrant_collection():
    """Creates the Qdrant collection if it doesn't exist."""
    try:
        qdrant.get_collection(COLLECTION_NAME)
        print(f"Collection '{COLLECTION_NAME}' already exists.")
    except qdrant_client.http.exceptions.NotFoundException:
        qdrant.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=qdrant_client.models.VectorParams(size=embedding_model.get_sentence_embedding_dimension(), distance=qdrant_client.models.Distance.COSINE),
        )
        print(f"Collection '{COLLECTION_NAME}' created.")

def add_data_to_qdrant(data):
    """Adds data (text chunks and embeddings) to the Qdrant collection with UUIDs."""
    points = []
    for chunk in data:
        embedding = embedding_model.encode(chunk)
        point_id = str(uuid.uuid4())  # Generate a UUID
        points.append(qdrant_client.models.PointStruct(id=point_id, vector=embedding, payload={"text": chunk}))
    qdrant.upsert(collection_name=COLLECTION_NAME, wait=True, points=points)

def answer_question(question):
    """Answers a question using Qdrant and Gemini."""
    question_embedding = embedding_model.encode(question)

    search_result = qdrant.search(
        collection_name=COLLECTION_NAME,
        query_vector=question_embedding,
        limit=5,  # Number of similar chunks to retrieve
    )

    best_match = search_result[0] if search_result else None

    if best_match and best_match.score >= SIMILARITY_THRESHOLD:
        print("Answer found in database!")
        return best_match.payload["text"]  # Return the text from the database

    else:
        print("Generating answer with Gemini...")
        context = "\n".join([point.payload["text"] for point in search_result]) if search_result else "No context found."
        prompt = f"Question: {question}\nContext: {context}\nAnswer:"
        gemini_answer = llm(prompt) # Get Gemini answer

        # Store the new answer in Qdrant for future use with UUID
        answer_embedding = embedding_model.encode(gemini_answer)
        new_point_id = str(uuid.uuid4())
        new_point = qdrant_client.models.PointStruct(id=new_point_id, vector=answer_embedding, payload={"text": gemini_answer, "question": question})
        qdrant.upsert(collection_name=COLLECTION_NAME, wait=True, points=[new_point])
        return gemini_answer

# Example usage:
create_qdrant_collection()

# Sample data (replace with your actual data)
sample_data = [
    "What is the capital of France?",
    "Paris is the capital and most populous city of France.",
    "The Eiffel Tower is a famous landmark in Paris.",
    "France is a country in Western Europe.",
    "The Louvre Museum is located in Paris."
]
add_data_to_qdrant(sample_data)

user_question = "What is the capital of France?"
answer = answer_question(user_question)
print(f"Answer: {answer}")

user_question = "What is the population of Paris?"  # Not in the database
answer = answer_question(user_question)
print(f"Answer: {answer}")

qdrant.close()