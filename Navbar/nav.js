// Navbar scroll effect
const navSearch = document.querySelector("#navSearch");
const bottomNavbar = document.querySelector(".bottom-navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 150) {
    bottomNavbar.classList.add("fixed-top");
    navSearch.style.display = "flex";
  } else {
    bottomNavbar.classList.remove("fixed-top");
    navSearch.style.display = "none";
  }
});
