from types import TracebackType
from typing import AsyncGenerator,Self
from fake_useragent import UserAgent
import aiohttp
from .excptions import (
    DuckChatError,
    DuckChatConnectionError,
    DuckChatTimeout,
    RateLimitExceeded,
)
from app.duckai.duckmodel import ModelType
from app.duckai.model import History, Message
class DuckChatAPI:
  def __init__(self,model:str,
               session:aiohttp.ClientSession|None=None,
               user_agent:UserAgent|str=UserAgent(min_version=120.0),
  )->None:
    self.Modeltype=ModelType.model 
    
    if type(user_agent) is str:
      self.user_agent=user_agent
    else:
      self.user_agent=user_agent.random
    self._session=session or aiohttp.ClientSession(
        headers={
                "Host": "duckduckgo.com",
                "Accept": "text/event-stream",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                "Referer": "https://duckduckgo.com/",
                "User-Agent": self.user_agent,
                "x-vqd-4": "",
                "DNT": "1",
                "Sec-GPC": "1",
                "Connection": "keep-alive",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
                "TE": "trailers",
            }
    )
    self.vqd:list[str]=[]
    self.history:History=History(model,[])
    
  async def _aenter__(self)->Self:
    return self
  
  async def _aexit__(self,exc_type: type[BaseException]|None=None,
                     exc_value: BaseException|None=None
                     ,traceback: TracebackType|None=None)->None:
    await self._session.__aexit__(exc_type,exc_value,traceback)
    
    
  async def get_vqd(self)->None:
    async with self.get("https://duckduckgo.com/duckchat/v1/status", headers={"x-vqd-accept": "1"}) as response:
      if response.status==429:
        res=await response.read()
        try:
          err_message=self.__decoder