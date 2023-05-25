def find_keyword(sorted_dict):
    
    keyword_list = ["chatgpt", "ai", "bigdata"] # ToDo : 키워드 추가 필요
    visited = [0] * len(keyword_list)
    
    for k in sorted_dict:
        
        for i in range(len(keyword_list)):
            keyword = keyword_list[i]
            length = len(keyword)

            # keyword_list와 keyword가 같은지 체크 (keyword_list 단어의 단어 수로 앞에서 자름)
            if (keyword == k[0][:length].lower()):
                visited[i] += 1
        
    # 최대 인덱스 값 확인 
    frequent_kw = [0, 0] # idx, cnt 
    for i in range(len(visited)):
        if visited[i] > frequent_kw[1]:
            frequent_kw = [i, visited[i]]
    
    return keyword_list[frequent_kw[0]]
    