# from openai import OpenAI

# client = OpenAI(
#     base_url="https://huggingface.co/api/inference-proxy/together",
#     api_key="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",
# )

# messages = [
#   {
#     "role": "system",
#     "content": "You are a teacher specializing in Object-Oriented Programming (OOP) using Python and Java.  Your primary focus is explaining OOP concepts.  You *must* answer questions that directly relate to OOP principles and their implementation in Python or Java.  You may also answer general questions about Python and Java *only if* they are asked in the context of OOP.  If a question about Python or Java does *not* relate to OOP, or if it's about any other topic entirely, respond *exclusively* with: 'I am sorry, I can't help you with that. I am only trained for Object-Oriented Programming.'  Do not provide any other explanations or answer unrelated questions, even if the user tries to rephrase or ask follow-up questions on non-OOP topics."
#   },

#   {
#     "role": "user",
#     "content": "can you make a project using java oop?"
#   }
# ]
# stream = client.chat.completions.create(
#     model="deepseek-ai/DeepSeek-R1",
#     messages=messages,
#     max_tokens=500,
#     # stream=True,
# )
# print(stream)


# from huggingface_hub import InferenceClient

# client = InferenceClient(
# 	provider="together",
# 	api_key="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"
# )


# stream = client.chat.completions.create(
# 	model="deepseek-ai/DeepSeek-R1", 
# 	messages=messages, 
# 	max_tokens=500,
# 	stream=True
# )

# for chunk in stream:
#     print(chunk.choices[0].delta.content, end="")

# class DeepSeek:
#     def __init__(self):
#         self.client = OpenAI(
#             base_url="https://api-inference.huggingface.co/v1/",
#             api_key="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",
#         )
    
#     def chat(self, messages):
#         stream = self.client.chat.completions.create(
#             model="deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
#             messages=messages,
#             max_tokens=500,
#             stream=True,
#         )
#         for chunk in stream:
#             return chunk.choices[0].delta.content
#     def get_response(self, prompt):
#         messages = [
#             {"role": "assistant", "content": "You are a teacher who specializes in Object-Oriented Programming using Python and Java. You must answer any question related to Object-Oriented Programming in Python or Java, or about Python and Java in general. If a question is about any other topic, respond with: 'I am sorry, I can't help you with that. I am only trained for Object-Oriented Programming.' Do not provide explanations or answer unrelated questions."},
            
#             {"role": "user", "content": prompt},
#         ]
#         return self.chat(messages)
      
      
      




import os
import requests

ACCOUNT_ID = "4c3204c25e3a7c329f55de9872f4c997"
AUTH_TOKEN = "WX6PJo8-3SanpSrjyy6NhN29DvP9cfnscYv-aO-O"

prompt = "Tell me all about PEP-8"
response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
    headers={"Authorization": f"Bearer {AUTH_TOKEN}"},
    stream=True,  # Enable streaming
    json={
        "messages": [
  {
    "role": "system",
    "content": "You are a teacher specializing in Object-Oriented Programming (OOP) using Python and Java.  Your primary focus is explaining OOP concepts.  You *must* answer questions that directly relate to OOP principles and their implementation in Python or Java.  You may also answer general questions about Python and Java *only if* they are asked in the context of OOP.  If a question about Python or Java does *not* relate to OOP, or if it's about any other topic entirely, respond *exclusively* with: 'I am sorry, I can't help you with that. I am only trained for Object-Oriented Programming.'  Do not provide any other explanations or answer unrelated questions, even if the user tries to rephrase or ask follow-up questions on non-OOP topics."
  },
  {
    "role": "assistant",
    "content": "Python is a high-level, interpreted language that supports Object-Oriented Programming with classes, objects, inheritance, and polymorphism.  These features allow developers to structure their code in a modular and reusable way, mirroring real-world objects and their interactions.  For example, a 'Car' class might have attributes like color and speed, and methods like 'accelerate' and 'brake'.  Java also offers similar OOP capabilities.  Both languages provide mechanisms for abstraction, encapsulation, inheritance, and polymorphism, which are the core principles of OOP."
  },
  {
    "role": "user",
    "content":"what is polymorphism ?"
  }
]
    }
)

# Ensure the response is valid
if response.status_code == 200:
    for chunk in response.iter_content(chunk_size=None):
        if chunk:  # Filter out keep-alive chunks
            print(chunk.decode("utf-8"), end="", flush=True) # Print in real-time
else:
    print(f"Error: {response.status_code} - {response.text}")