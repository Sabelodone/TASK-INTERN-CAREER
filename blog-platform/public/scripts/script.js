
//signup sign in button
document.addEventListener('DOMContentLoaded', function() {
    const signinButton = document.getElementById('signin-btn');
    const signupButton = document.getElementById('signup-btn');
    const signinDropdown = document.getElementById('signin-dropdown');
    const signupDropdown = document.getElementById('signup-dropdown');

    signinButton.addEventListener('click', function() {
        toggleDropdown(signinDropdown);
        hideDropdown(signupDropdown);
    });

    signupButton.addEventListener('click', function() {
        toggleDropdown(signupDropdown);
        hideDropdown(signinDropdown);
    });

    function toggleDropdown(dropdown) {
        dropdown.classList.toggle('active');
    }

    function hideDropdown(dropdown) {
        if (dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
        }
    }
});

//readmore button 

document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fullContent = this.parentNode.querySelector('.full-content');
            if (fullContent.style.display === 'none' || fullContent.style.display === '') {
                fullContent.style.display = 'block';
                this.textContent = 'Read Less';
            } else {
                fullContent.style.display = 'none';
                this.textContent = 'Read More';
            }
        });
    });
});

// blog submitting form 

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('blogForm');
    
    form.addEventListener('submit', function(event) {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const content = document.getElementById('content').value;
      const errorMessage = document.getElementById('errorMessage');
      
      if (!title || !author || !content) {
        event.preventDefault(); // Prevent form submission
        errorMessage.textContent = 'All fields are required';
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {  /*uploading image*/
    const form = document.getElementById('blogForm');
    const imageInput = document.getElementById('image');
  
    form.addEventListener('submit', function(event) {
      // Check if an image is selected
      if (imageInput.files.length === 0) {
        event.preventDefault(); // Prevent form submission
        alert('Please select an image to upload.');
      }
    });
  });

  /*smooth scrolling*/

  document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Get user inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Make a POST request to the server to authenticate user
    const response = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    // Check if the response is successful
    if (response.ok) {
      // Parse JSON response
      const data = await response.json();
      // Show success message to user
      alert(data.message);
      // You can access user data like data.user and use it as needed
    } else {
      // Handle error response
      const errorData = await response.json();
      alert(errorData.error); // Show error message to user
    }
  });


  // After signing in or signing up successfully
const messageContainer = document.getElementById('message-container');
messageContainer.textContent = 'Sign in or sign up successful!';
