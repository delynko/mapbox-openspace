mapboxgl.accessToken = 'pk.eyJ1IjoiZGVseW5rbyIsImEiOiJjaXBwZ3hkeTUwM3VuZmxuY2Z5MmFqdnU2In0.ac8kWI1ValjdZBhlpMln3w';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/delynko/cjh10hlxk045o2rn0vzayaxq9',
    center: [-105.27829964111288, 39.82865670291332],
    zoom: 12.5
});

map.on('load', () => {
    let osFeatureLayer;
    let parkLabelLayer;
    let layers = map.getStyle().layers;
    layers.map((layer) => {
        if (layer.id == 'openspace-feature'){
            osFeatureLayer = layer.id;
        }
        if (layer.id == 'jeffcoos-public (3)') {
            parkLabelLayer = layer.id;
        }
    })

    map.addSource('trail', {
        type: 'vector',
        url: 'mapbox://delynko.cjh6bllrs00m6hqocrmnbrgc7-3ulxp'
    });

    map.addLayer({
        'id': 'trail',
        'type': 'line',
        'source': 'trail',
        'source-layer': 'OpenSpace_Trail',
        "layout": {
            "line-join": "round",
            "line-cap": "round",
        },
        "paint": {
            "line-color": "#000000",
            "line-width": 2,
            "line-dasharray": [2, 2],
        },
        'filter': ["==", "USER_TYPE", "Multi-Use"]
    }, parkLabelLayer, osFeatureLayer);

    map.addLayer({
        'id': 'trail-hikeronly',
        'type': 'line',
        'source': 'trail',
        'source-layer': 'OpenSpace_Trail',
        "layout": {
            "line-join": "round",
            "line-cap": "round",
        },
        "paint": {
            "line-color": "#ff0000",
            "line-width": 2,
            "line-dasharray": [2, 2],
        },
        'filter': ["==", "USER_TYPE", "Hiker Only"]
    }, osFeatureLayer);

    map.addLayer({
        'id': 'trail-nobikes',
        'type': 'line',
        'source': 'trail',
        'source-layer': 'OpenSpace_Trail',
        "layout": {
            "line-join": "round",
            "line-cap": "round",
        },
        "paint": {
            "line-color": "#ff00ff",
            "line-width": 2,
            "line-dasharray": [2, 2],
        },
        'filter': ["==", "USER_TYPE", "No Bikes"]
    }, osFeatureLayer);

    map.addLayer({
        'id': 'trail-labels',
        'type': 'symbol',
        'source': 'trail',
        'source-layer': 'OpenSpace_Trail',
        'layout': {
            "symbol-placement": "line",
            "text-field": "{TRAIL_NAME}",
            "text-letter-spacing": .2,
            "text-offset": [0, -1],
            "text-size": 12
        }
    }, osFeatureLayer);

    map.addLayer({
        'id': 'trail-hover',
        'type': 'line',
        'source': 'trail',
        'source-layer': 'OpenSpace_Trail',
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#ff0000",
            "line-width": 4
        },
        'filter': ["==", "MAP_LABEL", ""]

    }, osFeatureLayer);

    map.on('click', 'trail', (e) => {
        
        const coordinates = [e.lngLat.lng, e.lngLat.lat];
        const description = `<div>
                                <p>Trail Name: <strong>${e.features[0].properties.TRAIL_NAME}</strong></p>
                                <p>Usage: <strong>${e.features[0].properties.USER_TYPE}</strong></p>
                                <p>Difficulty: <strong>${e.features[0].properties.TRAIL_DIFF}</strong></p>
                                <p>Distance: <strong>${e.features[0].properties.MILEAGE_RO}</strong></p>
                                <img src="https://hikingtohealthy.files.wordpress.com/2012/10/rawhide-trail-1.jpg" style="height: 350px"/>
                            </div>`

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('click', 'trail-hikeronly', (e) => {
        
        const coordinates = [e.lngLat.lng, e.lngLat.lat];
        const description = `<div>
                                <p>Trail Name: <strong>${e.features[0].properties.TRAIL_NAME}</strong></p>
                                <p>Usage: <strong>${e.features[0].properties.USER_TYPE}</strong></p>
                                <p>Difficulty: <strong>${e.features[0].properties.TRAIL_DIFF}</strong></p>
                                <p>Distance: <strong>${e.features[0].properties.MILEAGE_RO}</strong></p>
                                <img src="https://hikingtohealthy.files.wordpress.com/2012/10/rawhide-trail-1.jpg" style="height: 350px"/>
                            </div>`

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('click', 'trail-nobikes', (e) => {
        
        const coordinates = [e.lngLat.lng, e.lngLat.lat];
        const description = `<div>
                                <p>Trail Name: <strong>${e.features[0].properties.TRAIL_NAME}</strong></p>
                                <p>Usage: <strong>${e.features[0].properties.USER_TYPE}</strong></p>
                                <p>Difficulty: <strong>${e.features[0].properties.TRAIL_DIFF}</strong></p>
                                <p>Distance: <strong>${e.features[0].properties.MILEAGE_RO}</strong></p>
                                <img src="https://hikingtohealthy.files.wordpress.com/2012/10/rawhide-trail-1.jpg" style="height: 350px"/>
                            </div>`

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('mouseenter', 'trail', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'trail', function () {
        map.getCanvas().style.cursor = '';
    });

    map.on("mousemove", "trail", function(e) {
        map.setFilter("trail-hover", ["==", "MAP_LABEL", e.features[0].properties.MAP_LABEL]);
    });

    map.on("mouseleave", "trail", function() {
        map.setFilter("trail-hover", ["==", "MAP_LABEL", ""]);
    });

    map.on('mouseenter', 'trail-nobikes', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'trail-nobikes', function () {
        map.getCanvas().style.cursor = '';
    });

    map.on("mousemove", 'trail-nobikes', function(e) {
        map.setFilter("trail-hover", ["==", "MAP_LABEL", e.features[0].properties.MAP_LABEL]);
    });

    map.on("mouseleave", 'trail-nobikes', function() {
        map.setFilter("trail-hover", ["==", "MAP_LABEL", ""]);
    });

    map.on('mouseenter', 'trail-hikeronly', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'trail-hikeronly', function () {
        map.getCanvas().style.cursor = '';
    });

    map.on("mousemove", 'trail-hikeronly', function(e) {
        map.setFilter("trail-hover", ["==", "MAP_LABEL", e.features[0].properties.MAP_LABEL]);
    });

    map.on("mouseleave", 'trail-hikeronly', function() {
        map.setFilter("trail-hover", ["==", "MAP_LABEL", ""]);
    });

});







