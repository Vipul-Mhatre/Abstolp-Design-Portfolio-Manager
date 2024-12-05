const swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

let selectedText = null;

function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  element.addEventListener('click', (e) => {
    e.stopPropagation();
    selectTextElement(element);
  });
}


function selectTextElement(element) {
  if (selectedText === element) return;
  selectedText = element;

  const fontSizeInput = document.getElementById('fontSize');
  const fontFamilyInput = document.getElementById('fontFamily');
  const textColorInput = document.getElementById('textColor');
  fontSizeInput.value = parseInt(window.getComputedStyle(selectedText).fontSize) || 16;
  fontFamilyInput.value = window.getComputedStyle(selectedText).fontFamily.replace(/['"]+/g, '') || 'Arial';

  const computedColor = window.getComputedStyle(selectedText).color;
  const rgb = computedColor.match(/\d+/g);
  const hexColor = rgb
    ? `#${((1 << 24) + (+rgb[0] << 16) + (+rgb[1] << 8) + +rgb[2]).toString(16).slice(1)}`
    : '#000000';
  textColorInput.value = hexColor;

  document.querySelector('.text-controls').style.display = 'block';
}


document.addEventListener('click', (e) => {
  if (!e.target.closest('.text-controls') && selectedText !== null) {
    document.querySelector('.text-controls').style.display = 'none';
    selectedText = null;
  }
});


document.querySelector('.text-controls').addEventListener('click', (e) => {
  e.stopPropagation();
});

document.querySelectorAll('.draggable').forEach(makeDraggable);

document.getElementById('addText').addEventListener('click', () => {
  const activeSlide = document.querySelector('.swiper-slide-active .image-container');
  const newText = document.createElement('div');
  newText.className = 'draggable';
  newText.contentEditable = 'true';
  newText.textContent = 'New Text';
  newText.style.position = 'absolute';
  newText.style.top = '20px';
  newText.style.left = '20px';
  newText.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  newText.style.padding = '5px';
  newText.style.cursor = 'move';
  newText.style.border = '1px solid #ccc';

  activeSlide.appendChild(newText);
  makeDraggable(newText);
  selectTextElement(newText);
});

document.getElementById('addEmoji').addEventListener('click', () => {
  const activeSlide = document.querySelector('.swiper-slide-active .image-container');
  const newEmoji = document.createElement('div');
  newEmoji.className = 'draggable';
  newEmoji.contentEditable = 'true';
  newEmoji.textContent = '😊';
  newEmoji.style.position = 'absolute';
  newEmoji.style.top = '50px';
  newEmoji.style.left = '50px';
  newEmoji.style.fontSize = '24px';
  newEmoji.style.cursor = 'move';

  activeSlide.appendChild(newEmoji);
  makeDraggable(newEmoji);
  selectTextElement(newEmoji);
});

document.getElementById('fontSize').addEventListener('input', (e) => {
  if (selectedText) {
    selectedText.style.fontSize = `${e.target.value}px`;
  }
});

document.getElementById('fontFamily').addEventListener('change', (e) => {
  if (selectedText) {
    selectedText.style.fontFamily = e.target.value;
  }
});

document.getElementById('textColor').addEventListener('input', (e) => {
  if (selectedText) {
    selectedText.style.color = e.target.value;
  }
});

document.getElementById('doneButton').addEventListener('click', () => {
  document.querySelector('.text-controls').style.display = 'none';
  selectedText = null;
});