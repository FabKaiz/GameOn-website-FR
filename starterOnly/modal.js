function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const contentModal = document.querySelector(".content");
const btnSubmit = document.querySelector(".btn-submit");

const closeModal = () => {
  // Add animation class to modal
  contentModal.classList.add("close-animation");
  // Get animation duration from css variable
  const animationDuration = getComputedStyle(document.documentElement).getPropertyValue('--modal-duration');
  // convert duration to ms and remove the "s" at the end
  const convertedAnimationDuration = parseFloat(animationDuration) * 1000;

  // Close modal after animation duration
  setTimeout(() => {
    contentModal.classList.remove("close-animation");
    modalbg.style.display = "none";
  }, convertedAnimationDuration);
}

// Close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function validate() {
  // Get all form inputs
  const first = document.getElementById('first');
  const last = document.getElementById('last');
  const email = document.getElementById('email');
  const location = document.querySelector('input[name="location"]:checked');
  const quantity = document.getElementById('quantity');
  const terms = document.getElementById('checkbox1');

  let isValid = true;

  // Check for first name
  if (first.value === '' || first.value.length < 2) {
    isValid = false;
    first.classList.add('error');
  } else {
    first.classList.remove('error');
  }

  // Check for last name
  if (last.value === '' || last.value.length < 2) {
    isValid = false;
    last.classList.add('error');
  } else {
    last.classList.remove('error');
  }

  // Check for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    isValid = false;
    email.classList.add('error');
  } else {
    email.classList.remove('error');
  }

  // Check for number of tournaments and if it's a number
  const quantityRegex = /^[0-9]+$/;
  if (!quantityRegex.test(quantity.value) || quantity.value === '') {
    isValid = false;
    quantity.classList.add('error');
  } else {
    quantity.classList.remove('error');
  }

  // Check for tournament location is checked
  if (location === null) {
    isValid = false;
    const locationInputs = document.getElementsByName('location');
    locationInputs.forEach(function (input) {
      input.classList.add('error');
    });
  } else {
    const locationInputs = document.getElementsByName('location');
    locationInputs.forEach(function (input) {
      input.classList.remove('error');
    });
  }

  // Check for terms and conditions
  if (!terms.checked) {
    isValid = false;
    terms.classList.add('error');
  } else {
    terms.classList.remove('error');
  }

  return isValid;
}

// Check if form is valid and submit or display error message
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (validate()) {
    closeModal();
    // TODO: Add success message
  } else {
    console.log('Formulaire invalide');
    //TODO: Add error message
  }
});
