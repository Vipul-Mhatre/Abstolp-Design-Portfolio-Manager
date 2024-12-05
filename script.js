const swiper = new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  
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
  }
  
  document.querySelectorAll('.draggable').forEach(makeDraggable);   // Make all default texts draggable
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
  });
  
  document.getElementById('fontSize').addEventListener('input', (e) => {
    const activeText = document.querySelector('.swiper-slide-active .draggable:focus');
    if (activeText) activeText.style.fontSize = `${e.target.value}px`;
  });
  
  document.getElementById('fontFamily').addEventListener('change', (e) => {
    const activeText = document.querySelector('.swiper-slide-active .draggable:focus');
    if (activeText) activeText.style.fontFamily = e.target.value;
  });
  
  document.getElementById('textColor').addEventListener('input', (e) => {
    const activeText = document.querySelector('.swiper-slide-active .draggable:focus');
    if (activeText) activeText.style.color = e.target.value;
  });