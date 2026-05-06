import $ from 'jquery';
import debounce from 'lodash/debounce';

let count = 0;

function updateCounter() {
  count += 1;
  $('#count').text(`${count} clicks on the button`);
}

$(document).ready(function () {
  // Create elements in order
  $('body').append('<p>Holberton Dashboard</p>');
  $('body').append('<p>Dashboard data for the students</p>');

  const button = $('<button>Click here to get started</button>');
  $('body').append(button);

  $('body').append("<p id='count'></p>");
  $('body').append('<p>Copyright - Holberton School</p>');

  // Debounced click handler (500ms)
  button.on('click', debounce(updateCounter, 500));
});