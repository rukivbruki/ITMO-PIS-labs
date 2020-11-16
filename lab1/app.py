from flask import Flask
import os
import socket

app = Flask(__name__)

@app.route("/")
def hello():

    import sqlite3
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()
    try:
        cursor.execute('''CREATE TABLE increment (d text)''')
    except Exception as e:
        print('DB already created')

    html = "<h3>Hello!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>"
    return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname())


@app.route("/plus")
def plus():
    import sqlite3
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()
    date = "21/9/2020"
    cursor.execute('INSERT INTO increment VALUES ("21/9/2020")')
    conn.commit()

    ## get how many times the page has been visited
    cursorForCount = conn.cursor()
    cursorForCount.execute('SELECT COUNT(*) from increment')
    html = f"<h3>{cursorForCount.fetchone()}</h3>"
    return html

if __name__ == "__main__":
    app.run(host ='0.0.0.0', port = 80)
