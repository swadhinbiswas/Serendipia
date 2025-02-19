from pathlib import Path

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager



def gethtml()->str:
  chrome_options = Options()
  chrome_options.add_argument("--headless")
  chrome_options.add_argument("--no-sandbox")
  chrome_options.add_argument("--disable-dev-shm-usage")
  service = Service(ChromeDriverManager().install())
  driver = webdriver.Chrome(service=service, options=chrome_options)
  driver.get("https://duckduckgo.com/?q=DuckDuckGo+AI+Chat&ia=chat&duckai=1")
  html:str=driver.page_source or ""
  driver.quit()
  return html


def getduckaihtml()->str:
  html:str=gethtml()
  soup = BeautifulSoup(html,"html.parser")
  labels = soup.find_all("label")
  data={}
  for tag in labels:
    if tag.text:
      model_id = tag.attrs["for"]
      model_name = tag.text.split()[0].replace("-", "")
      data[model_name] = model_id
  return data


def write_models(data:dict[str,str],path:Path)->None:
  with open(path,'w') as file:
    file.write("from enum import Enum\n\n\nclass ModelType(Enum):\n")
    for k,v in data.items():
      file.write(f"  {k}='{v}'\n")
      
      
def main()->None:
  data:dict[str,str]=getduckaihtml()
  path=Path(__file__).parent / "duckmodel.py"
  write_models(data,path)
  print(f"Generate new models on {path}")
if __name__=="__main__":
  main()
  
  
