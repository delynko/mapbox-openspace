mapboxgl.accessToken = 'pk.eyJ1IjoiZGVseW5rbyIsImEiOiJjaXBwZ3hkeTUwM3VuZmxuY2Z5MmFqdnU2In0.ac8kWI1ValjdZBhlpMln3w';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/delynko/cjh10hlxk045o2rn0vzayaxq9',
    center: [-105.27829964111288, 39.82865670291332],
    zoom: 12.5
});

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

const button = document.getElementById('basemap-button');

let x = 2;
let osFeatureLayer;
let parkLabelLayer;

let trailData;

$.getJSON('https://services3.arcgis.com/9ntQlfNHEhmpX4cl/arcgis/rest/services/Open_Space_Trail/FeatureServer/1/query?where=1%3D1&outFields=*&outSR=4326&f=geojson', (data) => {
    trailData = data;
});

map.on('load', () => {
    setTimeout(() => {
        afterLoad();
        mapEvents();
    });
});

const addMapSources = () => {
    if (map.getSource('trail') == undefined) {
        map.addSource('trail', {
            type: 'geojson',
            data: trailData
        });
    }
    
    if (map.getSource('os-feature') == undefined) {
        map.addSource('os-feature', {
            type: 'vector',
            url: 'mapbox://delynko.cjhaodngn00f5lmrut1wsnpz1-7ih1p'
        });
    }
}

const addMapLayers = (parkLabelLayer) => {
    if (map.getLayer('trail') == undefined) {
        map.addLayer({
            'id': 'trail',
            'type': 'line',
            'source': 'trail',
            // 'source-layer': 'OpenSpace_Trail',
            "layout": {
                "line-join": "round",
                "line-cap": "round",
            },
            "paint": {
                "line-color": "#000000",
                "line-width": 3,
                "line-dasharray": [2, 2],
            },
            'filter': ["==", "USER_TYPE", "Multi-Use"]
        }, parkLabelLayer);
    }
    
    if (map.getLayer('trail-hikeronly') == undefined) {
        map.addLayer({
            'id': 'trail-hikeronly',
            'type': 'line',
            'source': 'trail',
            // 'source-layer': 'OpenSpace_Trail',
            "layout": {
                "line-join": "round",
                "line-cap": "round",
            },
            "paint": {
                "line-color": "#ff0000",
                "line-width": 3,
                "line-dasharray": [2, 2],
            },
            'filter': ["==", "USER_TYPE", "Hiker Only"]
        });
    }

    if (map.getLayer('trail-nobikes') == undefined) {
        map.addLayer({
            'id': 'trail-nobikes',
            'type': 'line',
            'source': 'trail',
            // 'source-layer': 'OpenSpace_Trail',
            "layout": {
                "line-join": "round",
                "line-cap": "round",
            },
            "paint": {
                "line-color": "#ff00ff",
                "line-width": 3,
                "line-dasharray": [2, 2],
            },
            'filter': ["==", "USER_TYPE", "No Bikes"]
        });
    }

    if (map.getLayer('trail-labels') == undefined) {
        map.addLayer({
            'id': 'trail-labels',
            'type': 'symbol',
            'source': 'trail',
            // 'source-layer': 'OpenSpace_Trail',
            'layout': {
                "symbol-placement": "line",
                "text-field": "{TRAIL_NAME}",
                "text-letter-spacing": .2,
                "text-offset": [0, -1],
                "text-size": 12
            }
        });
    }

    if (map.getLayer('os-feature') == undefined) {
        map.addLayer({
            'id': 'os-feature',
            'type': 'symbol',
            'source': 'os-feature',
            'source-layer': 'OpenSpace_Feature',
            'layout': {
                'icon-image': '{TYPE}',
                'icon-size': .8,
            }
        });
    }

    if (map.getLayer('trail-hover') == undefined) {
        map.addLayer({
            'id': 'trail-hover',
            'type': 'line',
            'source': 'trail',
            // 'source-layer': 'OpenSpace_Trail',
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#ff0000",
                "line-width": 4
            },
            'filter': ["==", "MAP_LABEL", ""]

        });
    }
}

