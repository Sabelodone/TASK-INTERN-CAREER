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

    // You can add your form submission logic here
    // For example, you can use Fetch API to send form data to a server
    // and handle the response accordingly
    console.log('Form submitted!');
});

// Toggle hamburger menu
function toggleMenu() {
    var menu = document.getElementById('menu');
    var hamburgerMenu = document.querySelector('.hamburger-menu');
    hamburgerMenu.classList.toggle('open');
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}
