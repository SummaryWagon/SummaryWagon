from fastapi import APIRouter

# from ..models.article import Article
from ..database import db

router = APIRouter(
    prefix="/articles",
    tags=["articles"],
)



