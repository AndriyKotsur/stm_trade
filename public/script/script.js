'use strict'

window.addEventListener("load", function () {

  /* Header responsive init */
  const headerMenu = document.querySelector(".headerBurgerMenu");
  const headerLang = document.querySelector(".menuTop");
  const headerBurger = document.querySelector('.headerBurger');
  const headerMenuLeft = document.querySelector(".menuLeft");
  const headerMenuRight = document.querySelector(".menuRight")

  ///////////////////////
  if (window.matchMedia("(max-width: 768px)").matches) {
    if (!headerMenuLeft.classList.contains('active') && !headerMenuRight.classList.contains('active')) {
      headerMenuLeft.classList.add('active');
      headerMenuRight.classList.add('active');
      headerMenu.append(headerMenuLeft);
      headerMenu.append(headerMenuRight);
    }
  } else {
    headerMenuLeft.classList.remove('active');
    headerMenuRight.classList.remove('active');
    document.querySelector('.leftColumn').append(headerMenuLeft);
    document.querySelector('.rightColumn').append(headerMenuRight);
  };

  if (window.matchMedia("(max-width: 768px)").matches) {
    if (!headerLang.classList.contains('active')) {
      headerLang.classList.add('active');
      headerMenu.append(headerLang);
    }
  } else {
    headerLang.classList.remove('active');
    document.querySelector('.header-inner').prepend(headerLang);
  };

  /* Filter responsive init */
  const filterContainer = document.querySelector('.filterContainer');
  const filterMenu = document.querySelector('.filterMenu');
  const filterItem = document.querySelectorAll('.filterItem');
  const dropdownMenu = document.querySelector('.dropdownMenu');
  const dropdownBtn = document.querySelector('.dropdownBtn');
  ///////////////////////
  if (window.matchMedia("(max-width: 768px)").matches && filterMenu) {
    if (!filterMenu.classList.contains('active')) {

      filterMenu.classList.add('active');
      dropdownBtn.classList.add('active');

      filterItem.forEach(function (item) {
        item.classList.add('active');
      });

      dropdownMenu.append(filterMenu);
    }
  } else if (filterMenu) {
    filterMenu.classList.remove('active');
    dropdownBtn.classList.remove('active');

    filterItem.forEach(function (item) {
      item.classList.remove('active');
    });

    filterContainer.prepend(filterMenu);
  }

  /* Burger button responsive */

  headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('active');
    headerMenu.classList.toggle('active');
    document.querySelector('body').classList.toggle('active');
  });

  /* Filter button responsive */

  if (dropdownBtn) {
    dropdownBtn.addEventListener('click', () => {
      filterMenu.style.visibility = filterMenu.style.visibility == 'visible' ? 'hidden' : 'visible';
    });
  };

  /* Main page modal image */
  const catalogueImg = document.querySelectorAll(".catalogueTopImg, .catalogueBottomImg");

  ///////////////////////
  catalogueImg.forEach(function (el) {
    el.onmouseover = () => {
      let content = el.getAttribute('data-cover');
      document.getElementById(content).classList.add('active');
    };
    el.onmouseout = () => {
      let content = el.getAttribute('data-cover');
      document.getElementById(content).classList.remove('active');
    }

  })
  /* Modal windows */

  let modalBtns = [...document.querySelectorAll(".popupBtn")];
  modalBtns.forEach(function (btn) {
    btn.onclick = () => {
      let popup = btn.getAttribute("data-popup");
      document.getElementById(popup).style.display = "block";
    };
  });

  ///////////////////////
  let closeBtns = [...document.querySelectorAll(".popupCloseBtn")];
  closeBtns.forEach(function (btn) {
    btn.onclick = () => {
      let popup = btn.closest(".modalWindow, .modalWindowConfirmation");
      popup.style.display = "none";
    };
  });

  window.onclick = (e) => {

    if (e.target.className === "modalWindow") {
      e.target.style.display = "none";
    }
  };

});

///////////////////////
/* Slider init */
let slideIndex = 1;
const slides = document.querySelectorAll(".slidesItem");
const sliderContainer = document.querySelector(".sliderContainer");
const sliderGallery = document.querySelector(".sliderGallery");
const sliderModalContainer = document.querySelector(".sliderModalContainer");
///////////////////////

