class Calendar {
  //do something with the data here
  constructor(schedule) {
    this.schedule = schedule;
  }

  parseDays() {
    for (let day in this.schedule) {
      
    }
  }

  renderSchedule() {
    
  }
}

class Event {
  constructor(data) {
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.description = data.description;
  }
}

class Day {
  constructor(name) {
    this.name = name;
    this.events = [];
    this.addEvent = (eventData) => {
      this.events.push(new Event(eventData));
    }
    this.orderEvents = () => {
      //go through events and sort them by start and end time
    }
  }
}

class Week {
  constructor(number) {
    this.days = [];
    this.addDay = (name) => {
      const day = new Day(name);
      this.days.push(day);
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const title = document.createElement('h1');
  title.innerText = 'Social Calendar';
  document.querySelector('body').appendChild(title);
  // make AJAX call here....
  let request = new XMLHttpRequest();
  request.open('GET', 'http://slack-server-production.us-west-2.elasticbeanstalk.com/calendar/LA/40', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      let data = JSON.parse(this.response);
      console.log(data);
      let calendar = new Calendar(data);
    } else {
      console.log('Server error')
    }
  }

  request.onerror = function() {
    console.log('Connection error')
  }

  request.send();

});