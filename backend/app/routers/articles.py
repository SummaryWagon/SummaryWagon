from fastapi import APIRouter
import subprocess

# from ..models.article import Article
from ..database import db

router = APIRouter(
    prefix="/articles",
    tags=["articles"],
)


@router.get("/")
async def read_articles():
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
@router.get("/topic_with_request/")
async def find_articles():
     # 필요 : topic을 command에 넣기
     return {"Mission" : "Completed"}