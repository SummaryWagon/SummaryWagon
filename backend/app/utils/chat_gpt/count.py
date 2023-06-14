import tiktoken, nltk

maximum_token_length = 3895 # 4096 - 200 - 1


def split_prompt(string: str, model: str) -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.encoding_for_model(model)
    sentences = nltk.sent_tokenize(string)
    
    num_tokens = 0
    next = 0
    prompt_chunks = []

    for i in range(len(sentences)):
        num_tokens += len(encoding.encode(sentences[i]))

        if num_tokens > maximum_token_length:
            prompt_chunks.append(" ".join(sentences[:i]))
            num_tokens = len(encoding.encode(sentences[i]))
            next = i

        if i == len(sentences) - 1:
            prompt_chunks.append(" ".join(sentences[next:]))
    
    return prompt_chunks