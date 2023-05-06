from pydantic import BaseModel
from datetime import datetime


class User(BaseModel):
    article_ids: list[str]

    class Config:
        schema_extra = {
            "example" : {
                "article_ids": ["1", "2"]
            }
        }


class Article(BaseModel):
    link: str 
    datetime: datetime
    title: str
    image: str
    cnt: int
    summary: list[str]
    description: str
    categories: list[str] 

    class Config:
        schema_extra = {
            "example" : {
                "link": "https://www.naver.com",
                "datetime" : "2008-09-15T15:53:00+05:00",
                "title": "Fundamental of AI",
                "image": "https://www.naver.com",
                "cnt": 1,
                "summary": ["foo", "bar", "baz"],
                "description": "foo bar baz",
                "categories": ["AI", "ML"]
            }
        }


def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}