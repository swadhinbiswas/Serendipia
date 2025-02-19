from typing import TypeDict,Union,List,Callable,Optional
import requests
import os

class SearchToolconfig(TypeDict):
  api_key:str
  engine_id:Optional[str]
  max_results:Optional[int]
  
  
class WeatcherToolconfig(TypeDict):
  api_key:str
  city:str
  country:str
  unit:str
  
class FunctionLibraryType(TypeDict):
  search:Callable[[str,SearchToolconfig],dict]
  weather:Callable[[str,WeatcherToolconfig],dict]
  
class ToolConfigType(TypeDict):
  search:SearchToolconfig
  weather:WeatcherToolconfig
  
class FunctionLibrary:
  def __init__(self):
    self.search_api_key=os.getenv("SEARCH_API_KEY")
    self.weather_api_key=os.getenv("WEATHER_API_KEY")
    
  def search(self,query:str,config:SearchToolconfig)->dict:
    url=f"https://api.serpapi.com/search?engine_id={config.engine_id}&q={query}&api_key={config.api_key}&num={config.max_results}"
    response=requests.get(url)
    return response.json()
  
  def weather(self,query:str,config:WeatcherToolconfig)->dict:
    url=f"https://api.openweathermap.org/data/2.5/weather?q={config.city},{config.country}&appid={config.api_key}&units={config.unit}"
    response=requests.get(url)
    return response.json()
  
  def create_agent(self,tools:Optional[FunctionLibraryType]=None,tool_config:Optional[ToolConfigType]=None)->dict:
    agent={
      "search":self.search,
      "weather":self.weather
    }
    return agent