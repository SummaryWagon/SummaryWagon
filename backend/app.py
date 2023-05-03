from typing import Union
from fastapi import FastAPI 
from pydantic import BaseModel
import subprocess



class Request(BaseModel):
    id: str 
    topic: str 
    date: str 

# 예시 API
external_data = {
    "id" : "jamiehun",
    "topic" : "AI",
    "date" : "2023-05-03"
}

request = Request(**external_data)
# print(request.id)

app = FastAPI() 

@app.get("/")
def read_root():
    return {"Greetings" : "Hello, World"}

@app.get("/topic/")
def request_to_autoGPT():
    cmd = "./run.sh"
    process = subprocess.Popen(cmd, shell=True,
                                    stdout=subprocess.PIPE, 
                                    encoding="utf-8")
    
    while True:
        output = process.stdout.readline()
        
        if output:
            print(output.strip())
            print()

    return {"Mission" : "Completed"}

""" ToDo: 추후 api 통신에 활용 예정 """
@app.get("/topic_with_request/")
async def find_articles(request : Request):
     # 필요 : topic을 command에 넣기
    request = Request(**external_data)
    
    find_articles()
            
        # To Do : 종료 조건 
        
    return request