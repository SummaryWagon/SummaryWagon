import os
import requests
from bs4 import BeautifulSoup
from app.utils.bs4.info import find_og_info
from app.utils.thumbnail.image_resizing import *

file_path = "app/data/articles.txt"


""" BS4 동작 """
def bs4_preprocess(link: str):
    response = requests.get(link, headers={'User-Agent':'Mozilla/5.0'})
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
    else: # 예외처리 필요
        soup = " " 
    
    return soup 
    
    
""" Text 전체 파싱 """
def text_parsing(soup): # return = text_all    

    if (os.path.exists(file_path)):
        os.remove(file_path)

    f = open(file_path, "w")
    
    find_all_p = soup.find_all('p')
    
    skip_txt = {"", " "}
    text_all = str() 
    text_all += "'''"
    
    # <p></p>를 한 줄씩 가져오기
    for p in find_all_p:
        # <p></p>의 txt 가져오기
        txt = p.text
        if txt in skip_txt:
            continue
        f.write(txt)
        text_all += txt
    
    text_all += "'''"
    
    f.close()
    
    return text_all


""" 메모장에서 text 불러오기 """
def load_text():
    text = ''''''

    f = open(file_path, "r")

    while True:
        line = f.readline()
        if not line: break
        text += line
        
    return text


""" Title, Image 파싱 """
def og_parsing(soup): # return = [title, image, image_content_type]
    return find_og_info(soup)
