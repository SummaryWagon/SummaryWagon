from pydantic import BaseModel
from datetime import datetime


class addArticleDto(BaseModel):
    email: str
    link: str

    class Config:
        schema_extra = {
            "example": {
                "email": "test@test.com",
                "link": "testlink"
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