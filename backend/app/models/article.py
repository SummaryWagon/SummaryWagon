from pydantic import BaseModel
from datetime import datetime

class Request(BaseModel):
    id: str 
    topic: list[str] 
    date: datetime
    # 예시 API
    class Config:
        schema_extra = {
            "example" : {
                "id" : "jamiehun",
                "topic" : ["AI", "ML", "DL"],
                "date" : "2008-09-15T15:53:00+05:00"
            }
        }