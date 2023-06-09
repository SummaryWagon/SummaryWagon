FROM python:3.11.2

WORKDIR /backend

COPY requirements.txt .
COPY .env .

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install -U pip setuptools wheel

RUN pip install -U spacy

RUN python -m spacy download en_core_web_sm

COPY ["./app", "./etc"] .

# CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000", "--reload"]