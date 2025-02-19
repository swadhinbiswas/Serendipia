from enum import Enum


class ModelType(Enum):
  GPT4o='gpt-4o-mini'
  Llama='meta-llama/Llama-3.3-70B-Instruct-Turbo'
  Claude='claude-3-haiku-20240307'
  o3mini='o3-mini'
  Mistral='mistralai/Mixtral-8x7B-Instruct-v0.1'
