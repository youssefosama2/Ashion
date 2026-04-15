// =======================
// Countdown Timer discount
// =======================
var countdownDate = new Date("Dec 31, 2026 23:59:59").getTime();
var countdownFunction = setInterval(function() {
  var now = new Date().getTime();
  
  var distance = countdownDate - now;
  
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  var d = (days < 10) ? "0" + days : days;
  var h = (hours < 10) ? "0" + hours : hours;
  var m = (minutes < 10) ? "0" + minutes : minutes;
  var s = (seconds < 10) ? "0" + seconds : seconds;

  if (document.getElementById("Day")) document.getElementById("Day").innerHTML = d;
  if (document.getElementById("houers")) document.getElementById("houers").innerHTML = h;
  if (document.getElementById("minute")) document.getElementById("minute").innerHTML = m;
  if (document.getElementById("seconds")) document.getElementById("seconds").innerHTML = s;

  if (distance < 0) {
    clearInterval(countdownFunction);
    var timerElement = document.getElementById("countdown-time");
    if (timerElement) {
        timerElement.innerHTML = "EXPIRED";
    }
  }
}, 1000);

// =======================
// form contact
// =======================

function formValidateContact(){
    const Username = document.getElementById("Name").value;
    const youremail = document.getElementById("Email").value;
    const yourSubject = document.getElementById("subject").value;
    const yourmessage = document.getElementById("message").value;
    const ErorrName = document.getElementById("ErorrName");
    const ErorrEmail = document.getElementById("ErorrEmail");
    const ErorrSubject = document.getElementById("ErorrSubject");
    const ErorrMessage = document.getElementById("ErorrMessage");
    var text ='';
    if(Username.length < 5){
        text ="please Enter valid name";
        ErorrName.innerHTML= text;
        Name.style.border = "1px solid #FF0000";
        return false;
    }else if(youremail.indexOf("@") == -1 || youremail.length < 10){
        ErorrName.innerHTML= "";
        text ="please Enter valid email";
        ErorrEmail.innerHTML= text;
        Email.style.border = "1px solid #FF0000";
        Name.style.border = "1px solid #DDDFE2";
        return false;
    }else if(yourSubject.length < 5){
        ErorrEmail.innerHTML= "";
        text ="please Enter valid Subject";
        ErorrSubject.innerHTML= text;
        subject.style.border = "1px solid #FF0000";
        Email.style.border = "1px solid #DDDFE2";
        return false;
    }else if(yourmessage.length < 10){
        ErorrSubject.innerHTML= "";
        text ="please Enter valid message";
        ErorrMessage.innerHTML= text;
        message.style.border = "1px solid #FF0000";
        subject.style.border = "1px solid #DDDFE2";
        return false;
    }else {
         // success message with loading
    Swal.fire({
        title: "Sending message...",
        html: "Please wait ⏳",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    setTimeout(() => {
    Swal.close(); 
    Swal.fire({
        title: "Message sent successfully",
        icon: "success",
        confirmButtonText: "OK"
    }).then(() => {
        const form = document.getElementById("contactForm"); 
        form.reset();
        ErorrName.innerHTML= "";
        ErorrEmail.innerHTML= "";
        ErorrSubject.innerHTML= "";
        ErorrMessage.innerHTML= "";
        Name.style.border = "1px solid #DDDFE2";
        Email.style.border = "1px solid #DDDFE2";
        subject.style.border = "1px solid #DDDFE2";
        message.style.border = "1px solid #DDDFE2";
    });
}, 2000);
    return false;
    }
}

// =======================
// Accordion Categories
// =======================

let headers = document.querySelectorAll(".category-header");

headers.forEach(header => {

header.addEventListener("click", () => {

let sub = header.nextElementSibling;
let arrow = header.querySelector(".arrow");

let opened = sub.classList.contains("open");

document.querySelectorAll(".sub").forEach(menu=>{
menu.classList.remove("open");
});

document.querySelectorAll(".arrow").forEach(a=>{
a.classList.remove("rotate");
});

if(!opened){
sub.classList.add("open");
arrow.classList.add("rotate");
}

});

});


// =======================
// Price Slider
// =======================

const rangeMin = document.querySelector(".range-min");
const rangeMax = document.querySelector(".range-max");
const progress = document.querySelector(".progress");
const minText = document.getElementById("min");
const maxText = document.getElementById("max");

let minGap = 5;
let maxValue = 1000;

function updateSlider(event) {

if(!rangeMin || !rangeMax || !progress || !minText || !maxText) return;

  let minVal = Number(rangeMin.value);
  let maxVal = Number(rangeMax.value);

  // منع تقارب القيم
  if (event && (maxVal - minVal < minGap)) {
    if (event.target.classList.contains("range-min")) {
      rangeMin.value = maxVal - minGap;
    } else {
      rangeMax.value = minVal + minGap;
    }
  }

  // تحديث القيم بعد التعديل
  minVal = Number(rangeMin.value);
  maxVal = Number(rangeMax.value);

  // تحريك الـ progress bar
  progress.style.left = (minVal / maxValue) * 100 + "%";
  progress.style.right = (100 - (maxVal / maxValue) * 100) + "%";

  // عرض القيم
  minText.textContent = minVal;
  maxText.textContent = maxVal;
}

// تشغيل الكود فقط لو العناصر موجودة
if(rangeMin && rangeMax){

rangeMin.addEventListener("input", updateSlider);
rangeMax.addEventListener("input", updateSlider);

// تشغيل أول مرة
updateSlider();

}


// =======================
// Change Page
// =======================

function changePage(page){

let pages = Math.ceil(filteredProducts.length / itemsPerPage);

if(page < 1) page = 1;
if(page > pages) page = pages;

currentPage = page;

displayProducts();
document.getElementById("products").scrollIntoView({
behavior: "smooth"
});
}

function createPagination(){

let pagination = document.getElementById("pagination");
if(!pagination) return;

let pages = Math.ceil(filteredProducts.length / itemsPerPage);

if(pages <= 1){
pagination.innerHTML = "";
return;
}

pagination.innerHTML = "";

// زرار السابق
pagination.innerHTML += `
<button onclick="changePage(${currentPage - 1})" 
${currentPage === 1 ? "disabled" : ""}>
<i class="fa-solid fa-arrow-left"></i>
</button>
`;

let start = Math.max(1, currentPage - 1);
let end = Math.min(pages, currentPage + 1);

// أول صفحة
if(start > 1){
pagination.innerHTML += `
<button onclick="changePage(1)">1</button>
`;

if(start > 2){
pagination.innerHTML += `<span class="dots">...</span>`;
}
}

// الصفحات الحالية
for(let i = start; i <= end; i++){

pagination.innerHTML += `
<button class="${currentPage === i ? "active" : ""}" 
onclick="changePage(${i})">
${i}
</button>
`;

}

// آخر صفحة
if(end < pages){

if(end < pages - 1){
pagination.innerHTML += `<span class="dots">...</span>`;
}

pagination.innerHTML += `
<button onclick="changePage(${pages})">${pages}</button>
`;

}

// زرار التالى
pagination.innerHTML += `
<button onclick="changePage(${currentPage + 1})"
${currentPage === pages ? "disabled" : ""}>
<i class="fa-solid fa-arrow-right"></i>
</button>
`;

}

// =======================
// Filter By Price
// =======================

const filterBtn = document.querySelector(".filter-btn");

if(filterBtn){

filterBtn.addEventListener("click", () => {

let min = Number(rangeMin.value);
let max = Number(rangeMax.value);

filteredProducts = products.filter(product => {
return product.price >= min && product.price <= max;
});

currentPage = 1;
displayProducts();

});

}


// =======================
// Products
// =======================


let products = [];
let filteredProducts = [];

let jsonFile = document.body.dataset.json;

if(jsonFile){
fetch(`assets/data/${jsonFile}`)
.then(res => res.json())
.then(data => {
  products = data;
  filterProducts(products[0].category, document.querySelector("ul button"));
})
.catch(error => console.log("JSON Error:", error));
}
// =======================
// Display Products
// =======================

let currentPage = 1;
let itemsPerPage = 8;

function displayProducts(){

let start = (currentPage - 1) * itemsPerPage;
let end = start + itemsPerPage;

let paginatedItems = filteredProducts.slice(start,end);

let shop = document.getElementById("products");
shop.innerHTML = "";

paginatedItems.forEach(product => {

shop.innerHTML += `
<div class="col-lg-3 col-md-6 col-sm-12 mt-5 ${product.category} product show wow fadeInUp" data-wow-duration="2s" data-wow-delay=".2s">
<div class="product-card">
  <div class="img-box">
    <img src="${product.image}"  loading="lazy" alt="image">
    <div class="icons">
      <i class="fa-solid fa-up-right-and-down-left-from-center quick-view" onclick="quickView('${product.image}')"></i>
      <i class="fa-regular fa-heart" onclick="addToWishlist(${product.id}, '${product.category}')"></i>
      <i class="fa-solid fa-bag-shopping" onclick="addToCart(${product.id}, '${product.category}')"></i>
    </div>
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
    <div class="price">$ ${product.price}</div>
  </div>
</div>
`;
});

createPagination();
}
function filterProducts(category , element){
// تغيير active
if(element){
document.querySelectorAll("ul button").forEach(btn=>{
btn.classList.remove("active");
});
element.classList.add("active");
}
currentPage = 1;

filteredProducts = products.filter(product => {
  return product.category === category;
});

displayProducts();


}


// =======================
// Quick View
// =======================

function quickView(image){

document.getElementById("modalImg").src = image;
document.getElementById("quickModal").style.display = "flex";
}
function closeQuickView(){
document.getElementById("quickModal").style.display = "none";
}


// =======================
// scroll To Top Btn
// =======================

const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});
scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});













