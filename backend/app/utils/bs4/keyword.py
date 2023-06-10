from .textrank import TextRank4Keyword

def keyword_finder(content):
    tr4w = TextRank4Keyword()
    tr4w.analyze(content, candidate_pos = ['NOUN', 'PROPN'], window_size=4, lower=False)
    top10_keywords = tr4w.get_keywords(10)
    
    main_keyword = [k for k, v in top10_keywords.items()]
    return main_keyword[:2]

     
    