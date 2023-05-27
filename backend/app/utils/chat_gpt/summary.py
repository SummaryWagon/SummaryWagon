import openai
from decouple import config


OPENAI_API_KEY = config("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY


def summarize(text):

    model_engine = "text-davinci-003"

    max_tokens = 200
    
    prompt = f'''Summarize the paragraph below in 3 sentences. Put an newline between the sentences so that each sentence can be distinguished.

    {text}
    '''
    
    completion = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=0.3,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    sentencesList = completion.choices[0].text.strip().split(". ")
    result = []

    for sentence in sentencesList:
        if sentence[-1] != ".":
            sentence += "."
        result.append(sentence)

    return result