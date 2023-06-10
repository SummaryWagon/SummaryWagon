import openai
from decouple import config
from ..bs4.preprocess import text_parsing

OPENAI_API_KEY = config("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY


def summarize(text):

    model_engine = "text-davinci-003"
    # 세 문장(영어) 평균 75토큰
    max_tokens = 100
    
    prompt = f'''Summarize the paragraph below in 3 sentences.

    {text}
    '''
    
    completion = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=0.3,
    )
    
    sentencesList = completion.choices[0].text.strip().split(". ")
    result = []

    for sentence in sentencesList:
        if sentence[-1] != ".":
            sentence += "."
        result.append(sentence)

    return result

# # test
# link = 'https://www.computerworld.com/article/3696233/it-is-driving-new-enterprise-sustainability-efforts.html'
# text = text_parsing(link)
# print(summarize(text))