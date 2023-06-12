import openai
from decouple import config
from ..bs4.preprocess import text_parsing, bs4_preprocess
from .count import num_tokens_from_string

OPENAI_API_KEY = config("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

maximum_token_length = 4096
maximum_context_length = 4 * 4096


def summarize(text):
    model_engine = "text-davinci-003"
    # 세 문장(영어) 평균 75토큰
    max_tokens = 100

    prompt = f'''Summarize the text below in 3 sentences.
    [Start of text]
    {text}
    [End of text]'''

    total_tokens = num_tokens_from_string(prompt, model_engine)

    if total_tokens + max_tokens > maximum_token_length:
        prompt_chunks = [prompt[i:i+maximum_context_length] for i in range(0, len(prompt), maximum_context_length)]
    else:
        prompt_chunks = [prompt]

    response = []

    for chunk in prompt_chunks:
        completion = openai.Completion.create(
        engine=model_engine,
        prompt=chunk,
        max_tokens=max_tokens,
        temperature=0.3,
        )
        completions = completion.choices[0].text.strip()
        response.append(completions)

    sentences = " ".join(response).split(". ")
    result = []

    for sentence in sentences:
        if sentence[-1] != ".":
            sentence += "."
        result.append(sentence)

    return result