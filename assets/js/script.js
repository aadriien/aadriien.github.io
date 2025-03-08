'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {
    // convert to array for multiple categories
    const itemCategories = filterItems[i].dataset.category.split(",").map(cat => cat.trim()) 

    if (selectedValue === "all" || itemCategories.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}





// travel page spinning globe with pins

function getCssVar(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName);
}

function addAlphaToColor(color, alpha) {
    // If color is already in RGBA format, change alpha value
    if (color.startsWith('rgba')) {
        return color.replace(/rgba\((\d+), (\d+), (\d+), (\d+\.?\d*)\)/, (match, r, g, b) => `rgba(${r}, ${g}, ${b}, ${alpha})`);
    }
    // If color is in RGB format, convert to RGBA
    if (color.startsWith('rgb')) {
        return color.replace(/rgb\((\d+), (\d+), (\d+)\)/, (match, r, g, b) => `rgba(${r}, ${g}, ${b}, ${alpha})`);
    }
    // If color is not valid, return it unchanged
    return color;
}

// Helper function to lighten the color for cities
function changeColorOpacity(color, opacity) {
    return color.replace('1)', `${opacity})`);
}

// Color mapping for countries
const regionColors = {
    "Spain": addAlphaToColor(getCssVar('--muted-rose'), 1),  
    "United Kingdom": addAlphaToColor(getCssVar('--light-sky-blue'), 1),  
    "Germany": addAlphaToColor(getCssVar('--faded-green'), 1), 
    "Austria": addAlphaToColor(getCssVar('--soft-peach'), 1),  
    "United States": addAlphaToColor(getCssVar('--deep-teal'), 1), 
};

// Function to create points data for countries and cities
function loadPlacesData() {
    return fetch('./assets/data/places.json')
      .then(response => response.json())
      .then(data => {
        const pointsData = [];

        data.forEach(region => {
            const regionColor = regionColors[region.name] || "rgba(0, 0, 0, 1)"; // Default to black if no color found

            // Add the region (country) itself
            pointsData.push({
                lat: region.latitude,
                lng: region.longitude,
                size: region.pinSize,
                color: regionColor,  // Use the region's color
                label: region.name,
                type: "region",
            });

            // Add the cities within the region, using a lighter version of the region's color
            region.cities.forEach(city => {
                pointsData.push({
                    lat: city.latitude,
                    lng: city.longitude,
                    size: city.pinSize,
                    color: changeColorOpacity(regionColor, 0.5),  // Lighter version for cities
                    label: city.name,
                    type: "city",
                });
            });
        });

    return pointsData;
    })
    .catch(error => {
      console.error('Error loading places data:', error);
      return [];  // Return an empty array in case of error
    });
}



loadPlacesData().then(pointsData => {
    const regionData = pointsData.filter(place => place.type === 'region');
    const cityData = pointsData.filter(place => place.type === 'city');

    const globeContainer = document.querySelector(".globe-container");

    const renderer = new THREE.WebGLRenderer();
    const globe = new ThreeGlobe()
    .globeImageUrl('./assets/images/earth-day.jpg')
    .bumpImageUrl('./assets/images/earth-blue-marble.jpg')
    .pointsData(pointsData) 
    .pointRadius('size')
    .pointColor('color')
    .pointAltitude(0.05)

    .labelsData(pointsData)  
    .labelText(d => d.label) 
    .labelSize(d => d.size) 
    .labelDotRadius(d => d.size / 5) 
    .labelColor("#000"); 
    
    
    
    // globe.scale.set(2.5, 2.5, 2.5);

    const scene = new THREE.Scene();
    scene.add(globe);
    scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 200;

    function resizeCanvas() {
    if (!globeContainer.offsetWidth || !globeContainer.offsetHeight) return;

    const containerWidth = globeContainer.offsetWidth;
    const containerHeight = globeContainer.offsetHeight;

    // increase pixel density for clarity
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(window.devicePixelRatio * 1.5);  
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    }

    // attach renderer AFTER size is set
    function initGlobe() {
    if (!globeContainer.contains(renderer.domElement)) {
        globeContainer.appendChild(renderer.domElement);
    }
    resizeCanvas();
    }

    // watch for changes to the `.travel` section becoming active
    const observer = new MutationObserver(() => {
    if (document.querySelector(".travel.active")) {
        initGlobe();
    }
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", resizeCanvas);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // min & max zoom distance to globe
    controls.minDistance = 130; 
    controls.maxDistance = 230;

    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true; 
    controls.autoRotate = false;

    function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    }

    animate();
});