const mapEvents = () => {
    map.on('click', 'trail', (e) => {
        
        const coordinates = [e.lngLat.lng, e.lngLat.lat];
        const description = `<div>
                                <br>
                                <p>Trail Name: <strong>${e.features[0].properties.TRAIL_NAME}</strong></p>
                                <p>Usage: <strong>${e.features[0].properties.USER_TYPE}</strong></p>
                                <p>Difficulty: <strong>${e.features[0].properties.TRAIL_DIFF}</strong></p>
                                <p>Distance: <strong>${e.features[0].properties.MILEAGE_RO}</strong></p>
                                <img src="https://hikingtohealthy.files.wordpress.com/2012/10/rawhide-trail-1.jpg" style="height: 100px"/>
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
                                <br>
                                <p>Trail Name: <strong>${e.features[0].properties.TRAIL_NAME}</strong></p>
                                <p>Usage: <strong>${e.features[0].properties.USER_TYPE}</strong></p>
                                <p>Difficulty: <strong>${e.features[0].properties.TRAIL_DIFF}</strong></p>
                                <p>Distance: <strong>${e.features[0].properties.MILEAGE_RO}</strong></p>
                                <img src="https://hikingtohealthy.files.wordpress.com/2012/10/rawhide-trail-1.jpg" style="height: 100px"/>
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
                                <br>
                                <p>Trail Name: <strong>${e.features[0].properties.TRAIL_NAME}</strong></p>
                                <p>Usage: <strong>${e.features[0].properties.USER_TYPE}</strong></p>
                                <p>Difficulty: <strong>${e.features[0].properties.TRAIL_DIFF}</strong></p>
                                <p>Distance: <strong>${e.features[0].properties.MILEAGE_RO}</strong></p>
                                <img src="https://hikingtohealthy.files.wordpress.com/2012/10/rawhide-trail-1.jpg" style="height: 100px"/>
                            </div>`

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('click', 'os-feature', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.TYPE;

        const name = (dataName) => {
            if (dataName) {
                return dataName;
            } else {
                return '';
            }
        }

        const info = `<div>
                        <br>
                        <p>Feature Type: <strong>${descCase(description)}</strong></p>
                        <p>Name: <strong>${name(e.features[0].properties.NAME)}</strong></p>
                      </div>`;
        

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(info)
            .addTo(map);
    });

    map.on('mouseenter', 'os-feature', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'os-feature', function () {
        map.getCanvas().style.cursor = '';
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
}

const descCase = (d) => {
    switch(d) {
        case 'restroom':
            return 'Restroom';
            break;
        case 'parking':
            return 'Parking';
            break;
        case 'accesspoint':
            return 'Access Point';
            break;
        case 'residence':
            return 'Ranger/Caretaker Residence';
            break;
        case 'scenicview':
            return 'Scenic View';
            break;
        case 'campground':
            return 'Campground';
            break;
        default:
            return '';
            break;
    }
}

const afterLoad = () => {
    let layers = map.getStyle().layers;
    layers.map((layer) => {
        if (layer.id == 'jeffcoos-public (3)') {
            parkLabelLayer = layer.id;
        }
    });

    addMapSources();

    addMapLayers(parkLabelLayer);

    

};

button.addEventListener('click', () => {

    button.innerHTML == 'Jeffco Basemap' ? button.innerHTML = 'Aerial Imagery' : button.innerHTML = 'Jeffco Basemap';
    
    if (x % 2 == 0) {
            map.setStyle('mapbox://styles/delynko/cjhav901u00qz2rqk79n8acoa');
            map.on('style.load', () => {
                afterLoad();
            });
    }
    
    if (x % 2 != 0) {
        map.setStyle('mapbox://styles/delynko/cjh10hlxk045o2rn0vzayaxq9');
        map.on('style.load', () => {
            afterLoad();
        });
    }

    x += 1;

});