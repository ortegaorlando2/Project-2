<html>
<p align="center"><img width="100%" height="60px" src="static/Images/header.PNG"></p>            
<body>
<p>
The project provides a visualization of GeoJSON real estate data utilizing Leaflet, JavaScript, Mapbox, and deployed utilizing Flask and Heroku.

Data was sourced from the Houston Association of REALTORS® and downloaded as a .csv.<a href="https://www.HAR.com"> Visit HAR.</a>

Real Estate data lends itself naturally to maps and the downloaded data required transformation in Python and Jupyter Notebook to obtain a list of full addresses suitable for geocoding.  The geocoding was performed in Jupyter Notebook using Geopy and is a hour+ run. The code is commented out to allow code blocks to run in a reasonable time frame. Once geocoded the dataframe was was converted and saved as a [GeoJSON file](static/data/HAR.csv) and also as a [clean .csv file.](static/data/final_HAR_df.csv)  
<p align="center"><kbd><img width="500" height="auto" style= "border:3px solid black;" src="static/Images/geopy_code.PNG"></kbd>
  
The Geojson file as viewed in a JSON viewer:
<p align="center"><kbd><img width="500" height="auto" src="static/Images/JSON_viewer.PNG"></kbd>
  
The language JavaScript was used to code the primary map.  Using Leaflet the geojson file was read.  Street Map and Light Map layers were coded utilizing mapbox. These two layers are the base layers for the map and the user may choose which view they prefer.  Five layers were produced to create price bands for homes. The user may select one or more of the price bands to populate the map.  
<p align="center"><kbd><img width="500" height="auto" src="static/Images/layers.PNG"></kbd>
  
Custom icons were designed to color the homes of each price band differently.  When clicking on a home a popup displays the home's address, list price, number of bedrooms, and MLS number.

<p align="center"><kbd><img "width="360" height="auto" hspace="25" src="static/Images/popup.PNG"></kbd>&nbsp;&nbsp;<kbd><img width="124" height="auto" hspace="25" src="static/Images/icons.PNG"></kbd></p>

A sixth layer was coded to create a quasi heatmap of school quality and density of homes for sale. When the user activates the button "School Quality" the home locations will produce a circle marker colored to represent the school's rating by the state of Texas. 
<p align="center"><kbd><img width="600" height="auto" src="static/Images/schoollayer.PNG"></kbd>
  
The chart initially loads visualizing a street map view with all home price bands selected. 
<p align="center"><kbd><img width="600" height="auto" src="static/Images/map.PNG"></kbd>

The same geojson file was used to populate a table that allows the user to filter a list of homes by different metrics, e.g. zip code.

<a href="https://danawoodruff.github.io/Leaflet-challenge/">View GitHub-Page.</a> 

Users may view code at the following links:

To view the JavaScript code: [JavaScript Code](static/js/logic.js)<br>    //Add link location
To view the HTML code: [HTML Code](static/index.html)<br>                         //Add link location
To view the CSS code: [CSS code](static/css/style.css)</p>                 //Add link location

</body>
</html>
