FROM python:3.7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pip install -r requirements.txt

ENTRYPOINT ["flask"]
CMD ["run", "--port=443", "--host=0.0.0.0"]