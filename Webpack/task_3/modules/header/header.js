import $ from 'jquery';
import './header.css';

$('body').append($('<div>').attr({ id: 'logo' }));
$('body').append($('<h1>').text('Holberton Dashboard'));

console.log('Init header');