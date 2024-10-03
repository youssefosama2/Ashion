// تحديد ميعاد نهاية الخصم
var countdownDate = new Date("Dec 1, 2025 23:59:59").getTime();

// تحديث التايمر كل ثانية
var countdownFunction = setInterval(function() {
  // الحصول على الوقت الحالي
  var now = new Date().getTime();
  // حساب الفرق بين الوقت الحالي وميعاد نهاية الخصم
  var distance = countdownDate - now;
  // حساب الأيام والساعات والدقائق والثواني المتبقية
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // زياده 0 لو الرقم اصغر من 10
  days = (days < 10) ? "0" + days : days ;
  hours = (hours < 10) ? "0" + hours : hours ;
  minutes = (minutes < 10) ? "0" + minutes : minutes ;
  seconds = (seconds < 10) ? "0" + seconds : seconds ;
  //  النتيجة في الـ HTML
  document.getElementById("Day").innerHTML = days;
  document.getElementById("houers").innerHTML = hours;
  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
  // عند انتهاء الوقت
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown-time").innerHTML = "EXPIRED";
  }
}, 1000);





function filterProducts(category , element) {
    var products = document.getElementsByClassName('product');
    
    for (var i = 0; i < products.length; i++) {
      products[i].classList.remove('show'); // إزالة الفئة show من جميع المنتجات
      if (category === 'all' || products[i].classList.contains(category)) {
        products[i].classList.add('show'); // إضافة الفئة show إذا كان المنتج ينتمي للصنف المختار أو إذا كانت الفئة all
      }
    }
    // إزالة الـ 'active' class من جميع الأزرار
    var buttons = document.querySelectorAll("ul button");
    buttons.forEach(function(button) {
      button.classList.remove('active');
    });
    // إضافة الـ 'active' class للزر الذي تم الضغط عليه
    element.classList.add('active');
  }
   
