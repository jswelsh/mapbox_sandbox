var accessToken = 'pk.eyJ1IjoianN3ZWxzaCIsImEiOiJjazFqdXczOHYyNWNxM25udDE4bGh3cGozIn0.8uyxIS9Zv3y_QwVnwltlVg'; // add your access token here

var tzButton = document.getElementById('tz-button');
tzButton.onclick = getUserLocation;
    
function getUserLocation() {
  var loadingMessage = document.getElementById('loading-message');
  var returnMessage = document.getElementById('return-message');
  document.getElementById('loading-message').textContent = 'loading';

  function success(position) {
    var lon = position.coords.longitude;
    var lat = position.coords.latitude;
    var query = 'https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/' + lon + ',' + lat + '.json?access_token=' + accessToken;
    var loadingMessage = document.getElementById('loading-message');
    var returnMessage = document.getElementById('return-message');
    document.getElementById('loading-message').textContent = 'loading';
    $.ajax({
      method: 'GET',
      url: query,
    }).done(function(data) {
      var userTimezone = data.features[0].properties.TZID;
      loadingMessage.parentNode.removeChild(loadingMessage);
      returnMessage.textContent = 'You are in the ' + userTimezone + ' timezone.';
    });
  }
    function error() {
      loadingMessage.parentNode.removeChild(loadingMessage);
      returnMessage.textContent = 'Sorry, unable to determine your current location.';
    }
  navigator.geolocation.getCurrentPosition(success);
}