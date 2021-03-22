
// Store our API endpoint inside queryUrl
let queryUrl = "static/data/final_HAR_df.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(data => {
    
    // Sending our homes layer to the createMap function
    createMap();

    function createMap() {

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

        // Create an object to keep track of active layers and each layer with its markers
        const layers = {
            active: [],
            one: new L.LayerGroup(),
            two: new L.LayerGroup(),
            three: new L.LayerGroup(),
            four: new L.LayerGroup(),
            five: new L.LayerGroup()
        };

        // Initialize all of the LayerGroups
        layers.one = L.geoJson(data, {
            filter: function (feature, layer) {
                return (feature.properties.list_price <= 250000);
            },
            // Creates popup
            onEachFeature: function (feature, layer) {
                // console.log(layer)  // To test for function operation
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    feature.properties.list_price
                ) + '</p>'
            }
        })

        layers.two = L.geoJson(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.list_price >= 250000 &&
                    feature.properties.list_price <= 500000
                )
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    feature.properties.list_price
                ) + '</p>'
            }
        })

        layers.three = L.geoJson(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.list_price >= 500000 &&
                    feature.properties.list_price <= 750000
                )
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    feature.properties.list_price
                ) + '</p>'
            }
        })

        layers.four = L.geoJson(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.list_price >= 750000 &&
                    feature.properties.list_price <= 1000000
                )
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    feature.properties.list_price
                ) + '</p>'
            }
        })

        layers.five = L.geoJson(data, {
            filter: function (feature, layer) {
                return (feature.properties.list_price >= 1000000);
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    feature.properties.list_price
                ) + '</p>'
            }
        })

// Create an overlays object to add to the layer control
let overlayMaps = {
    "Up to $250K": layers.one,
    "$250K - $500K": layers.two,
    "$500K - $750K": layers.three,
    "$750K - $1M": layers.four,
    "Over $1M": layers.five
};

// Create our map, giving it the streetmap and homes layers to display on load
let myMap = L.map("map", {
    center: [
        29.7389278, -95.3651312
    ],
    zoom: 12,
    layers: [
        streetmap,
        layers.one,
        layers.two,
        layers.three,
        layers.four,
        layers.five
    ]
});

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
}

});