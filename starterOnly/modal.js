function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const contentModal = document.querySelector(".content");
const modalBody = document.querySelector(".modal-body");
const btnSubmit = document.querySelector(".btn-submit");

// Form state
let isValid = true;

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

  document.body.style.overflow = "auto";
}

// Close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.body.style.overflow = "hidden";
}

const setErrorMessage = (input, message) => {
  isValid = false;
  // if span element already exists return
  if (input.parentNode.nextElementSibling.classList.contains('error-message')) return;

  // add red outline to input
  input.style.outline = '1px solid red';

  // Create span element to display error message
  const span = document.createElement('span');
  span.classList.add('error-message');
  span.innerText = message;

  // insert next to the parentnode
  input.parentNode.insertAdjacentElement('afterend', span);
}

const removeErrorMessage = (input) => {
  if (input.parentNode.nextElementSibling.classList.contains('error-message')) {
    input.parentNode.nextElementSibling.remove();
    input.style.outline = 'none';
  }
}
// Check if there is any error message
const checkFormErrors = () => {
  document.getElementsByClassName('error-message').length > 0 ? isValid = false : isValid = true;
}

function validate() {
  // Get all form inputs
  const first          = document.getElementById('first'),
        last           = document.getElementById('last'),
        email          = document.getElementById('email'),
        birthdate      = document.getElementById('birthdate'),
        quantity       = document.getElementById('quantity'),
        locationInputs = document.getElementsByName('location'),
        terms          = document.getElementById('checkbox1');


  // Check for first name
  if (first.value === '' || first.value.length < 2) {
    setErrorMessage(first, 'Vous devez entrer 2 caractères ou plus pour le champ du prénom.')
  } else {
    removeErrorMessage(first);
  }

  // Check for last name
  if (last.value === '' || last.value.length < 2) {
    setErrorMessage(last, 'Vous devez entrer 2 caractères ou plus pour le champ du nom.')
  } else {
    removeErrorMessage(last)
  }

  // Check for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    setErrorMessage(email, 'Vous devez entrer une adresse email valide. (exemple: toto@gmail.com)');
  } else {
    removeErrorMessage(email);
  }

  // Check for birthdate
  const birthdateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
  if (!birthdateRegex.test(birthdate.value)) {
    setErrorMessage(birthdate, 'Vous devez entrer votre date de naissance valide. (exemple: 01-23-1990)');
  } else {
    removeErrorMessage(birthdate);
  }

  // Check for number of tournaments and if it's a number between 0 and 99
  const quantityRegex = /^[0-9]{1,2}$/;
  if (!quantityRegex.test(quantity.value) || quantity.value === '') {
    setErrorMessage(quantity, 'Vous devez entrer un nombre entre 0 et 99.')
  } else {
    removeErrorMessage(quantity);
  }

  // Check if at least one location is checked
  const isAllFalse = Array.from(locationInputs).every((input) => !input.checked); // check if all inputs are false
  (isAllFalse) ? setErrorMessage(locationInputs[0], 'Vous devez choisir une ville.') : removeErrorMessage(locationInputs[0]);

  // check if term checkbox is checked
  !terms.checked ? setErrorMessage(terms, 'Vous devez vérifier que vous acceptez les termes et conditions.') : removeErrorMessage(terms);

  checkFormErrors();
  return isValid;
}

const showSuccessMessage = () => {
  // Get modal height to set it to the success message to avoir content jumping
  const modalHeight = contentModal.offsetHeight;

  // put form opacity to 0
  modalBody.style.opacity = '0';

  // Remove form after .3s and create and display success message after
  setTimeout(() => {
    contentModal.removeChild(contentModal.children[1]);
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.style.height = `${modalHeight}px`;
    successMessage.innerText = 'Merci pour votre inscription';
    contentModal.appendChild(successMessage);
  }, 300);
}

// Check if form is valid and submit or display error message
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (validate()) {
    showSuccessMessage();
  }
});
