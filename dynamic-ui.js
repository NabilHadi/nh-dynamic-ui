const hideClass = "nh-dynamic-ui-hide";
createCSSSelector("." + hideClass, "display: none");

const dropDownMenusClick = document.querySelectorAll(".drop-menu-click");
dropDownMenusClick.forEach((menu) => {
  const menuTitle = menu.querySelector(".drop-menu-title");
  const menuItems = menu.querySelectorAll(".drop-menu-item");

  menuItems.forEach((item) => {
    item.classList.add(hideClass);
  });

  let isShown = false;
  menuTitle.addEventListener("click", () => {
    menuItems.forEach((item) => {
      if (isShown) {
        item.classList.add(hideClass);
      } else {
        item.classList.remove(hideClass);
      }
    });
    isShown = !isShown;
  });
});

const dropDownMenusHover = document.querySelectorAll(".drop-menu-hover");
dropDownMenusHover.forEach((menu) => {
  const menuItems = menu.querySelectorAll(".drop-menu-item");

  menuItems.forEach((item) => {
    item.classList.add(hideClass);
  });

  menu.addEventListener("mouseenter", () => {
    menuItems.forEach((item) => item.classList.remove(hideClass));
  });

  menu.addEventListener("mouseleave", () => {
    menuItems.forEach((item) => item.classList.add(hideClass));
  });
});

const imageCarouselProto = {
  getNextNumberInRange() {
    const { max, currentImageNumber: current } = this;
    if (current < 0 || current + 1 > max) {
      return 0;
    } else {
      return current + 1;
    }
  },

  getPreviousNumberInRange() {
    const { max, currentImageNumber: current } = this;
    if (current < 0 || current - 1 < 0) {
      return max;
    } else {
      return current - 1;
    }
  },
  advance(advanceNumberFn) {
    const { imageCarouselItems } = this;
    this.removeActiveClass();
    imageCarouselItems[this.currentImageNumber].classList.add(hideClass);
    this.currentImageNumber = advanceNumberFn.call(this);
    imageCarouselItems[this.currentImageNumber].classList.remove(hideClass);
    this.setActiveClass();
    this.setUpTimeout();
  },
  next() {
    this.advance(this.getNextNumberInRange);
  },
  previous() {
    this.advance(this.getPreviousNumberInRange);
  },
  goto(index) {
    this.advance(() => Number(index));
  },
  setUpTimeout() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.next();
    }, 2000);
  },
  setActiveClass() {
    const dot = this.navigationDotsList.querySelector(
      `[data-index="${this.currentImageNumber}"]`
    );
    dot.classList.add("active");
  },
  removeActiveClass() {
    const dot = this.navigationDotsList.querySelector(
      `[data-index="${this.currentImageNumber}"]`
    );
    dot.classList.remove("active");
  },
};

function createImageCarousel(imageCarouselContainer) {
  const obj = {};
  obj.imageCarouselItems = imageCarouselContainer.querySelectorAll(
    ".image-carousel-item"
  );

  obj.max = obj.imageCarouselItems.length - 1;

  obj.nextBtn = imageCarouselContainer.querySelector(
    ".image-carousel-next-btn"
  );
  obj.previousBtn = imageCarouselContainer.querySelector(
    ".image-carousel-previous-btn"
  );
  obj.nextBtn.addEventListener("click", () => {
    obj.next();
  });
  obj.previousBtn.addEventListener("click", () => {
    obj.previous();
  });

  obj.currentImageNumber = 0;
  obj.imageCarouselItems.forEach((item, key) => {
    if (key === obj.currentImageNumber) return;
    item.classList.add(hideClass);
  });

  obj.navigationDotsList = imageCarouselContainer.querySelector(
    ".image-carousel-dots-list"
  );
  obj.imageCarouselItems.forEach((item, key) => {
    obj.navigationDotsList.innerHTML += `<div class="image-carousel-dot" data-index="${key}"></div>`;
  });
  obj.navigationDotsList.addEventListener("click", (event) => {
    const index = event.target.dataset.index;
    if (index == undefined) return;

    obj.goto(index);
  });

  obj.timeoutId = null;
  return Object.assign(obj, imageCarouselProto);
}

const imageCarousels = Array.from(
  document.querySelectorAll(".image-carousel-container")
)
  .map(createImageCarousel)
  .forEach((caruousel) => {
    caruousel.setUpTimeout();
    caruousel.setActiveClass();
  });

// Function to create CSS classes using JavaScript
// I used it to create a "hide" class to hide menu items
// Original SOW answer: https://stackoverflow.com/a/8630641/8327347
function createCSSSelector(selector, style) {
  if (!document.styleSheets) return;
  if (document.getElementsByTagName("head").length == 0) return;

  var styleSheet, mediaType;

  if (document.styleSheets.length > 0) {
    for (var i = 0, l = document.styleSheets.length; i < l; i++) {
      if (document.styleSheets[i].disabled) continue;
      var media = document.styleSheets[i].media;
      mediaType = typeof media;

      if (mediaType === "string") {
        if (media === "" || media.indexOf("screen") !== -1) {
          styleSheet = document.styleSheets[i];
        }
      } else if (mediaType == "object") {
        if (
          media.mediaText === "" ||
          media.mediaText.indexOf("screen") !== -1
        ) {
          styleSheet = document.styleSheets[i];
        }
      }

      if (typeof styleSheet !== "undefined") break;
    }
  }

  if (typeof styleSheet === "undefined") {
    var styleSheetElement = document.createElement("style");
    styleSheetElement.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(styleSheetElement);

    for (i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].disabled) {
        continue;
      }
      styleSheet = document.styleSheets[i];
    }

    mediaType = typeof styleSheet.media;
  }

  if (mediaType === "string") {
    for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
      if (
        styleSheet.rules[i].selectorText &&
        styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()
      ) {
        styleSheet.rules[i].style.cssText = style;
        return;
      }
    }
    styleSheet.addRule(selector, style);
  } else if (mediaType === "object") {
    var styleSheetLength = styleSheet.cssRules ? styleSheet.cssRules.length : 0;
    for (var i = 0; i < styleSheetLength; i++) {
      if (
        styleSheet.cssRules[i].selectorText &&
        styleSheet.cssRules[i].selectorText.toLowerCase() ==
          selector.toLowerCase()
      ) {
        styleSheet.cssRules[i].style.cssText = style;
        return;
      }
    }
    styleSheet.insertRule(selector + "{" + style + "}", styleSheetLength);
  }
}
