mapboxgl.accessToken = 'pk.eyJ1IjoianN3ZWxzaCIsImEiOiJjazFqdXczOHYyNWNxM25udDE4bGh3cGozIn0.8uyxIS9Zv3y_QwVnwltlVg';
 
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 2
});
var size = 200;
var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    onAdd: function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },
    render: function() {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;
        var radius = size / 2 * 0.3;
        var outerRadius = size / 2 * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(100, 255, 100, 1)';
        context.strokeStyle = 'pink';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();
        // update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, this.width, this.height).data;
        // keep the map repainting
        map.triggerRepaint();
        // return `true` to let the map know that the image was updated
        return true;
    }
};
 
map.on('load', function () {
    function success(position) {
        var lon = position.coords.longitude;
        var lat = position.coords.latitude;
        var loadingMessage = document.getElementById('loading-message');
        var returnMessage = document.getElementById('return-message');
        document.getElementById('loading-message').textContent = 'loading';
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
        loadingMessage.parentNode.removeChild(loadingMessage);
        if(lat > 0) {
            if(lon > 0) {
                returnMessage.textContent = 'You are in the ' + lat.toFixed(2) + ' North' + ' by ' + lon.toFixed(2) + ' East' 
            } else {
                returnMessage.textContent = 'You are in the ' + lat.toFixed(2) + ' North' + ' by ' + Math.abs(lon.toFixed(2)) + ' West' 
            }
        } else {
            if(lon > 0) {
                returnMessage.textContent = 'You are in the ' +  Math.abs(lat.toFixed(2)) + ' South' + ' by ' + lon.toFixed(2) + ' East'                 
            } else {
                returnMessage.textContent = 'You are in the ' +  Math.abs(lat.toFixed(2)) + ' South' + ' by ' +  Math.abs(lon.toFixed(2)) + ' West'                 
            }
        }
        

        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [lon, lat]
                            }
                        }]
                    }
                },
            "layout": {
                "icon-image": "pulsing-dot"
            }
        });
        map.flyTo({
            // These options control the ending camera position: centered at
            // the target, at zoom level 9, and north up.
            center: [lon, lat],
            zoom: 11,
            bearing: 0,
             
            // These options control the flight curve, making it move
            // slowly and zoom out almost completely before starting
            // to pan.
            speed: 0.7  , // make the flying slow
            curve: 1, // change the speed at which it zooms out
             
            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: function (t) { return t; }
            });
    }
    function error() {
        loadingMessage.parentNode.removeChild(loadingMessage);
        returnMessage.textContent = 'Sorry, unable to determine your current location.';
      }
    navigator.geolocation.getCurrentPosition(success)
});