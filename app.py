from flask import Flask, render_template,jsonify
import pandas as pd
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
import psycopg2

app = Flask(__name__)


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:(#2020)MagHou@localhost:5432/etl_team5")
conn = psycopg2.connect(database="etl_team5", user = "postgres", password="(#2020)MagHou", host="localhost")
mycursor =conn.cursor()

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)


@app.route ('/')
def home():
    results = engine.execute("select * from elementary_table fetch first 10 rows only").fetchall()
    print(results)
    return render_template('index_play.html')



@app.route("/elem_school")
def elem_school():
    mycursor.execute("SELECT * FROM elementary_table")
    data = mycursor.fetchall()
    # display_data = jsonify(data)
    return render_template('elem_school.html', data=data)



if __name__ == '__main__':
    app.debug = True
    app.run()

