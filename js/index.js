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
    const humidityDisplay = document.createElement('h1');
    const descDisplay = document.createElement('h1');
    const emojiDisplay = document.createElement('h1');

    cityDisplay.textContent = city;

    tempDisplay.textContent = `${temp}°K`;

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
}

function getEmoji(weatherId){

}

function displayError(message){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;

    errorDisplay.classList.add('errorDisplay');

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}