import $ from 'jquery';
import _ from 'lodash';
import './body.css';

$('body').append($('<p>').text('Dashboard data for the students'));
$('body').append($('<button>').text('Click here to get started'));
$('body').append($('<p>').attr({ id: 'count' }));

let count = 0;

function updateCounter() {
  const idCount = $('#count');
  count ++;
  idCount.empty();
  idCount.text(`${count} clicks on the button`);
}

$('button').on('click', _.debounce(updateCounter, 500));