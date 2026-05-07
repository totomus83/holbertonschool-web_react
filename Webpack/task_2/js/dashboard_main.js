import '../css/main.css';

// Create logo element
const logo = document.createElement('div');
logo.id = 'logo';
document.body.appendChild(logo);

// Create button + counter (reuse task_1 logic)
const button = document.createElement('button');
button.innerHTML = 'Click me';

const counter = document.createElement('span');
counter.className = 'counter';
counter.innerHTML = '0';

let count = 0;
button.addEventListener('click', () => {
  count++;
  counter.innerHTML = count;
});

document.body.appendChild(button);
document.body.appendChild(counter);