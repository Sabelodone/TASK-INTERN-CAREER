  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this); // 'this' refers to the form element

    fetch('/contact', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        alert(data); // Display success message or handle response from the server
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
});


// Toggle hamburger menu
function toggleMenu() {
    var menu = document.getElementById('menu');
    var hamburgerMenu = document.querySelector('.hamburger-menu');
    hamburgerMenu.classList.toggle('open');
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}