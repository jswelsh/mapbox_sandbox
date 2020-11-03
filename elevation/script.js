mapboxgl.accessToken = 'pk.eyJ1IjoianN3ZWxzaCIsImEiOiJjazFqdXczOHYyNWNxM25udDE4bGh3cGozIn0.8uyxIS9Zv3y_QwVnwltlVg';
  let map = new mapboxgl.Map({
    container: 'map', // Specify the container ID
    style: 'mapbox://styles/mapbox/outdoors-v11', // Specify which map style to use
    center: [-123.06, 49.25], // Specify the starting position [lng, lat]
    zoom: 12 // Specify the starting zoom
    //49.2827° N, 123.1207
  });
  
  let lng
  let lat;
  let lngDisplay = document.getElementById('lng');
  let latDisplay = document.getElementById('lat');
  let eleDisplay = document.getElementById('ele');
  
  let marker = new mapboxgl.Marker({
    'color': '#314ccd'
  });
  
  map.on('click', function(e) {
    // Use the returned LngLat object to set the marker location
    // https://docs.mapbox.com/mapbox-gl-js/api/#lnglat
    marker.setLngLat(e.lngLat).addTo(map);
    
    // Create variables set to the LngLat object's lng and lat properties
    lng = e.lngLat.lng;
    lat = e.lngLat.lat;
    
    getElevation();
  });
  
  function getElevation() {
    // Make the API request
    let query = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + lng + ',' + lat + '.json?layers=contour&limit=50&access_token=' + mapboxgl.accessToken;
    $.ajax({
      method: 'GET',
      url: query,
    }).done(function(data) {
      // Display the longitude and latitude values
      lngDisplay.textContent = lng.toFixed(2);
      latDisplay.textContent = lat.toFixed(2);
      // Get all the returned features
      let allFeatures = data.features;
      // Create an empty array to add elevation data to
      let elevations = [];
      // For each returned feature, add elevation data to the elevations array
      for (i = 0; i < allFeatures.length; i++) {
        elevations.push(allFeatures[i].properties.ele);
      }
      // In the elevations array, find the largest value
      let highestElevation = Math.max(...elevations);
      // Display the largest elevation value
      eleDisplay.textContent = highestElevation + ' meters';
    });
  }