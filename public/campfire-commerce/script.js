// Fetch product data from JSON source
window.addEventListener("load", () => {
  const detailsXHR = new XMLHttpRequest();
  detailsXHR.open('GET', 'json/product.json');
  detailsXHR.responseType = 'json';
  detailsXHR.onload = function() {
    if (this.status === 200) {
      updateProductInfo(this.response);
    }
  };
  detailsXHR.send();

  const reviewsXHR = new XMLHttpRequest();
  reviewsXHR.open('GET', 'json/reviews.json');
  reviewsXHR.responseType = 'json';
  reviewsXHR.onload = function() {
    if (this.status === 200) {
      updateReviews(this.response);
    }
  };
  reviewsXHR.send();

  var MenuItems = document.getElementById('MenuItems');
  MenuItems.style.maxHeight = '0px';

  function menutoggle() {
    if (MenuItems.style.maxHeight == '0px') {
      MenuItems.style.maxHeight = '200px';
    } else {
      MenuItems.style.maxHeight = '0px';
    }
  }

  var ProductImg = document.getElementById('product-image');
  document.getElementById('small-product-image-1').onclick = function() {
    ProductImg.src = this.src;
  };
  document.getElementById('small-product-image-2').onclick = function() {
    ProductImg.src = this.src;
  };
});


// Update product information in HTML elements
function updateProductInfo(product) {
  document.getElementById('product-image').src = product.image;
  document.getElementById('small-product-image-1').src = product.image;
  document.getElementById('small-product-image-2').src = product.images[0];
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-price').textContent = `$${product.price}`;

  const productFeatures = document.getElementById('product-features');
  productFeatures.innerHTML = '';
  product.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    productFeatures.appendChild(li);
  });

  const productRelated = document.getElementById('product-related');
  productRelated.innerHTML = '';
  product.related.forEach(rel => {
    const div = document.createElement('div');
    div.innerHTML = `<img src="${rel.image}" />
<h4>${rel.name}</h4>
<p>$${rel.price}</p>`;
    div.className = "col-" + product.related.length;
    productRelated.appendChild(div);
  });
}

function updateReviews(reviews) {
  const productReviews = document.getElementById('product-reviews');
  productReviews.innerHTML = '';
  reviews.forEach(review => {
    const div = document.createElement('div');
    div.innerHTML = `<h4>${review.split(' ').slice(0,5).join(' ')}...</h4>
    <p>${review}</p>`;
    div.className = "col-" + reviews.length;
    productReviews.appendChild(div);
  });
}
