var title = document.createElement('div');
title.innerHTML = 'Social Calendar';
document.body.appendChild(title);

for (var i = 0; i < schedule.length; i++) {
  document.body.appendChild(appendDay(schedule[i]));
}

function appendDay(day) {
  var div = document.createElement('div');
  div.setAttribute('class', 'day');
  div.appendChild(createParagraph(day.week, 'week_number'));
  div.appendChild(createParagraph(day.day, 'weekday'));
  div.appendChild(createParagraph(day.sprint_name, 'sprint_name'));
  div.appendChild(createUnorderedList(day.goals, 'goals'));
  return div;
}

function createParagraph(value, className) {
  var line = document.createElement('p');
  line.setAttribute('class', className);
  line.innerHTML = value;
  return line;
}

function createUnorderedList(values, className) {
  var list = document.createElement('ul');
  list.setAttribute('class', 'goals');
  for (var i = 0; i < values.length; i++) {
    list.appendChild(createListElement(values[i],'goal'))
  }
  return list;
}

function createListElement(value, className) {
  var listElement = document.createElement('li');
  listElement.setAttribute('class', className);
  listElement.innerHTML = value;
  return listElement;
}
