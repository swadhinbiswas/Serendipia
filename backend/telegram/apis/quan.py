import os
from openai import OpenAI
# OPENAI_API_KEY = os.getenv("OPEN_AI_API_KEY")

client = OpenAI(
    api_key="sk-93ee9571784f473b9882e82c0e9962ba",
    base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
)
completion = client.chat.completions.create(
    model="qwen-plus",
    messages=[
        {'role': 'system', 'content': 'You are a helpful assistant.'},
        {'role': 'user', 'content': 'tell me about Object oriented Programming?'}
        ],
    stream=True
    )
full_content = ""
print("Streaming output content is:")
for chunk in completion:
    full_content += chunk.choices[0].delta.content
    with open("output.txt", "a") as file:
        file.write(chunk.choices[0].delta.content)
    print(chunk.choices[0].delta.content)
print(f"Full content is: {full_content}")