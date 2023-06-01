import spacy
nlp = spacy.load('en_core_web_sm')

def keyword_finder(text_all):
    
    doc = nlp(text_all)
    for sents in doc.sents:
        print(sents.text)

    return 1

     
    