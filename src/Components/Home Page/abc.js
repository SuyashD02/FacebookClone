
// Replace 'YOUR_ACTUAL_PROJECT_ID' with your actual project ID
const projectID = 'f104bi07c490';

// Function to fetch 100 posts from the API
function fetchPosts() {
  fetch(`https://academics.newtonschool.co/api/v1/facebook/post?limit=100`, {
    headers: {
      'projectID': projectID,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      // Handle the posts data
      displayPosts(posts);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Function to display posts on the home page
function displayPosts(posts) {
  // Assuming you have an HTML container with id "posts-container" to display the posts
  const postsContainer = document.getElementById('posts-container');

  // Clear any existing posts
  postsContainer.innerHTML = '';

  // Loop through the fetched posts and create post elements
  posts.forEach(post => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);
  });
}

// Function to create a post element
function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  // Create and populate post content (e.g., title, text, date, author, etc.)
  const postTitle = document.createElement('h2');
  postTitle.textContent = post.title;

  const postText = document.createElement('p');
  postText.textContent = post.text;

  const postDate = document.createElement('p');
  postDate.textContent = `Posted on: ${post.date}`;

  const postAuthor = document.createElement('p');
  postAuthor.textContent = `Author: ${post.author}`;

  // Create like, comment, and share buttons (you can add event listeners for these)
  const likeButton = document.createElement('button');
  likeButton.textContent = 'Like';

  const commentButton = document.createElement('button');
  commentButton.textContent = 'Comment';

  const shareButton = document.createElement('button');
  shareButton.textContent = 'Share';

  // Append all elements to the post container
  postElement.appendChild(postTitle);
  postElement.appendChild(postText);
  postElement.appendChild(postDate);
  postElement.appendChild(postAuthor);
  postElement.appendChild(likeButton);
  postElement.appendChild(commentButton);
  postElement.appendChild(shareButton);

  return postElement;
}

// Fetch and display posts when the page loads
window.addEventListener('load', () => {
  fetchPosts();
});
