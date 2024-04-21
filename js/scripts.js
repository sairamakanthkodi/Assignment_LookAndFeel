let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

document.addEventListener('DOMContentLoaded', function () {
  displayReviews();
});

document.getElementById('reviewForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const carBrand = document.getElementById('carBrand').value;
  const rating = document.getElementById('rating').value;
  const reviewText = document.getElementById('reviewText').value;
  const newReview = { carBrand, rating, reviewText, date: new Date().toLocaleDateString() };

  const editIndex = this.dataset.editIndex;
  if (editIndex) { // If editing an existing review
    reviews[editIndex] = newReview;
    delete this.dataset.editIndex;
  } else { // Adding a new review
    reviews.push(newReview);
  }

  localStorage.setItem('reviews', JSON.stringify(reviews));
  displayReviews();
  this.reset();
});

function displayReviews() {
  const reviewsContainer = document.getElementById('reviewsContainer');
  reviewsContainer.innerHTML = reviews.map((review, index) => `
      <div class="col-12 col-md-4 review-card">
          <h5>${review.carBrand} - ${review.rating} Stars</h5>
          <small>Reviewed on ${review.date}</small>
          <p>${review.reviewText}</p>
          <button onclick="editReview(${index})" class="btn btn-primary">Edit</button>
          <button onclick="deleteReview(${index})" class="btn btn-danger">Delete</button>
      </div>
  `).join('');
}
function editReview(index) {
  const review = reviews[index];
  document.getElementById('carBrand').value = review.carBrand;
  document.getElementById('rating').value = review.rating;
  document.getElementById('reviewText').value = review.reviewText;
  document.getElementById('reviewForm').dataset.editIndex = index; // Store index for updating the review
}

function deleteReview(index) {
  if (confirm('Are you sure you want to delete this review?')) {
    reviews.splice(index, 1);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    displayReviews();
  }
}

