//your code here
// Elements and initial setup
const images = document.querySelectorAll('img');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');
const h3 = document.getElementById('h');

let clickedImages = [];
let selectedImages = 0;
let identicalImageClass = null; // Holds the class of the identical image

// Function to randomize image positions and select a duplicate image
function randomizeImages() {
  const classes = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];
  const randomClass = classes[Math.floor(Math.random() * classes.length)];
  identicalImageClass = randomClass;

  // Randomly shuffle classes
  const shuffledClasses = [...classes];
  shuffledClasses.sort(() => Math.random() - 0.5);
  
  // Assign images and ensure one class repeats
  images.forEach((img, index) => {
    img.classList.remove(...classes);
    img.classList.add(shuffledClasses[index]);
    img.src = `https://via.placeholder.com/150?text=Image+${shuffledClasses[index]}`;
  });

  // Ensure one image repeats
  const repeatedImage = document.querySelector(`.${identicalImageClass}`);
  repeatedImage.src = `https://via.placeholder.com/150?text=Image+${identicalImageClass}`;
}

randomizeImages();

// Handle image clicks
images.forEach(image => {
  image.addEventListener('click', (event) => {
    const clickedImage = event.target;

    if (!clickedImages.includes(clickedImage)) {
      clickedImages.push(clickedImage);
      selectedImages++;
      clickedImage.style.border = '2px solid green';

      // Show reset button once one image is clicked
      resetButton.style.display = 'inline-block';

      if (selectedImages === 2) {
        // Show verify button after selecting two images
        verifyButton.style.display = 'inline-block';
      }
    }
  });
});

// Handle reset button
resetButton.addEventListener('click', () => {
  // Reset everything to initial state
  clickedImages.forEach(image => {
    image.style.border = '2px solid #ccc';
  });
  clickedImages = [];
  selectedImages = 0;
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  para.textContent = '';
  h3.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  randomizeImages();
});

// Handle verify button
verifyButton.addEventListener('click', () => {
  if (clickedImages.length === 2 && clickedImages[0].classList.contains(clickedImages[1].classList[0])) {
    para.textContent = 'You are a human. Congratulations!';
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  // Hide verify button after verification
  verifyButton.style.display = 'none';
});
