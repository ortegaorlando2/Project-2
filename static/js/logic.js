
// Store our API endpoint inside queryUrl
let queryUrl = "static/data/final_HAR_df.geojson";

// Helper function to add commas to List Price popup
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

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

        //Attribution: "https://www.flaticon.com/authors/becris" 
        // Custom markers
        var homeIcon = L.icon({
            iconUrl: 'Images/home.svg',
            
            iconSize:     [15, 15], // size of the icon
            iconAnchor:   [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
        }); 

        var pinkIcon = L.icon({
            iconUrl: 'Images/pink.png',
            
            iconSize:     [15, 15], // size of the icon
            iconAnchor:   [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
        }); 

        var greenIcon = L.icon({
            iconUrl: 'Images/green.png',
            
            iconSize:     [15, 15], // size of the icon
            iconAnchor:   [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
        }); 

        var purpleIcon = L.icon({
            iconUrl: 'Images/purple.png',
            
            iconSize:     [15, 15], // size of the icon
            iconAnchor:   [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
        });
        
        var yellowIcon = L.icon({
            iconUrl: 'Images/yellow.png',
            
            iconSize:     [15, 15], // size of the icon
            iconAnchor:   [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
        });

        var blackIcon = L.icon({
            iconUrl: 'Images/black.png',
            
            iconSize:     [15, 15], // size of the icon
            iconAnchor:   [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
        });


        // Create an object to keep track of active layers and each layer with its markers
        const layers = {
            active: [],
            one: new L.LayerGroup(),
            two: new L.LayerGroup(),
            three: new L.LayerGroup(),
            four: new L.LayerGroup(),
            five: new L.LayerGroup(),
            six: new L.LayerGroup()
        };

        const choro = {
            six: new L.LayerGroup()
        };

        

        // Initialize all of the LayerGroups
        layers.one = L.geoJson(data, {
            filter: function (feature, layer) {
                return (feature.properties.list_price <= 250000);
            },

            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: pinkIcon});
            },

            // Creates popup
            onEachFeature: function (feature, layer) {
                // console.log(layer)  // To test for function operation
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.list_price)
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

            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: yellowIcon});
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.list_price)
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

            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: greenIcon});
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.list_price)
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

            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: purpleIcon});
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.list_price)
                ) + '</p>'
            }
        })

        layers.five = L.geoJson(data, {
            filter: function (feature, layer) {
                return (feature.properties.list_price >= 1000000);
            },

            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: blackIcon});
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.list_price)
                ) + '</p>'
            }
        })

        //********************************************************************************** */
    //     // Load in geojson data
    //     let geoData = "static/data/elem_heatmap.geojson";

    //     let lat = features.geometry.coordinates[1];
    //     let long = features.geometry.coordinates[0]

    //     // Grab data with d3  //https://www.technbuzz.com/2020/06/28/add-leaflet-markers-popup-and-circle/
    //     d3.json(geoData).then(function schoolMap() {
    //         let circleA = L.circle([lat, long], { //is lat,long in curly brackets?
    //             color: "green",
    //             fillColor: "green",
    //             fillOpacity: 0.5,
    //             radius: 100
    //         })
    //         let circleB = L.circle([lat, long], {
    //             color: "yellow",
    //             fillColor: "yellow",
    //             fillOpacity: 0.5,
    //             radius: 100
    //         })
    //         let circleC = L.circle([lat, long], {
    //             color: "orange",
    //             fillColor: "orange",
    //             fillOpacity: 0.5,
    //             radius: 100
    //         })
    //         let circleD = L.circle([lat, long], {
    //             color: "pink",
    //             fillColor: "pink",
    //             fillOpacity: 0.5,
    //             radius: 100
    //         })
    //         let circleF = L.circle([lat, long], {
    //             color: "red",
    //             fillColor: "red",
    //             fillOpacity: 0.5,
    //             radius: 100
    //         })

    //     let home = features.geometry.coordinates;
    //     home.forEach( (home,i) => {
    //         //"A" rated elementary school
    //         if (features.properties.rating = "A") {
    //             pointToLayer: function (feature, latlong) {
    //                 return L.circleMarker(latlong, circleA);
    //             }}
    //         //"B" rated elementary school
    //         else if (features.properties.rating = "B") {
    //                 pointToLayer: function (feature, latlong) {
    //                     return L.circleMarker(latlong, circleB);
    //                 }}
    //         //"C" rated elementary school
    //         else if (features.properties.rating = "C") {
    //                     pointToLayer: function (feature, latlong) {
    //                         return L.circleMarker(latlong, circleC);
    //                     }}
    //         //"D" rated elementary school
    //         else if (features.properties.rating = "D") {
    //                         pointToLayer: function (feature, latlong) {
    //                             return L.circleMarker(latlong, circleD);
    //                         }}
    //         //"F" rated elementary school
    //         else (features.properties.rating = "F") {
    //                             pointToLayer: function (feature, latlong) {
    //                                 return L.circleMarker(latlong, circleF);
    //                             }}

    //         })
    // }
    //**************************************************************************** */   
    // Load in geojson data
    // let geoData = "static/data/elem_heatmap.geojson";

    // function getColor(d) {
    //     return d = 'A' ? '#800026' :
    //         d = 'B'  ? '#BD0026' :
    //         d = 'C'  ? '#E31A1C' :
    //         d = 'D'  ? '#FC4E2A' :
    //         d = 'F'   ? '#FD8D3C' :
    //                     '#FFEDA0';
    // }
    // let geojson;

    //features.properties.rating
    //features.geometry.coordinates[0] and [1]

    // Grab data with d3
    // d3.json(geoData).then(function (schoolData) {

    //     // Create a new choropleth layer
    //     choro.six = L.choropleth(schoolData, {

    //         // Define what  property in the features to use
    //         valueProperty: "rating",

    //         // Set color scale
    //         scale: ["#ffffb2", "#b10026"],

    //         // Number of breaks in step range
    //         steps: 5,

    //         // Style
    //         mode: "q",
    //         style: {
    //             // Border color
    //             color: "#fff",
    //             weight: .8,
    //             fillOpacity: 0.5
    //         }
    //     })
    //************************************************************************** */
    // // Load in geojson data
    // let geoData = "static/data/elem_heatmap.geojson";

    // function getColor(d) {
    //     return d = 'A' ? '#800026' :
    //         d = 'B'  ? '#BD0026' :
    //         d = 'C'  ? '#E31A1C' :
    //         d = 'D'  ? '#FC4E2A' :
    //         d = 'F'   ? '#FD8D3C' :
    //                     '#FFEDA0';
    // }

    // choro.six = L.geoJson(geoData, {
    //     style: function (feature) {
    //         return {
    //             "color": getColor(feature.properties.rating),
    //             "opacity": 1,
    //         }
    //     }
    // })




    //*********************************************************************************** */
    // Create an overlays object to add to the layer control
    let overlayMaps = {
        "Up to $250K": layers.one,
        "$250K - $500K": layers.two,
        "$500K - $750K": layers.three,
        "$750K - $1M": layers.four,
        "Over $1M": layers.five,
        "School Quality": choro.six
    };

    // let schoolOverlay = {
    //     "School Quality": chloro.six
    // };

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
};

});