// ==========================
// display Checkout
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = Number(localStorage.getItem("discount")) || 0;

function displayCheckout() {
  let container = document.getElementById("checkoutItems");
  let total = 0;

  container.innerHTML = "";

  cart.forEach(product => {
    total += product.price * product.quantity;

    container.innerHTML += `
    <li>
      <span class="name-Product">${product.title} × ${product.quantity}</span>
      <span>${product.price * product.quantity} $</span>
    </li>
    `;
  });

  document.getElementById("SubTotal").innerText = total + " $";
  document.getElementById("DiscountTotal").innerText = discount + " $";
  document.getElementById("Total").innerText = (total - discount) + " $";
}
displayCheckout();


// ==========================
// placeOrder
// ==========================

emailjs.init("anr-O9OKANGHbavgV");

function placeOrder(e) {
  e.preventDefault();

  const FirstName = document.getElementById("First-Name");
  const LastName = document.getElementById("Last-Name");
  const Country = document.getElementById("Country");
  const City = document.getElementById("City");
  const Address = document.getElementById("Address");
  const Phone = document.getElementById("Phone");
  const Email = document.getElementById("Email");

  const ErorrFirstName = document.getElementById("ErorrFirstName");
  const ErorrLastName = document.getElementById("ErorrLastName");
  const ErorrCountry = document.getElementById("ErorrCountry");
  const ErorrCity = document.getElementById("ErorrCity");
  const ErorrAddress = document.getElementById("ErorrAddress");
  const ErorrPhone = document.getElementById("ErorrPhone");
  const ErorrEmail = document.getElementById("ErorrEmail");

  var text = '';

  // validation
  if (FirstName.value.length < 3) {
    text = "please Enter valid First Name";
    ErorrFirstName.innerHTML = text;
    FirstName.style.border = "1px solid red";
    FirstName.scrollIntoView({behavior: "smooth", block: "center"});
    FirstName.focus();
    return false;
  } else if (LastName.value.length < 3) {
    FirstName.style.border = "1px solid #DDDFE2";
    ErorrFirstName.innerHTML = "";
    text = "please Enter valid Last Name";
    ErorrLastName.innerHTML = text;
    LastName.style.border = "1px solid red";
    LastName.scrollIntoView({behavior: "smooth", block: "center"});
    LastName.focus();
    return false;
  } else if (Country.value.length < 3) {
    ErorrLastName.innerHTML = "";
    LastName.style.border = "1px solid #DDDFE2";
    text = "please Enter valid Country";
    ErorrCountry.innerHTML = text;
    Country.style.border = "1px solid red";
    Country.scrollIntoView({behavior: "smooth", block: "center"});
    Country.focus();
    return false;
  } else if (City.value.length < 3) {
    ErorrCountry.innerHTML = "";
    Country.style.border = "1px solid #DDDFE2";
    text = "please Enter valid City";
    ErorrCity.innerHTML = text;
    City.style.border = "1px solid red";
    City.scrollIntoView({behavior: "smooth", block: "center"});
    City.focus();
    return false;
  } else if (Address.value.length < 3) {
    ErorrCity.innerHTML = "";
    City.style.border = "1px solid #DDDFE2";
    text = "please Enter valid Address";
    ErorrAddress.innerHTML = text;
    Address.style.border = "1px solid red";
    Address.scrollIntoView({behavior: "smooth", block: "center"});
    Address.focus();
    return false;
  } else if (Phone.value.length < 11) {
    ErorrAddress.innerHTML = "";
    Address.style.border = "1px solid #DDDFE2";
    text = "please Enter valid Phone Number";
    ErorrPhone.innerHTML = text;
    Phone.style.border = "1px solid red";
    Phone.scrollIntoView({behavior: "smooth", block: "center"});
    Phone.focus();
    return false;
  } else if (!Email.value.includes("@")) {
    ErorrPhone.innerHTML = "";
    Phone.style.border = "1px solid #DDDFE2";
    text = "please Enter valid Email";
    ErorrEmail.innerHTML = text;
    Email.style.border = "1px solid red";
    Email.scrollIntoView({behavior: "smooth", block: "center"});
    Email.focus();
    return false;
  } else {
    // loading
    Swal.fire({
      title: "Processing your order...",
      html: "Please wait ⏳",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    let orderDetails = cart.map(item => {
      return `${item.title} × ${item.quantity} = ${item.price * item.quantity} $`;
    }).join("\n");

    let total = cart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    let orders = cart.map(item => {
  return {
    name: item.title,
    units: item.quantity,
    price: item.price * item.quantity
  };
});

let subtotal = cart.reduce((sum, item) => {
  return sum + (item.price * item.quantity);
}, 0);

let finalTotal = subtotal - discount;

emailjs.send("service_dmoivft", "template_qlnapfo", {
  user_name: FirstName.value + " " + LastName.value,
  user_email: Email.value,
  orders: orders,       
  subtotal: subtotal,    
  discount: discount,
  total: finalTotal
}).then(() => {
      Swal.fire({
        title: "Order placed successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        localStorage.removeItem("cart");
        localStorage.removeItem("discount");
        window.location.href = "index.html";
      });
    }).catch(() => {
      Swal.fire("Error", "Failed to send email ❌", "error");
    });
  }
}
