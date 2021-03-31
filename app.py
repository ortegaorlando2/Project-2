from flask import Flask, render_template,json, jsonify, request
import requests
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
import psycopg2
import pandas as pd
from secrets import username, password
import json
import os
from datalayer import Datalayer

#Work around to guarantee logic.js does not cache
#Only necessary during development
def dir_last_updated(folder):
    return str(max(os.path.getmtime(os.path.join(root_path, f))
                for root_path, dirs, files in os.walk(folder)
                for f in files))

db = Datalayer()
print('connected')

app = Flask(__name__)


# Home route - landing page
@app.route ('/')
def index():
    mls_count = db.recordCount()  #Homes on Market
    price = db.avgPrice()  #Avg price for sale
    year = db.year()  #Avg year built
    dom = db.dom()  #Avg days on market
    return render_template('index.html',mls_count=mls_count,price=price,year=year,dom=dom)


# create route that renders map.html template
@app.route("/orlando")
def orlado():
    return render_template("index_orlando.html")        

# create route that renders map.html template
@app.route("/scatter")
def scatter():
    return render_template("index_scatter.html")
    
@app.route("/filter_table")
def filter_table():
    return render_template("index_orlando.html")
    

@app.route("/map")

def map():
    return render_template("map.html")

@app.route("/map_geojson")
def map_geojson():
    return db.convertToGeoJSon()








    #return render_template("map.html")
    

    # # Old option
    # # Getting data from SQL
    # mls_df = db.getRawDataFromDB()
    # geojson = db.convertToGeoJSon(mls_df)
    # # check name of file being passed to map.html
    # return render_template("map.html",data=jsonify(geojson))

    

#### ERRORS ################################
# 404 error handling
@app.errorhandler(404)
def page_not_found(error):
    # directed to 404 html
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.debug = True
    app.run()