const showSlides = (index, items) => {
  if (items.length == 0) {
    return false;
  } else if (index > slides.length) {
    slideIndex = 1;
  } else if (index < 1) {
    slideIndex = items.length;
  }
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "none";
  }

  items[slideIndex - 1].style.display = "block";
};
showSlides(slideIndex, slides);

/* Prev button slider */

let prevBtn = document.querySelector(".prevBtn");
if (prevBtn) {
  prevBtn.addEventListener("click", e => {
    e.preventDefault();
    showSlides((slideIndex -= 1), slides);
  });
};

/* Next button slider */

let nextBtn = document.querySelector(".nextBtn");
if (nextBtn) {
  nextBtn.addEventListener("click", e => {
    e.preventDefault();
    showSlides((slideIndex += 1), slides);
  });
};


/* Slideshow slider */

if (sliderGallery) {
  sliderGallery.addEventListener("click", e => {
    e.preventDefault();
    let slidesGallery = event.target.closest("img");
    let temp = [];
    temp[slidesGallery.id - 1] = slidesGallery;
    let index = temp.indexOf(slidesGallery);
    showSlides((slideIndex = ++index), slides);
  });
};
///////////////////////
/* Modal slider */

let titleImage = [...slides];

titleImage.forEach(btn => {
  btn.onclick = () => {

    if (btn) {
      const sliderModal = document.querySelector(".popup-window_slider");
      sliderModal.style.display = "block";
      let slidesChild = sliderContainer.children;

      for (let i = 0; i < slidesChild.length - 2; i++) {
        let temp = slidesChild[i].cloneNode(true);
        temp.classList.add("active");
        sliderModalContainer.append(temp);
      }
      let slidesModal = document.querySelectorAll(".slidesItem.active");
      showSlides(slideIndex, slidesModal);

      /* Control buttons modal slider */

      let prevBtnModal = document.querySelector(".prevBtnModal");

      const prevBtnModalFunc = () => {
        showSlides((slideIndex -= 1), slidesModal);

      }
      if (prevBtnModal) {
        prevBtnModal.addEventListener("click", prevBtnModalFunc);
      }

      let nextBtnModal = document.querySelector(".nextBtnModal");

      const nextBtnModalFunc = () => {
        showSlides(slideIndex += 1, slidesModal);
      }
      if (nextBtnModal) {
        nextBtnModal.addEventListener("click", nextBtnModalFunc);
      }

      /* Close button */
      let closeBtn = document.querySelector('.popupCloseBtnSlider');
      if (closeBtn) {
        closeBtn.addEventListener("click", e => {
          e.preventDefault();
          sliderModal.style.display = "none";
          sliderModalContainer.innerHTML = "";

          prevBtnModal.removeEventListener("click", prevBtnModalFunc);
          nextBtnModal.removeEventListener("click", nextBtnModalFunc);
        })
      };
      window.onclick = (e) => {
        e.preventDefault();
        if (e.target.className === "popup-window_slider") {
          e.target.style.display = "none";
          sliderModalContainer.innerHTML = "";

          prevBtnModal.removeEventListener("click", prevBtnModalFunc);
          nextBtnModal.removeEventListener("click", nextBtnModalFunc);
        }
      };
    }
  };
});


///////////////////////
/* Form data send */
const modalWindows = [...document.querySelectorAll('.modalWindow')];
const spinners = [...document.querySelectorAll('.spinner')];
const confirmationWindow = document.querySelector('.modalWindowConfirmation');
console.log(spinners);


const formSend = (formData) => {
  spinners.forEach(function (spinner) {
    if (spinner) {
      spinner.classList.add('active');
    }
  });

  fetch('/send-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      console.log(res);
    })
    .then(function () {

      spinners.forEach(function (spinner) {
        if (spinner) {
          spinner.classList.remove('active');
        }
      });

      modalWindows.forEach(function (modalWindow) {

        if (modalWindow) {
          modalWindow.style.display = 'none';
        }
      });

      document.querySelector('.headerBurgerMenu').classList.toggle('active');
      document.querySelector('body').classList.toggle('active');
      document.querySelector('.headerBurger').classList.toggle('active');
      confirmationWindow.classList.add('active');
    })
    .catch(err => {
      console.log(err);
    });
};

const forms = document.getElementsByTagName('form');

for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', function (e) {
    e.preventDefault();

    let formData = new FormData(this);
    formData = Object.fromEntries(formData);

    formSend(formData);
    this.reset();
  });
};