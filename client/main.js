class Messages {
  constructor(data) {
    this.data = data;

    this.logMessages();
  }

  //Methods:
  logMessages() {
      for(let i = 0; i < this.data.length; i++){
          let message =  document.createElement('div'); 
          let name = document.createElement('div'); 
          let date = document.createElement('div');

          message.setAttribute('class', 'message');
          name.setAttribute('class', 'name'); 
          date.setAttribute('class', 'date');

          name.innerText = this.data[i]['created_by']; 
          message.innerText = this.data[i]['message'];
          date.innerText = new Date(this.data[i]['created_at']).toLocaleString();

          document.querySelector('#container').appendChild(name);
          document.querySelector('#container').appendChild(date);
          document.querySelector('#container').appendChild(message) 

    // console.log(this.data[i]['message']);
      }
  }

}

document.querySelector('button').addEventListener('click', () => {

const post = {
  created_by : document.querySelector('#name').value,
  message: document.querySelector('#msg').value,
}
//console.log(post);
const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
      if(request.readyState === 4 && request.status === 200){
          console.log(JSON.parse(request.responseText));
      }  
  }
  request.open('POST','https://curriculum-api.codesmith.io/messages',true)
  request.setRequestHeader('Content-Type','application/json;charset=utf-8')
  request.send(JSON.stringify(post))


//   fetch({
//     method: 'POST',
//     URL: 'https://curriculum-api.codesmith.io/messages',
//     body: JSON.stringify(post),
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     }
//   })
//     .then((data) => data.json())
//     .then((data) => {
//       console.log(data);
//     });
// });

});

//GET function. 
fetch(`https://curriculum-api.codesmith.io/messages`)
    .then((data) => data.json()) 
    .then((data) => {
        //console.log(data); 
        new Messages(data);
    }); 

// console.log(messagesJSON);

//console.log(new Date('2021-01-21T03:05:21.431Z'));
