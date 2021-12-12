FROM python:3.10.0b4

WORKDIR /app
RUN groupadd -r uwsgi && useradd -r -g uwsgi uwsgi



COPY app /app
COPY requirements.txt /app/requirements.txt
COPY cmd.sh /

RUN pip install -r /app/requirements.txt

EXPOSE 9090 9191
USER uwsgi

CMD ["/cmd.sh"]
