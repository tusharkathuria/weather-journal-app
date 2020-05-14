/* Global Variables */

const weatherApiKey = "625b11bc97c79435f819abc94f2a9f12";
const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather";
const journalBaseUrl = "http://localhost:8080";
const countryCode = "in";
const eventListeners = {};
const utils = {};
const d = new Date();
const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

utils.validateInputs = () => {
    return true;
}

utils.getWeather = async (zip) => {
    const url = `${weatherBaseUrl}?zip=${zip},${countryCode}&appid=${weatherApiKey}`;
    const resp = await fetch(url);

    try {
        const data = await resp.json();
        return data;
    } catch(e) {
        console.log('Exception while parsing weather response');
    }
}

utils.postData = async (date, temperature, userResponse) => {
    const url = `${journalBaseUrl}/entry`;
    const resp = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({date, temperature, userResponse})
    });

    try {
        const data = await resp.json();
        return data;
    } catch(e) {
        console.log('Exception while parsing response of post request');
    }
};

utils.getData = async (id) => {
    const url = `${journalBaseUrl}/entries/${id}`;
    const resp = await fetch(url);

    try {
        const data = await resp.json();
        return data;
    } catch(e) {
        console.log('Exception while parsing response of get request');
    }
};

utils.updateUI = () => {

}

eventListeners.generateButtonClick = () => {
    const validationResult = utils.validateInputs();

    if(!validationResult) {
        return;
    }

    const zip = document.querySelector("#zip").value;

    utils.getWeather(zip).then((weatherData) => {
        const userResponse = document.querySelector("#feelings").value;

        return utils.postData(newDate, weatherData.main.temp, userResponse);
    }).then((postResponse) => {
        return utils.getData(postResponse.id);
    }).then((data) => {
        utils.updateUI(data);
    });
}; 

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.querySelector("#generate");

    generateButton.addEventListener('click', eventListeners.generateButtonClick);
});


/* Function to POST data */


/* Function to GET Project Data */
