// Signup and sign in button functionality
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

// Function to prevent event propagation
function stopPropagation(event) {
  event.stopPropagation();
}

// Function to toggle full content
function toggleFullContent(button) {
  const fullContent = button.parentNode.querySelector('.full-content');
  if (fullContent.style.display === 'none' || fullContent.style.display === '') {
      fullContent.style.display = 'block';
      button.textContent = 'Read Less';
  } else {
      fullContent.style.display = 'none';
      button.textContent = 'Read More';
  }
}

// Read more button functionality
document.addEventListener('DOMContentLoaded', function() {
  const readMoreButtons = document.querySelectorAll('.read-more');

  readMoreButtons.forEach(button => {
      button.addEventListener('click', function(event) {
          event.stopPropagation(); // Prevent the click event from propagating to parent elements
          toggleFullContent(this);
      });
  });
});
// Blog form validation
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

document.addEventListener('DOMContentLoaded', function() {
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

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
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

// Form submission for sign in
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    alert(data.message);
  } else {
    const errorData = await response.json();
    alert(errorData.error);
  }
});

// Fetch and display blog posts
document.addEventListener('DOMContentLoaded', () => {
fetch('/posts')
  .then(response => response.json())
  .then(posts => {
    const postsContainer = document.getElementById('posts');
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button onclick="updatePost('${post._id}')">Update</button>
        <button onclick="deletePost('${post._id}')">Delete</button>
      `;
      postsContainer.appendChild(postElement);
    });
  });
});

// Function to update a post
function updatePost(postId) {
fetch(`/posts/${postId}/update`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ /* Update data */ })
})
.then(response => {
  if (response.ok) {
    console.log('Post updated successfully');
  } else {
    console.error('Failed to update post');
  }
})
.catch(error => {
  console.error('Error:', error);
});
}

// Function to delete a post
function deletePost(postId) {
fetch(`/posts/${postId}/delete`, {
  method: 'DELETE'
})
.then(response => {
  if (response.ok) {
    console.log('Post deleted successfully');
  } else {
    console.error('Failed to delete post');
  }
})
.catch(error => {
  console.error('Error:', error);
});
}

// Message after signing in or signing up successfully
const messageContainer = document.getElementById('message-container');
messageContainer.textContent = 'Sign in or sign up successful!';