""""
This module contains the class that will be used to generate the embeddings of the text.
For the Prototyping phase, we will use the API from Hugging Face to generate the embeddings.
or we will use Cloudeflaire  API to generate the embeddings.

"""
from qdrant_client import QdrantClient

from app.core.gemenivecotr import GeminiForVector
from google.genai import types
from qdrant_client.models import Distance, VectorParams,PointStruct
import re
import uuid 
import os 
from dotenv import load_dotenv
load_dotenv()

class VectorDB:
  def __init__(self):
    self.QDRANT_URL=os.getenv("QDRANT_URL")
    self.QDRABT_API_KEY=os.getenv("QDRANT_API_KEY")
    self.COllECTION_NAME=os.getenv("COLLECTION_NAME")
    self.QDRANT=QdrantClient(
      url=self.QDRANT_URL,
      api_key=self.QDRABT_API_KEY
    )
    
     
  def create_collection(self):
    """
    This method will create a collection in the Qdrant.
    Args:
      collection_name: str: The name of the collection to be created.
    Returns:
      response: dict: The response of the API.
    """
    response=self.QDRANTCLIENT.collections.create_collection(
      collection_name=self.COLLECTIONS_NAME,
      vector_config=VectorParams(
        dimension=1536,
        distance=Distance.Cosine
      )
    )
    
    return response

  def collection_exists(self):
    """
    This method will check if the collection exists in the Qdrant.
    Args:
      collection_name: str: The name of the collection to be checked.
    Returns:
      response: dict: The response of the API.
    """
    try:
      response=self.QDRANT.collections.get_collection(
        collection_name=self.COLLECTION_NAME
      )
      return response
    except Exception as e:
      return False
  
  
  def add_data_to_collection(self,question:str,answer:str):
    question_embedding=GeminiForVector().generate_embeddings_by_gemini(question)
    self.QDRANT.upsert(
      collection_name=self.COLLECTION_NAME,
      points=[(
        PointStruct(
          id=str(uuid.uuid4()),
          vector=question_embedding,
          payload={"question":question,"answer":answer}
        )
      )
      ]
     
    )
    
  def search_on_DATABSE(self,question:str):
    question_vector=GeminiForVector.generate_embeddings_by_gemini(question)
    search_result=self.QDRANT.search(
      collection_name=self.COLLECTION_NAME,
      query_vector=question_vector,
      limit=1
    )
   
    if search_result and search_result[0].score>=0.85:
      return search_result[0].payload["answer"]
    else:
      return None


  
    
    
         
      
    
