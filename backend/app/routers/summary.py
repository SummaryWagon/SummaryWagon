import openai
from decouple import config


OPENAI_API_KEY = config("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY


def summarize(text):

    model_engine = "text-davinci-003"

    max_tokens = 100
    
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

# text = '''Google is planning to make its search engine more "visual, snackable, personal, and human," with a focus on serving young people globally, the Wall Street Journal reported on Saturday, citing documents.

# The move comes as artificial intelligence (AI) applications such as ChatGPT are rapidly gaining in popularity, highlighting a technology that could upend the way businesses and society operate.

# The tech giant will nudge its service further away from "10 blue links," which is a traditional format of presenting search results and plans to incorporate more human voices as part of the shift, the report said.

# At its annual I/O developer conference in the coming week, Google is expected to debut new features that allow users to carry out conversations with an AI program, a project code-named "Magi," WSJ added, citing people familiar with the matter.

# Generative AI has become a buzzword this year, with applications capturing the public's fancy and sparking a rush among companies to launch similar products they believe will change the nature of work.

# Google, part of Alphabet Inc., did not immediately respond to Reuters' request for comment.'''

# print(summarize(text))