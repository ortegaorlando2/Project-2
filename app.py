from flask import Flask, render_template,json, jsonify, request
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
import psycopg2
import pandas as pd
from secrets import username, password
import json
import os


# Connect to sql database
rds_connection_string = f"{username}:{password}@localhost:5432/etl_team5"
engine = create_engine(f'postgresql://{rds_connection_string}')

conn=engine.connect()

print('connected')

app = Flask(__name__)


# Home route - landing page
@app.route ('/')
def index():
    return render_template('index.html')

# create route that renders map.html template
@app.route("/map")
def map():
    return render_template("map.html")

# create route that renders map.html template
@app.route("/orlando")
def orlado():
    return render_template("index_orlando.html")        

# create route that renders map.html template
@app.route("/scatter")
def scatter():
    return render_template("index_scatter.html")


# 404 error handling
@app.errorhandler(404)
def page_not_found(error):
    # directed to 404 html
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.debug = True
    app.run()

