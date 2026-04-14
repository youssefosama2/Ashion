// ==========================
// Wishlist Count
// ==========================

function updateWishlistCount() {

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let count = document.getElementById("wishlist-count");

if(!count) return;

count.innerText = wishlist.length;

if(wishlist.length === 0){
count.style.display = "none";
}else{
count.style.display = "flex";
}
}


// ==========================
// Add To wishlist
// ==========================

function addToWishlist(id , category) {

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let product = products.find(p => p.id == id && p.category == category);

if(!product) return;

let existing = wishlist.find(item => 
item.id == id && item.category == category
);

if (existing) {
existing.quantity += 1;
Swal.fire({
title: "The product already exists",
icon: "warning",
timer: 1500,
showConfirmButton: false
});
} else {
wishlist.push({ ...product, quantity: 1 });
Swal.fire({
title: "Added To wishlist",
icon: "success",
timer: 1500,
showConfirmButton: false
});
}

localStorage.setItem("wishlist", JSON.stringify(wishlist));



updateWishlistCount();
}



// =======================
// Display Wishlist
// =======================

function displayWishlist(){

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let container = document.getElementById("products");
let empty = document.getElementById("empty");

if(!container) return;

container.innerHTML = "";

if(wishlist.length === 0){
if(empty) empty.style.display = "block";
return;
}

if(empty) empty.style.display = "none";

wishlist.forEach(product => {

container.innerHTML += `

<div class="col-lg-3 col-md-6 col-sm-12 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".2s">
<div class="product-card">

<div class="img-box">
<img src="${product.image}">

<div class="icons">
<i class="fa-solid fa-up-right-and-down-left-from-center quick-view" onclick="quickView('${product.image}')"></i>

<i class="fa-solid fa-trash-can" onclick="removeWishlist(${product.id}, '${product.category}')"></i>

<i class="fa-solid fa-bag-shopping" onclick="moveToCart(${product.id}, '${product.category}')"></i>
</div>

</div>

<div class="text mt-3">
<h4>${product.title}</h4>
<div class="icon">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
</div>
<div class="price">$${product.price}</div>
</div>

</div>
</div>

`;

});
}



// =======================
// Remove Wishlist
// =======================

function removeWishlist(id , category){

Swal.fire({
title: "Are you sure?",
text: "You won't be able to revert this!",
icon: "warning",
showCancelButton: true,
confirmButtonColor: "#3085d6",
cancelButtonColor: "#d33",
confirmButtonText: "Yes, delete it!"
}).then((result) => {

if (result.isConfirmed) {

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

wishlist = wishlist.filter(p => 
!(p.id == id && p.category == category)
);

localStorage.setItem("wishlist", JSON.stringify(wishlist));

displayWishlist();
updateWishlistCount();

Swal.fire({
title: "Deleted!",
icon: "success"
});

}

});

}



// =======================
// Move To Cart
// =======================

function moveToCart(id , category){

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let product = wishlist.find(p => 
p.id == id && p.category == category
);

if(!product) return;

let existing = cart.find(item => 
item.id == id && item.category == category
);

if(existing){
existing.quantity += 1;
}else{
cart.push({...product , quantity:1});
}

localStorage.setItem("cart", JSON.stringify(cart));

// حذف من wishlist
wishlist = wishlist.filter(p => 
!(p.id == id && p.category == category)
);

localStorage.setItem("wishlist", JSON.stringify(wishlist));

displayWishlist();
updateWishlistCount();
updateCartCount();

Swal.fire({
title: "Moved To Cart",
icon: "success",
timer: 1500,
showConfirmButton: false
});

}



// =======================
// Start
// =======================

document.addEventListener("DOMContentLoaded", () => {
displayWishlist();
updateWishlistCount();
});