function getCurrentImageOfTheDay() {
    const currentDate=new Date().toISOString().split("T")[0];
    fetchImage(currentDate);
}

function getImageOfTheDay(){
    const date=document.getElementById("search-input").value;
    fetchImage(date);
}

function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory(date) {
    const searchHistory = document.getElementById('search-history');
    const listItem = document.createElement('li');
    listItem.textContent = date;
    listItem.addEventListener('click', () => {
        getImageOfTheDay(date);
    });
    searchHistory.appendChild(listItem);
}

window.addEventListener('load', () => {
    getCurrentImageOfTheDay();


    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach((date) => {
        addSearchToHistory(date);
    });
});


function fetchImage(date,currentDate){
    const apiKey="sWE41KiSaTzSrQ7vZk8YtFoCzoCVrsgNEBpYIywN";
    const apiUrl=`https://api.nasa.gov/planetary/apod?date=${date}&apiKey=${sWE41KiSaTzSrQ7vZk8YtFoCzoCVrsgNEBpYIywN} `;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data =>{
        displayImage(data);
        saveSearch(date);
        addSearchToHistory();
    })
    .catch(error =>console.log("error fetching image: ",error));
}

function displayImage(data){
    const imageContainer=document.getElementById("current-image-containe");
    imageContainer.innerHTML=`
    <img src="${data.url} alt=${data.title}"
    <h2>${data.title}</h2>
    <p>${data.explanation}</p>
    `
}