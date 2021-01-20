class Calendar {
  //do something with the data here
  constructor(schedule) {
    this.schedule = schedule;
    this.DAYSOFWEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    this.renderDaysOfWeek();
    this.identifyWeek();
    this.parseWeeks();
  }

  getWeekNum(date) {
    var d = new Date(date);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
  }

  identifyWeek() {
    for (let day in this.schedule) {
      let week = this.getWeekNum(day);
      if (week === 53) week = 0;
      this.schedule[day]['week'] = week;
    }
  }

  renderDaysOfWeek() {
    this.DAYSOFWEEK.forEach(day => {
      let dayofweek = document.createElement('div');
      dayofweek.setAttribute('class', 'dayofweek');
      dayofweek.innerHTML = day;
      document.getElementById('wrapper').appendChild(dayofweek);
    });
  }

  parseWeeks() {
    let weeks = {};

    for (let days in this.schedule) {
      let week = this.schedule[days].week;
      let day = this.schedule[days]
      for (let weekNum = 0; weekNum <= 5; weekNum++) {
        if (week === weekNum) {
          if (!weeks[week]) weeks[week] = {};
          weeks[week][days] = day
        }
      }
    }
    console.log('weeks:', weeks);
    return weeks;
  }

  renderWeeks() {
    let daysByWeek = parseWeeks();

    for (let weeks in daysByWeek) {
      this.DAYSOFWEEK.forEach(weekday => {
        let days = daysByWeek[weeks];
        
      })
    }

  //   for (let week in daysByWeek) {
  //   DAYSOFWEEK.forEach(weekday => {
  //     let weeklyUnits = unitsByWeek[week];

  //     if (weeklyUnits[weekday]) {
  //       let challenge = weeklyUnits[weekday].challenge;
  //       let event = document.createElement('div');
  //       let goals = weeklyUnits[weekday].goals;
  //       let text = "<b>" + challenge + "</b><br>" + '<br>Goals: ';
  //       goals.forEach(goal => text += '<br>' + goal);

  //       event.innerHTML = text;
  //       event.setAttribute('class', 'event');
  //       document.getElementById('wrapper').appendChild(event);
  //     } else {
  //       let event = document.createElement('div');
  //       event.innerHTML = 'no events scheduled';
  //       event.setAttribute('class', 'event');
  //       document.getElementById('wrapper').appendChild(event);
  //     }
  //   })
  // }


  }
}

class Event {
  // Pass in each element of the array in Day
  constructor(data) {
    this.startTime = data.start.dateTime;
    this.endTime = data.end.dateTime;
    this.description = data.description;
    this.summary = data.summary;
  }

  renderEvent() {
    let event = document.createElement('div');
    event.innerHTML = this.summary + '<br>' + this.description + '</br>' + 'Start: ' + this.startTime + 'End: ' + this.endTime;
    return event;
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
  constructor() {
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
  document.getElementById('wrapper').setAttribute('style', 'display: grid; grid-template-columns: 20% 20% 20% 20% 20%;');
  // make AJAX call here....
  let request = new XMLHttpRequest();
  request.open('GET', 'http://slack-server-production.us-west-2.elasticbeanstalk.com/calendar/LA/40', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      let data = JSON.parse(this.response);
      let calendar = new Calendar(data);
      console.log(calendar);
    } else {
      console.log('Server error')
    }
  }

  request.onerror = function() {
    console.log('Connection error')
  }

  request.send();

});