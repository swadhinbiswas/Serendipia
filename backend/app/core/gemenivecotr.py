from google import genai
from typing import Optional
from PIL import Image
from typing import List,Optional,Dict
import os 
import google.generativeai as superagent

class GeminiForVector:
  
  def __init__(self):
    self.GEMENI_API_KEY=os.getenv("GEMINI_API_KEY")
    self.client=genai.Client(api_key=self.GEMENI_API_KEY)
  
    
  
  def chattingwithAI(self,prompt:str)->dict:
    chat=self.client.create(model="gemini-2.0-flash")
    response=chat.send_message(prompt)
    return response.text
    
  
  def chatwithImage(self,image:str,prompt:Optional[str]=None)->dict:
    if not prompt:
      prompt="make a breif description of the image"
    image=Image.open(image)
    response=self.client.models.generate_content(
      model="gemini-2.0-flash",
      contents=[image,prompt]
      
    )
    return response.text
      
  def generate_embeddings_by_gemini(self, text:str):
    """
    This method will generate the embeddings for the given text.
    Args:
      text: str: The text for which the embeddings are to be generated.
    Returns:
      embeddings: list: The embeddings of the text.
      
    """
    result=self.client.models.embed_content(
      model="text-embedding-004",
      contents=text
      
    )
    embeddings=result.embeddings[0] 
    return embeddings
  

# class SuperAgents(GeminiForVector):
#   def __init__(self,sys_instractions:str):
#     super().__init__()
#     self.superagent.configure(api_key=self.GEMENI_API_KEY)
#     self.sys_instractions=sys_instractions
     
#   def create_agents(self,tools: Optional[FunctionLibraryType] = None, 
#     tool_config: Optional[ToolConfigType] = None)->dict:
#     agent=superagent.GenerativeModel(
#        "models/gemini-2.0-flash",
#     system_instruction=self.sys_instractions,
    
    
#     )
    


  
