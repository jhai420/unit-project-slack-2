let container = document.querySelector('ul');
let message = document.createElement('li');
message.innerText = 'Message1';
container.appendChild(message);

let messagesJSON;

fetch(`https://curriculum-api.codesmith.io/messages`)
    .then((data) => data.json()) 
    .then((data) => {
        //console.log(data); 
        messagesJSON = data;
    }); 

console.log(messagesJSON);