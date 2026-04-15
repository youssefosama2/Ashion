// ==========================
// Cart Count
// ==========================
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = cart.reduce((total, product) => total + product.quantity, 0);
    
    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        if (count > 0) {
            cartCount.innerText = count;
            cartCount.style.display = "flex"; 
        } else {
            cartCount.style.display = "none"; 
        }
    }
}


// ==========================
// Add To Cart
// ==========================
function addToCart(id , category) {

let product = products.find(p => 
p.id == id && p.category == category
);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let existing = cart.find(item => 
item.id == id && item.category == category
);

if (existing) {
existing.quantity += 1;
} else {
cart.push({ ...product, quantity: 1 });
}

localStorage.setItem("cart", JSON.stringify(cart));

Swal.fire({
title: "Added To Cart",
icon: "success",
timer: 1500,
showConfirmButton: false
});

updateCartCount();
displayCart();
}

// ==========================
// Cart
// ==========================
let discountValue = Number(localStorage.getItem("discount")) || 0;
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");
    let secCart = document.getElementById("pro-cart");
    let empty = document.getElementById("empty");
    let total = 0;
    
    if(!container) return;
    if(cart.length === 0){
        empty.style.display = "block"
        secCart.style.display = "none"
    }else{
        empty.style.display = "none"
        secCart.style.display = "block"
    }
    container.innerHTML = "";

    cart.forEach((product, index) => {
        total += product.price * product.quantity;

        container.innerHTML += `
<tr>
    <td class="td-Product">  
        <div>
            <img src="${product.image}" width="80px" alt=""> 
        </div>
        <div class="title">
            <h6>${product.title}</h6>
            <div class="icon">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
        </div>
    </td>
    <td class="price">$ ${product.price}</td>
    <td class="td-Quantity">
        <span onclick="decreaseQty(${index})"><i class="fa-solid fa-minus"></i></span>
        <span class="Quantity">${product.quantity}</span>
        <span onclick="increaseQty(${index})"><i class="fa-solid fa-plus"></i></span>
    </td>
    <td><span class="total">${product.price * product.quantity}</span></td>
    <td class="delete">
        <i class="fa-solid fa-xmark" onclick="removeItem(${index})"></i>
    </td>
</tr>
        `;
    });

    document.getElementById("SubTotal").innerText = total + " $";
    document.getElementById("DiscountTotal").innerText = discountValue + " $";
    document.getElementById("Total").innerText = total - discountValue + " $";

    updateCartCount();
}


// ==========================
// Apply Discount
// ==========================
function applyDiscount() {
    let input = document.getElementById("DiscountCode").value.trim().toUpperCase();

    if (input === "DIS123") {
        discountValue = 25; 
        Swal.fire({
          title: "Discount Added",
          icon: "success",
          draggable: true
        });
    } else {
        discountValue = 0;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
    }
    localStorage.setItem("discount", discountValue);
    displayCart();
}

// ==========================
// Increase Quantity
// ==========================
function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}


// ==========================
// Decrease Quantity
// ==========================
function decreaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}


// ==========================
// Remove Item
// ==========================
function removeItem(index) {
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
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
}


// ==========================
// Start
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartCount();
});