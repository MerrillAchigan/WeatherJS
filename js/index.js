const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');

const apikey = 'a22973cfff3b959eeb60f875615b8653';

weatherForm.addEventListener('submit', async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeather(city);
            displayWeather(weatherData);

        }
        catch(error){
            console.log(error);
            displayError(error);
        }

    } else{
        displayError('enter a damn city nigga')
    }
});

async function getWeather(city){
    //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    //console.log(response);

    if(!response.ok){
        throw new Error('Couldnt fetch data');
    }

    return await response.json();
}

function displayWeather(data){
    //console.log(data);

    const {name: city, 
        main: {temp,humidity}, 
        weather:[{description, id}]} = data;

    card.textContent = '';
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const emojiDisplay = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent =`Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = getEmoji(id);

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    emojiDisplay.classList.add('emojiDisplay')

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}

function getEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
        return '⛈️';
        case(weatherId >= 300 && weatherId < 400):
        return '⛈️';
        case(weatherId >= 500 && weatherId < 600):
        return '🌧️';
        case(weatherId >= 600 && weatherId < 700):
        return '❄️';
        case(weatherId >= 600 && weatherId < 700):
        return '💨';
        case(weatherId === 800):
        return '🌤️';
        case(weatherId >= 801 && weatherId < 810):
        return '☁️';
        default:
            return '⁉️⁉️'
    }

}

function displayError(message){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;

    errorDisplay.classList.add('errorDisplay');

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}