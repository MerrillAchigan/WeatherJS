const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');

const apikey = 'a22973cfff3b959eeb60f875615b8653';

weatherForm.addEventListener((submit), event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){

    } else{
        displayError('goddamn dumbahh enter a City')
    }
});

async function getWeather(city){

}

function displayWeather(data){

}

function getEmoji(weatherId){

}

function displayError(message){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;

    errorDisplay.classList.add('errorDisplay');

    card.textContent = '';
    card.computedStyleMap.display = 'flex';
    card.appendChild(errorDisplay);
}