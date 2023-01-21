FROM python:3.9

WORKDIR /app

COPY ./src/back /app
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]