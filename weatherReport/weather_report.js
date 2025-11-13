// Start Here
const apiKey = 'YOUR_API_KEY'; 

function validateLatLon(lat, lon){
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (
        isNaN(latitude) || latitude < -90 || latitude > 90 ||
        isNaN(longitude) || longitude < -180 || longitude > 180   
    ){
        return false;
    }
    return true;
}

function fetchPreparation_city(event){
    event.preventDefault();
    const cityInput = document.getElementById('city');
    const city = cityInput.value;
    const apiUrl_City = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    showweatherDetails(apiUrl_City);
    cityInput.value= "";
}

function fetchPreparation_latlon(event){
    event.preventDefault();
    const latInput = document.getElementById('lat');
    const lonInput = document.getElementById('lon');
    const lat = latInput.value.trim();
    const lon = lonInput.value.trim();

    if (!validateLatLon(lat, lon)){
        alert('Please enter valid latitude (-90 to 90) and longitude (-180 to 180) values.');
        return;
    }

    const apiUrl_LatLon = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    showweatherDetails(apiUrl_LatLon);
    latInput.value ="";
    lonInput.value ="";
}

function showweatherDetails(apiUrl){
    fetch (apiUrl)
    .then(response => response.json())
      .then(data => {
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                <p>Temperature: ${data.main.temp} &#8451;</p>
                                <p>Weather: ${data.weather[0].description}</p>`;
      })      
    
}

document.getElementById('weatherForm_City').addEventListener('submit', fetchPreparation_city );
document.getElementById('weatherForm_LatLon').addEventListener('submit', fetchPreparation_latlon );