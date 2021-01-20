class Calendar {
  //do something with the data here
  constructor(schedule) {
    this.schedule = schedule;
    this.DAYSOFWEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  }

  parseDays() {
    for (let day in this.schedule) {
      
    }
  }

  renderSchedule() {
    
  }

  renderDaysOfWeek() {
    this.DAYSOFWEEK.forEach(day => {
      let dayofweek = document.createElement('div');
      dayofweek.setAttribute('class', 'dayofweek');
      dayofweek.innerHTML = day;
      document.getElementById('wrapper').appendChild(dayofweek);
    });
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
  let body = document.querySelector('body');
  const title = document.createElement('h1');
  title.innerText = 'Social Calendar';
  body.appendChild(title);
  let wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'wrapper');
  body.appendChild(wrapper);
  document.getElementById('wrapper').setAttribute('style', 'display: grid;');
  document.getElementById('wrapper').setAttribute('style', 'grid-template-columns: 20% 20% 20% 20% 20%;');
  // make AJAX call here....
  let request = new XMLHttpRequest();
  request.open('GET', 'http://slack-server-production.us-west-2.elasticbeanstalk.com/calendar/LA/40', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      let data = JSON.parse(this.response);
      console.log(data);
      let calendar = new Calendar(data);
      calendar.renderDaysOfWeek();
    } else {
      console.log('Server error')
    }
  }

  request.onerror = function() {
    console.log('Connection error')
  }

  request.send();

});