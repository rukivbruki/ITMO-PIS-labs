FROM python:3.9

RUN groupadd -r uwsgi && useradd -r -g uwsgi uwsgi

#ARG requirments=requirements/development.txt

WORKDIR /app
COPY app /app
COPY requirements.txt /app/requirements.txt
COPY cmd.sh /
COPY Dockerfile /
COPY docker-compose.yml /

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 9090 9191
USER uwsgi

CMD ["sh", "/cmd.sh"]
