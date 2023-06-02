FROM python:3.11.2

WORKDIR /backend

COPY requirements.txt .

# COPY ./.env /backend/.env

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# COPY ./app /backend/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]