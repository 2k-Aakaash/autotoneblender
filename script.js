const convertToPNGButton = document.getElementById('convert-to-png-button'); // Add this line
const gradientContainer = document.querySelector('.gradient-container'); // Define gradientContainer globally

const gradientHistory = [];
let currentGradientIndex = -1; // Initialize to -1 to represent no previous gradients

function generateRandomGradient() {
    const randomColor1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const randomColor2 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const randomColor3 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const randomColor4 = '#' + Math.floor(Math.random() * 16777215).toString(16);

    const randomDegree = Math.floor(Math.random() * 360);

    // Randomly decide between two, three, or four colors
    const randomValue = Math.random();

    let gradient;
    if (randomValue < 0.33) { // 33% chance for two colors
        gradient = `linear-gradient(${randomDegree}deg, ${randomColor1}, ${randomColor2})`;
    } else if (randomValue < 0.66) { // 33% chance for three colors
        gradient = `linear-gradient(${randomDegree}deg, ${randomColor1}, ${randomColor2}, ${randomColor3})`;
    } else { // 34% chance for four colors
        gradient = `linear-gradient(${randomDegree}deg, ${randomColor1}, ${randomColor2}, ${randomColor3}, ${randomColor4})`;
    }

    gradientHistory.push(gradient);
    currentGradientIndex = gradientHistory.length - 1; // Update current index
    setBackgroundAndTextColor(gradient);
    return gradient;
}

const undoButton = document.getElementById('undo-button');
undoButton.addEventListener('click', undoGradient);

function undoGradient() {
    if (currentGradientIndex > 0) {
        currentGradientIndex--;
        const previousGradient = gradientHistory[currentGradientIndex];
        setBackgroundAndTextColor(previousGradient);
    }
}

function setBackgroundAndTextColor(gradient) {
    document.body.style.background = gradient;
    updateGradientCode(gradient);
}


function extractColorsFromGradient(gradient) {
    const colorRegex = /#[0-9a-fA-F]+/g; // Regular expression to match hex color codes
    const colors = gradient.match(colorRegex);
    return colors ? colors.join(', ') : 'No Colors Found'; // Join matched colors or show a message
}

function updateGradientCode(gradient) {
    const codeElement = document.getElementById('gradient-code');
    const colors = extractColorsFromGradient(gradient);
    
    // Create a <p> element for each line of CSS code
    const codeLines = [
        `background: ${colors} /* fallback for old browsers */`,
        `background: -webkit-linear-gradient(${colors}); /* Chrome 10-25, Safari 5.1-6 */`,
        `background: linear-gradient(${colors}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */`
    ];

    // Clear any existing content in the codeElement
    codeElement.innerHTML = '';

    // Create and append <p> elements for each line of code
    codeLines.forEach(line => {
        const pElement = document.createElement('p');
        pElement.textContent = line;
        codeElement.appendChild(pElement);
    });
}


document.getElementById('change-color-button').addEventListener('click', function () {
    const gradient = generateRandomGradient();
    document.body.style.background = gradient;
    updateGradientCode(gradient);
});


// JavaScript to handle showing and hiding the modal
const modalContainer = document.getElementById('modal-container');
const modalTriggerIcon = document.getElementById('modal-trigger-icon');
const modalContent = document.querySelector('.modal-content');

// Function to open the modal
function openModal() {
    modalContainer.style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    modalContainer.style.display = 'none';
}

// Event listener to open the modal when clicking the icon
modalTriggerIcon.addEventListener('click', () => {
    openModal();
});

// Event listener to close the modal when clicking outside the content
modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
        closeModal();
    }
});

// Event listener to close the modal when pressing the "Escape" key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});


// Function to populate the modal content with the CSS code
function updateGradientCode(gradient) {
    modalContent.textContent = gradient;
}

// Define and assign a gradient value to gradientCode
const gradientCode = 'linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E)';

// Call the function to populate the modal content
updateGradientCode(gradientCode);

