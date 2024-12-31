FROM python:3-slim

RUN apt update && apt install tesseract-ocr -y

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["flask", "run"]

