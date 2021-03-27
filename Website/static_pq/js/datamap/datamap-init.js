(function ($) {
    "use strict"; 

var map = new Datamap({
     scope: 'world',
     element: document.getElementById('world-datamap'),
     responsive: true,
     geographyConfig: {
         popupOnHover: false,
         highlightOnHover: false,
         borderColor: 'rgb(48, 194, 208)',
         borderWidth: 2,
         highlightBorderWidth: 5,
         highlightFillColor: '#fff',
         highlightBorderColor: 'rgba(255,255,255,0.1)',
         borderWidth: 1,
     },
     bubblesConfig: {
         popupTemplate: function (geography, data) {
             return '<div class="datamap-sales-hover-tooltip">' + data.country +'<span class="m-l-5"></span>'+ data.sold + '</div>'
         },
         borderWidth: 2,
         highlightBorderWidth: 5,
         highlightFillColor: '#fff',
         highlightBorderColor: 'rgba(255,255,255,0.1)',
         fillOpacity: 0.3
     },
     fills: {
         'Visited': 'rgb(0, 131, 143)',
         'neato': '#fff',
         'white': '#fff',
         defaultFill: 'rgb(25, 174, 188)'
     }
 });


 map.bubbles([
     {
         centered: 'USA',
         fillKey: 'white',
         radius: 10,
         sold:'$500,658,000',
         country:'United States'
     },
     {
         
     },
     {
         
     },
     {
         
     },
     {
         
     },
     {
         
     },
     {
         
     }
          ])


 window.addEventListener('resize', function (event) {
     map.resize();
 });

})(jQuery);