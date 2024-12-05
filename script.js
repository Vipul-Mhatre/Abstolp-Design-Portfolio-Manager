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
  
  function updateControls() {
    const textControls = document.querySelector('.text-controls');
    const addControls = document.querySelector('.add-controls');
  
    if (selectedText) {
      textControls.style.display = 'block';
      addControls.style.display = 'none';
    } else {
      textControls.style.display = 'none';
      addControls.style.display = 'block';
    }
  }
  
  function selectTextElement(element) {
    selectedText = element;
    updateControls();
  }
  
  document.addEventListener('click', () => {
    selectedText = null;
    updateControls();
  });
  
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
  
  // Add emoji
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
  });
  
  document.getElementById('updateImage').addEventListener('click', () => {
    const activeSlide = document.querySelector('.swiper-slide-active img');
    const newImageUrl = prompt('Enter the URL of the new image:');
    if (newImageUrl) {
      activeSlide.src = newImageUrl;
    }
  });
  
  document.getElementById('fontSize').addEventListener('input', (e) => {
    if (selectedText) selectedText.style.fontSize = `${e.target.value}px`;
  });
  
  document.getElementById('fontFamily').addEventListener('change', (e) => {
    if (selectedText) selectedText.style.fontFamily = e.target.value;
  });
  
  document.getElementById('textColor').addEventListener('input', (e) => {
    if (selectedText) selectedText.style.color = e.target.value;
  });  