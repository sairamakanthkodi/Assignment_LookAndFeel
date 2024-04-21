
// Data for the dropdowns and table
const vehicleData = [
    { brand: 'AUDI', model: 'A3', electricRange: 16, city: 'Seattle', county: 'King' },
    { brand: 'AUDI', model: 'A3', electricRange: 16, city: 'Olympia', county: 'Thurston' },
    { brand: 'TESLA', model: 'MODEL S', electricRange: 210, city: 'Lacey', county: 'Thurston' },
    { brand: 'JEEP', model: 'WRANGLER', electricRange: 25, city: 'Tenino', county: 'Thurston' },
    { brand: 'TESLA', model: 'MODEL 3', electricRange: 308, city: 'Yakima', county: 'Yakima' },
    { brand: 'JEEP', model: 'WRANGLER', electricRange: 21, city: 'Olympia', county: 'Thurston' },
    { brand: 'CHEVROLET', model: 'VOLT', electricRange: 53, city: 'Keyport', county: 'Kitsap' },
    { brand: 'TESLA', model: 'MODEL 3', electricRange: 322, city: 'Mountlake Terrace', county: 'Snohomish' },
    { brand: 'AUDI', model: 'Q5', electricRange: 23, city: 'Seattle', county: 'King' }
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    // Populate table with vehicle data
    const tableBody = document.getElementById('tableBody');
    vehicleData.forEach(vehicle => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = vehicle.brand;
      row.insertCell(1).textContent = vehicle.model;
      row.insertCell(2).textContent = vehicle.electricRange;
      row.insertCell(3).textContent = vehicle.city;
      row.insertCell(4).textContent = vehicle.county;
    });
  
    // Extract unique counties and brands for dropdowns
    const uniqueCounties = [...new Set(vehicleData.map(vehicle => vehicle.county))];
    const uniqueBrands = [...new Set(vehicleData.map(vehicle => vehicle.brand))];
  
    // Populate County dropdown
    const dropdownCounty = document.getElementById('dropdownCounty');
    uniqueCounties.forEach(county => {
      const option = new Option(county, county);
      dropdownCounty.add(option);
    });
  
    // Populate Brand dropdown
    const dropdownBrand = document.getElementById('dropdownBrand');
    uniqueBrands.forEach(brand => {
      const option = new Option(brand, brand);
      dropdownBrand.add(option);
    });
  });
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

document.addEventListener('DOMContentLoaded', function () {
  displayReviews();
});

//review form
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