console.log("CLientside JS loaded");

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=>{
        console.log(data);
    })
});




const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')
const errorMessage = document.getElementById('message-1')
const weatherResult = document.getElementById('message-2')

//errorMessage.textContent='Error here: ';
//weatherResult.textContent = 'Weather details here: '

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(searchText.value);
    const url = 'http://localhost:5000/weather?address=' + searchText.value
    fetch(url).then((response) => {
    response.json().then((data)=>{
        if (data.error){
            errorMessage.textContent = 'Error: '+data.error
            weatherResult.textContent =''
        }else{
            //console.log(data.location);
            //console.log(data.forcast);
            weatherResult.textContent = data.location + " Forecast: " + data.forcast
            errorMessage.textContent = ''
        }
    })
});
})