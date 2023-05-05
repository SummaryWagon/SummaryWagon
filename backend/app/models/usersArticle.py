from pydantic import BaseModel
from datetime import datetime


class User(BaseModel):
    links: list[str]

    class Config:
        schema_extra = {
            "example" : {
                "link": ["https://www.naver.com", "https://www.google.com"]
            }
        }


class Article(BaseModel):
    category: str 
    link: str 
    datetime: datetime
    title: str
    contents: list[str]
    image: str
    cnt: int

    class Config:
        schema_extra = {
            "example" : {
                "category": "AI",
                "link": "https://www.naver.com",
                "datetime" : "2008-09-15T15:53:00+05:00",
                "title": "Fundamental of AI",
                "content": ["foo", "bar", "baz"],
                "image": "https://www.naver.com",
                "cnt": 1
            }
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}