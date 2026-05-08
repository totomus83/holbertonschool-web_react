import $ from 'jquery';
import _ from 'lodash';
import '../css/main.css';

$('body').append($('<div>').attr({ id: 'logo' }));
$('body').append($('<p>').text('Holberton Dashboard'));
$('body').append($('<p>').text('Dashboard data for the students'));
$('body').append($('<button>').text('Click here to get started'));
$('body').append($('<p>').attr({ id: 'count' }));
$('body').append($('<p>').text('Copyright - Holberton School'));

let count = 0;

function updateCounter() {
  const idCount = $('#count');
  count ++;
  idCount.empty();
  idCount.text(`${count} clicks on the button`);
}

$('button').on('click', _.debounce(updateCounter, 500));