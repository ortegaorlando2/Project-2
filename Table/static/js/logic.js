
// Store our API endpoint inside queryUrl
let queryUrl = "static/data/final_HAR_df.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(data => {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(homeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the address and price of home
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.full_address +
            "</h3><hr><p>" + "$" + feature.properties.list_price) + "</p>";
    }

    // Create a GeoJSON layer containing the features array on the homeData object
    // Run the onEachFeature function once for each piece of data in the array
    let homes = L.geoJSON(homeData, {
        onEachFeature: onEachFeature
    });

    // Sending our homes layer to the createMap function
    createMap(homes);
}

function createMap(homes) {

    // Define streetmap and lightmap layers
    let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    let baseMaps = {
        "Street Map": streetmap,
        "Light Map": lightmap
    };

    // Create overlay object to hold our overlay layer
    let overlayMaps = {
        Homes: homes
    };

    // Create our map, giving it the streetmap and homes layers to display on load
    let myMap = L.map("map", {
        center: [
            29.7389278, -95.3651312
        ],
        zoom: 12,
        layers: [streetmap, homes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}