// Variablen definieren
let slideIndex = 0;
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const dotsContainer = document.querySelector('.dots');
const slideWidth = images[0].clientWidth;

// Funktion zum Aktualisieren des Sliders
function updateSlider() {
  slides.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
  updateDots();
}

// Funktion zum Aktualisieren der Punkte
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === slideIndex);
  });
}

// Erstelle Punkte für die Navigationspunkte
images.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.addEventListener('click', () => {
    slideIndex = index;
    updateSlider();
  });
  dotsContainer.appendChild(dot);
});

// Setze den ersten Punkt aktiv
updateDots();

// Automatische Bildwechsel-Funktion
function autoSlide() {
  slideIndex++;
  if (slideIndex >= images.length) {
    slideIndex = 0; // Starte von vorne, wenn Ende erreicht
  }
  updateSlider();
}

// Setze einen Timer für automatische Bildwechsel
setInterval(autoSlide, 6000); // Jede 6 Sekunden wechseln

// Füge Pfeiltasten hinzu
const prevButton = document.createElement('button');
prevButton.textContent = '←';
prevButton.classList.add('arrow', 'prev');
document.querySelector('.slider-container').appendChild(prevButton);

const nextButton = document.createElement('button');
nextButton.textContent = '→';
nextButton.classList.add('arrow', 'next');
document.querySelector('.slider-container').appendChild(nextButton);

// Klick-Events für Pfeiltasten
prevButton.addEventListener('click', () => {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = images.length - 1; // Gehe zum letzten Bild, wenn am Anfang
  }
  updateSlider();
});

nextButton.addEventListener('click', () => {
  slideIndex++;
  if (slideIndex >= images.length) {
    slideIndex = 0; // Starte von vorne, wenn Ende erreicht
  }
  updateSlider();
});

// Tastatursteuerung mit Pfeiltasten
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    slideIndex--;
    if (slideIndex < 0) {
      slideIndex = images.length - 1;
    }
    updateSlider();
  } else if (event.key === 'ArrowRight') {
    slideIndex++;
    if (slideIndex >= images.length) {
      slideIndex = 0;
    }
    updateSlider();
  }
});