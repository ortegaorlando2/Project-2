
from flask import Flask, render_template, jsonify, request
import requests
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, inspect, join, outerjoin, MetaData, Table
import psycopg2
import pandas as pd
import numpy as np
from secrets import username, password
import json
from config import connect_string


class Datalayer():

    def __init__(self):
        self.engine = create_engine(connect_string)


    def getRawDataFromDB(self):
        session = Session(self.engine)
        conn = self.engine.connect()

        mls = pd.read_sql_query("SELECT * FROM mls", conn)

        return mls

    def recordCount(self):  # Homes for sale
        conn = self.engine.connect()

        df = pd.read_sql_query("SELECT mls FROM mls", conn)
        df1 = round(df.mls.count())
        df_count = "{:,}".format(df1)
        return str(df_count)

    def avgPrice(self):  # Avg price for sale
        conn = self.engine.connect()

        df1 = pd.read_sql_query("SELECT list_price FROM mls", conn)
        df2 = round(df1.list_price.mean())
        df3 = "${:,.0f}".format(df2)
        avgPrice = str(df3)

        return str(avgPrice)

    def year(self):  # Avg year built
        conn = self.engine.connect()

        df4 = pd.read_sql_query("SELECT year_built FROM mls", conn)
        df5 = round(df4.year_built.mean())
        year = str(df5)
        return str(year)

    def dom(self):  # Avg days on market
        conn = self.engine.connect()

        df6 = pd.read_sql_query("SELECT dom FROM mls", conn)
        df7 = round(df6.dom.mean())
        dom = str(df7)
        return str(dom)

    def orlando(self):
        conn = self.engine.connect()

        df_in = pd.read_sql_query(
            "SELECT mls, full_address, zip, subdivision, list_price, bedrooms, total_baths, rating FROM mls", conn)
        df = df_in.to_dict()
        # df_o = df_in.to_json()
        # return jsonify(df_o)
        # return str(df_o)
        return df

    def df_to_geojson(self, df, properties, lat='latitude', lon='longitude'):
        
        # create a new python dict to contain our geojson data, using geojson format
        geojson = {'type': 'FeatureCollection', 'features': []}
        
        # loop through each row in the dataframe and convert each row to geojson format
        for _, row in df.iterrows():
            # create a feature template to fill in
            feature = {'type': 'Feature',
                'properties': {},
                'geometry': {'type': 'Point','coordinates': []}}

            # fill in the coordinates
            feature['geometry']['coordinates'] = [row[lon], row[lat]]

            # for each column, get the value and add it as a new feature property
            for prop in properties:
                feature['properties'][prop] = row[prop]

            # add this feature (aka, converted dataframe row) to the list of features inside our dict
            geojson['features'].append(feature)

        return geojson


    def convertToGeoJSon(self): # not retrieving df_to_geojson
        conn = self.engine.connect()

        mapdata = pd.read_sql_query("SELECT * FROM mls", conn)

        
        # Convert lat-long to floats
        mapdata['latitude'] = mapdata['latitude'].astype(float)
        mapdata['longitude'] = mapdata['longitude'].astype(float)

        # Kept Columns
        useful_cols = ['mls', 'year_built', 'bedrooms', 'full_baths','total_baths', 'list_price', 'market_area', 'full_address', 'latitude', 'longitude', 'rating']
        df_subset = mapdata[useful_cols]

        # Drop any rows that lack lat/long data
        df_geo = df_subset.dropna(
            subset=['latitude', 'longitude'], axis=0, inplace=False)
        

        df_geo = df_geo.applymap(str)
        

        # Columns for use as Properties
        useful_columns = ['mls', 'year_built', 'bedrooms', 'full_baths','total_baths', 'list_price', 'market_area', 'full_address', 'rating']

        geojson_dict = self.df_to_geojson(df_geo, properties=useful_columns)
        geojson_str = json.dumps(geojson_dict, indent=2)
        # print(geojson_str)
        return geojson_str
