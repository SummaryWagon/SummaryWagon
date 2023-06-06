FROM python:3.11.2

WORKDIR /backend

COPY requirements.txt .

# COPY ./.env /backend/.env

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install -U pip setuptools wheel
RUN pip install -U spacy
RUN python -m spacy download en_core_web_sm

RUN wget https://chromedriver.storage.googleapis.com/113.0.5672.63/chromedriver_linux64.zip && \
    unzip chromedriver_linux64.zip -d /usr/bin/ && rm chromedriver_linux64.zip && chmod +x /usr/bin/chromedriver

RUN pip install webdriver-manager

COPY . .

# COPY ./app /backend/app

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000", "--reload"]