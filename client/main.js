let latestMessageTime;
//console.log(latestMessageTime)
    
//GET function. 
const messagesGET = () => {
  fetch(`https://curriculum-api.codesmith.io/messages`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data.headers); 
      //console.log(data[0]['created_at'])
      // console.log(latestMessageTime)
      if (!latestMessageTime || latestMessageTime !== data[0]['created_at']) {
        // console.log(latestMessageTime)
        latestMessageTime = data[0]['created_at'];
        for (let i = 50; i >= 0; i--) {
          logMessage(data[i]);
        } 
        scroll();
      } 
    })
  .catch(error => console.log('Error: ', error)); 
}

const scroll = () => {
  let chatBox = document.getElementById('container');
  chatBox.scrollTop = chatBox.scrollHeig3ht;
}
const post = () => {
  let name = document.querySelector('#name').value; 
  let msg = document.querySelector('#msg').value; 
  
  if (name === "" || msg === "") {
    return alert("Both fields must be filled out!"); 
  }

const post = {
  created_by : name,
  message: msg 
}
//console.log(post);
const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
      if(request.readyState === 4 && request.status === 200){
          location.reload();
          console.log(JSON.parse(request.responseText));
      }  
  }
  request.open('POST','https://curriculum-api.codesmith.io/messages',true)
  request.setRequestHeader('Content-Type','application/json;charset=utf-8')
  request.send(JSON.stringify(post))

};     

function logMessage(msg) {
      
  // console.log(this.data[i]['message']);  
  const message =  document.createElement('div'); 
  const name = document.createElement('div'); 
  const date = document.createElement('div');
  
  message.setAttribute('class', 'message');
  name.setAttribute('class', 'name'); 
  date.setAttribute('class', 'date');

  name.innerText = msg['created_by']; 
  message.innerText = msg['message'];
  date.innerText = new Date(msg['created_at']).toLocaleString();

  document.querySelector('#container').appendChild(name);
  document.querySelector('#container').appendChild(date);
  document.querySelector('#container').appendChild(message) 

}

// MAKE POST REQUEST ON CLICK:
document.querySelector('button').addEventListener('click', post)

messagesGET();
setInterval(messagesGET, 5000);
// function getNewMessages() {
//   const request = new XMLHttpRequest();
//   request.onreadystatechange = () => {
//     if (request.readyState == 4 && request.status == 200) {
//       let data = JSON.parse(request.responseText);
//       console.log(data);
//     }
//   }
//   request.open('GET', 'https://curriculum-api.codesmith.io/messages', true);
//   request.send();
// }




// console.log(messagesJSON);

//console.log(new Date('2021-01-21T03:05:21.431Z'));

// SCROLL TO BOTTOM AFTER MESSAGES LOAD: 



// GET MESSAGES FROM API 
//can even check the date stamp to make sure it's the latest.  // Yaaaaas
//CONST GETMESSAGES = () => {
  // FETCH
  // then: messages =>
  // most recent = messages.slice(0,30);
//}