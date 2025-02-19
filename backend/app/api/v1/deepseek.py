from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

client = OpenAI(
    base_url=os.getenv("BASEURLFORHUGGINGFACE"),
    api_key=os.getenv("HG_DEEPSHEEKKEY"),
)

messages = [
#    {
#   "role": "system",
#   "content": "You are a teacher who specializes in Object-Oriented Programming using Python and Java. You must answer any question related to Object-Oriented Programming in Python or Java, or about Python and Java in general. If a question is about any other topic, respond with: 'I am sorry, I can't help you with that. I am only trained for Object-Oriented Programming.' Do not provide explanations or answer unrelated questions."
# },
  {"role": "assistant", "content": "Python is a high-level, interpreted language that supports Object-Oriented Programming with classes, objects, inheritance, and polymorphism."},
    {"role": "user", "content": "What is Python?"},
 
]

stream = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
    messages=messages,
    max_tokens=500,
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")



# import os
# import requests

# ACCOUNT_ID = "4c3204c25e3a7c329f55de9872f4c997"
# AUTH_TOKEN = "WX6PJo8-3SanpSrjyy6NhN29DvP9cfnscYv-aO-O"

# prompt = "Tell me all about PEP-8"
# response = requests.post(
#     f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
#     headers={"Authorization": f"Bearer {AUTH_TOKEN}"},
#     stream=True,  # Enable streaming
#     json={
#         "messages": [
#             {"role": "system", "content": "You are a friendly assistant"},
#             {"role": "user", "content": prompt}
#         ]
#     }
# )

# # Ensure the response is valid
# if response.status_code == 200:
#     for chunk in response.iter_content(chunk_size=None):
#         if chunk:  # Filter out keep-alive chunks
#             print(chunk.decode("utf-8"), end="", flush=True)  # Print in real-time
# else:
#     print(f"Error: {response.status_code} - {response.text}")