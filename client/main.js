// The following code appends a title to the page
// document.createElement creates an element that can be altered and then inserted into the DOM
// document.body.appendChild places a node as a child under the body element

// Your schedule can be accessed through the global object "schedule"
console.log(schedule);

function parseUnitsbyWeek(array) {
  let units = {};

  array.forEach(unit => {
    let week = unit.week;
    let day = unit.day;
    if (unit.week === 1) {
      if (!units[week]) units[week] = {};
      units[week][day] = unit;
    } else if (unit.week === 2) {
      if (!units[week]) units[week] = {};
      units[week][day] = unit;
    } else if (unit.week === 3) {
      if (!units[week]) units[week] = {};
      units[week][day] = unit;
    }
  })
  return units;
}

function renderUnits() {
  let DAYSOFWEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  let unitsByWeek = parseUnitsbyWeek(schedule);
  for (let week in unitsByWeek) {
    DAYSOFWEEK.forEach(weekday => {
      let weeklyUnits = unitsByWeek[week];

      if (weeklyUnits[weekday]) {
        let challenge = weeklyUnits[weekday].challenge;
        let event = document.createElement('div');
        let goals = weeklyUnits[weekday].goals
        let text = "<b>" + challenge + "</b><br>" + '<br>Goals: ';
        goals.forEach(goal => text += '<br>' + goal)

        event.innerHTML = text;
        event.setAttribute('class', 'event');
        document.getElementById('wrapper').appendChild(event);
      } else {
        let event = document.createElement('div');
        event.innerHTML = 'no events scheduled';
        event.setAttribute('class', 'event');
        document.getElementById('wrapper').appendChild(event);
      }
    })
  }
}

renderUnits();