function updateGradientCode(gradient) {
    const codeElement = document.getElementById('gradient-code');
    
    // Define CSS classes for styling
    const propertyNameClass = 'property-name';
    const commentClass = 'comment';
    const gradientClass = 'gradientClass';
    
    // Create a <p> element for each line of CSS code
    const codeLines = [
        `<p class="${propertyNameClass}">background:</p> <p class="${gradientClass}">${gradient}</p> <span class="${commentClass}"> /* fallback for old browsers */</span>`,
        `<p class="${propertyNameClass}">background:</p> <p class="${gradientClass}">-webkit-linear-gradient(${gradient});</p><span class="${commentClass}"> /* Chrome 10-25, Safari 5.1-6 */</span>`,
        `<p class="${propertyNameClass}">background:</p> <p class="${gradientClass}">(${gradient});</p> <span class="${commentClass}"> /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */</span>`
    ];

    // Clear any existing content in the codeElement
    codeElement.innerHTML = '';

    // Create and append <p> elements for each line of code
    codeLines.forEach(line => {
        const divElement = document.createElement('div');
        divElement.innerHTML = line;
        codeElement.appendChild(divElement);
    });
}


// Function to close the modal
function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    
    // Apply the outro animation
    modalContainer.style.animation = 'scale-down 0.5s cubic-bezier(0, 1.41, 0.69, 0.97)';
    
    // After the animation, hide the modal
    setTimeout(() => {
        modalContainer.style.display = 'none';
        modalContainer.style.animation = ''; // Clear the animation property
    }, 500);
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

// Event listener for the "Copy to Clipboard" button
// const copyButton = document.getElementById('copy-button');
// copyButton.addEventListener('click', () => {
//     const gradientCode = modalContent.textContent;
//     copyToClipboard(gradientCode);
//     alert('Gradient code copied to clipboard!');
// });

// Function to display a message in the message modal
function showMessage(message) {
    const messageModal = document.getElementById('message-modal');
    const messageText = document.getElementById('message-text');

    // Set the message text
    messageText.textContent = message;

    // Show the message modal
    messageModal.style.animation = 'scale-up 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    messageModal.style.display = 'block';

    // Auto-hide the message modal after 5 seconds (5000 milliseconds)
    setTimeout(() => {
        hideMessage();
    }, 3000);
}

// Function to hide the message modal
function hideMessage() {
    const messageModal = document.getElementById('message-modal');
    
    // Hide the message modal with scale-down animation
    messageModal.style.animation = 'scale-down 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    
    // After the animation, hide the modal
    setTimeout(() => {
        messageModal.style.display = 'none';
    }, 500);
}

// Event listener for the "Copy to Clipboard" button
const copyButton = document.getElementById('copy-button');
copyButton.addEventListener('click', () => {
    const gradientCode = modalContent.textContent;
    copyToClipboard(gradientCode);
    showMessage('Gradient code copied to clipboard!');
});

// Event listener to generate a new gradient when the spacebar is pressed
document.addEventListener('keydown', function (e) {
    if (e.key === ' ') {
        const gradient = generateRandomGradient();
        document.body.style.background = gradient;
        updateGradientCode(gradient);
    }
});

// function convertGradientToPNG() {
//     const newGradient = generateRandomGradient();

//     // Apply the new gradient
//     gradientContainer.classList.add('gradient-change');
//     setTimeout(() => {
//         gradientContainer.style.background = newGradient;
//         gradientContainer.classList.remove('gradient-change');

//         // Create a canvas element and draw the gradient on it
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         canvas.width = gradientContainer.clientWidth;
//         canvas.height = gradientContainer.clientHeight;

//         // Create a linear gradient on the canvas
//         const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

//         // Extract color stops from newGradient and add them to the gradient
//         const colors = extractColorsFromGradient(newGradient);

//         if (colors !== 'No Colors Found') {
//             const numColors = colors.length;
//             colors.forEach((color, index) => {
//                 const stop = (index / (numColors - 1)) * 100; // Calculate stop position as a percentage
//                 gradient.addColorStop(stop, color);
//             });
//         }

//         // Fill the canvas with the gradient
//         ctx.fillStyle = gradient;
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         // Convert the canvas to a data URL (PNG) and create a download link
//         const dataURL = canvas.toDataURL('image/png');
//         const a = document.createElement('a');
//         a.href = dataURL;
//         a.download = 'gradient.png';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//     }, 5000); // Adjust the duration to match the animation
// }


// convertToPNGButton.addEventListener('click', convertGradientToPNG); // Add this event listener