let newBtn = document.querySelector('#js-new-quote');

newBtn.addEventListener('click', getQuote);

async const endPoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

function getQuote() {
   //alert("Success");
    try {
        const response = await fetch(endPoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);
    }
}