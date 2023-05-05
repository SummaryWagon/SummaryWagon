import os
import requests
from bs4 import BeautifulSoup
from app.routers.info import find_og_info
from app.routers.keyword import find_keyword

skip_txt = {"", " "}
skip_word = {"수", "하는", "이", "더", "한", ""}


# ToDo : ChatGPT에게 보낼 텍스트 파싱 필요
def word_preprocess(url : str):
    response = requests.get(url)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Step 1: title, image 찾기
        title_and_image = find_og_info(soup)
        
        
        # Step 2: 단어 파싱하기
        find_all_p = soup.find_all('p')

        dict = {}
        
        # <p></p>를 한 줄씩 가져오기
        for p in find_all_p:
            
            # <p></p>의 txt 가져오기
            txt = p.text
            if txt in skip_txt:
                continue
            
            # txt -> list
            data_list = txt.split(" ")
            
            # list to dict
            for d in data_list:
                if d in skip_word or "." in d or len(d) == 1:
                    continue
                if dict.get(d) == None:
                    dict[d] = 1
                else:
                    dict[d] += 1
            
        sorted_dict = sorted(dict.items(), key = lambda item: item[1], reverse=True)
        
        # Step 3: 파싱한 단어 중에 가장 많이 나오는 단어 찾기 (keyword)
        keyword = find_keyword(sorted_dict[:10])
        
        
        return [title_and_image[0], title_and_image[1], keyword]
        