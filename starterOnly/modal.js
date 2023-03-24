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

console.log(contentModal);

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


