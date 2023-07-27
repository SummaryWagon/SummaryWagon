FROM python:3.11.2-slim

WORKDIR /backend

COPY requirements.txt .env .

RUN pip install --no-cache-dir -r requirements.txt && \
    pip install -U pip setuptools wheel && \
    pip install -U spacy && \
    python -m spacy download en_core_web_sm && \
    python -c "import nltk; nltk.download('punkt')"

COPY ["./app", "./etc"] .