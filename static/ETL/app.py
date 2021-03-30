from flask import Flask, render_template,json, jsonify, request
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy import create_engine 
import psycopg2
import pandas as pd
from secrets import username, password
import json
import os

app = Flask(__name__)

# Create Database Connection
# ----------------------------------
# Creates a connection to our DB
connection = psycopg2.connect(user="postgres",
                password="Chi1966!",
                host="127.0.0.1",
                port="5432",
                database="etl_team5")

areafinal20 = pd.read_sql('select * from areafinal20', connection)
elementary_table = pd.read_sql('select * from elementary_table', connection)
junction_table= pd.read_sql('select * from junction_table', connection)
mls = pd.read_sql('select * from mls', connection)
school_rating = pd.read_sql('select * from school_rating', connection)
zipfinal20 = pd.read_sql('select * from zipfinal20', connection)

@app.route ("/")
def index():
    return render_template("index.html")

@app.route ("/index_orlando")
def index_orlando():
    return render_template("/index_orlando.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
