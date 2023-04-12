const form = document.querySelector('form');
const promptInput = document.querySelector('#prompt');
const styleSelect = document.querySelector('#style');
const angleSelect = document.querySelector('#angle');
const lensSelect = document.querySelector('#lens');
const detailSelect = document.querySelector('#detail');
const previewContainer = document.querySelector('#preview-container');
const promptDisplay = document.querySelector('#prompt-display');
const visualizationContainer = document.querySelector('#visualization-container');
const visualization = document.querySelector('#visualization');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get values from form inputs
  const promptText = promptInput.value;
  const style = styleSelect.value;
  const angle = angleSelect.value;
  const lens = lensSelect.value;
  const detail = detailSelect.value;

  // Generate prompt display text
  const promptDisplayText = `Create a ${promptText} ${style} ${angle} ${lens} ${detail}`;

  // Clear prompt display text
  promptDisplay.textContent = '';

  // Add typing animation to prompt display
  let i = 0;
  const typeAnimation = setInterval(() => {
    promptDisplay.textContent += promptDisplayText.charAt(i);
    i++;
    if (i > promptDisplayText.length - 1) {
      clearInterval(typeAnimation);
    }
  }, 50);

  // Generate image URL
  const imageUrl = `https://api.promptapi.com/image/generate?url=${encodeURIComponent(promptDisplayText)}`;

  // Show loading message while image loads
  visualization.innerHTML = 'Loading...';

  // Load image
  const image = new Image();
  image.addEventListener('load', () => {
    // Show image
    visualization.innerHTML = '';
    visualization.appendChild(image);

    // Show preview
    previewContainer.style.display = 'flex';
    visualizationContainer.style.display = 'block';
  });
  image.addEventListener('error', () => {
    // Show error message
    visualization.innerHTML = 'Error loading image.';
  });
  image.src = imageUrl;
});
