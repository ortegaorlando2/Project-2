from flask import Flask, render_template,jsonify
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
import psycopg2
import pandas as pd, requests, json
import json
from geojson import Feature, FeatureCollection, Point

app = Flask(__name__)


@app.route ('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.debug = True
    app.run()

