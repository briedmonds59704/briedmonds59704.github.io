let newBtn = document.querySelector('#js-new-quote');
newBtn.addEventListener('click', getQuote);

const endPoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

async function getQuote() {
   //alert("Success");
    try {
        const response = await fetch(endPoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);
        displayQuote(json['question']);
    } catch (err) {
        console.log(err);
        alert('Failed to fetch new quote');
    }
};

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent =quote;
}