const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

const questionCard = document.getElementById('questionCard');
const dateCard = document.getElementById('dateCard');
const venueCard = document.getElementById('venueCard');
const foodCard = document.getElementById('foodCard');
const finalCard = document.getElementById('finalCard');

const dateNextBtn = document.getElementById('dateNextBtn');
const venueNextBtn = document.getElementById('venueNextBtn');
const finalMessage = document.getElementById('finalMessage');

let selectedDate = '';
let selectedTime = '';
let selectedFood = '';

// Make No button run away
function moveNo() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
}

noBtn.addEventListener('mouseover', moveNo);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNo();
});

// Yes clicked → go to date selection
yesBtn.addEventListener('click', () => {
  questionCard.classList.add('hidden');
  dateCard.classList.remove('hidden');
  createHearts();
});

// Date next
dateNextBtn.addEventListener('click', () => {
  selectedDate = document.getElementById('dateInput').value;
  selectedTime = document.getElementById('timeInput').value;

  if (!selectedDate || !selectedTime) {
    alert('Please select both date and time 😊');
    return;
  }

  dateCard.classList.add('hidden');
  venueCard.classList.remove('hidden');
});

// Venue next
venueNextBtn.addEventListener('click', () => {
  venueCard.classList.add('hidden');
  foodCard.classList.remove('hidden');
});

// Food selection
document.querySelectorAll('.food-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedFood = btn.getAttribute('data-food');

    foodCard.classList.add('hidden');
    finalCard.classList.remove('hidden');

    // Format the final message
    const dateObj = new Date(selectedDate);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const niceDate = dateObj.toLocaleDateString('en-US', options);

    finalMessage.innerHTML = `
      <strong>Date:</strong> ${niceDate}<br>
      <strong>Time:</strong> ${selectedTime}<br>
      <strong>Venue:</strong> The Garden Restaurant, Maiduguri<br>
      <strong>Food:</strong> ${selectedFood}
    `;
  });
});

// Hearts animation
function createHearts() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.classList.add('falling-heart');
      heart.innerHTML = ['💖','💕','💗','💓'][Math.floor(Math.random()*4)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 5000);
    }, i * 100);
  }
}
