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
    "Puerto Rico": addAlphaToColor(getCssVar('--deep-teal'), 1), 
    "Mexico": addAlphaToColor(getCssVar('--deep-teal'), 1), 
};

// const regionColors = {
//     "Spain": "rgb(176, 106, 129)",        // Spain (muted rose)
//     "United Kingdom": "rgb(103, 173, 185)", // UK (light sky blue)
//     "Germany": "rgb(114, 141, 134)",      // Germany (faded green)
//     "Austria": "rgb(255, 175, 133)",      // Austria (soft peach)
//     "United States": "rgb(30, 68, 75)",    // USA (deep teal)
// };

// Function to create points data for countries and cities
function loadPlacesData() {
    return fetch('./assets/data/places.json')
      .then(response => response.json())
      .then(data => {
        const pointsData = [];

        data.forEach(region => {
            const regionColor = regionColors[region.name] || "rgba(0, 0, 0, 1)"; // Default to black if no color found
            const baseDelay = Math.random() * 2000;  // Randomized delay for each region

            // Add the region (country) itself
            pointsData.push({
                lat: region.latitude,
                lng: region.longitude,
                size: region.pinSize,
                color: regionColor,  // Use the region's color
                label: region.name,
                type: "region",
                ringMaxSize: 5,
                ringPropagationSpeed: 0.7,
                ringRepeatPeriod: 2000 + baseDelay,
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
                    ringMaxSize: 0,
                    ringPropagationSpeed: 1,
                    ringRepeatPeriod: 3500 + baseDelay,
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


function createGlobe() {
    loadPlacesData().then(pointsData => {
        const regionData = pointsData.filter(place => place.type === 'region');
        const cityData = pointsData.filter(place => place.type === 'city');

        const globeContainer = document.querySelector(".globe-container");
        const renderer = new THREE.WebGLRenderer();

        // const colorInterpolator = t => `rgba(255, 255, 0, ${0.5 + (1 - t) / 3})`;

        // const colorInterpolator = t => {
        //     const r = Math.round(255 - t * 255);  // Cyan to magenta effect
        //     const g = Math.round(255 - t * 100);   // Gradual color change
        //     return `rgba(${r}, ${g}, 255, ${0.9 + (1 - t) * 0.3})`;
        // };

        const colorInterpolator = t => {
            // Yellow (255, 255, 0) -> Neon Cyan (0, 255, 255) transition
            const r = Math.round(255 - t * 255);  // Transition from yellow to red
            const g = Math.round(255);             // Keep green constant (255)
            const b = Math.round(t * 255);        // Transition from no blue to full cyan
            return `rgba(${r}, ${g}, ${b}, ${0.9 + (1 - t) * 0.1})`;  // Hold opacity
        };

        // const colorInterpolator = t => {
        //     // Yellow (255, 255, 0) -> Red (255, 0, 0) transition
        //     const r = 255;  // Keep red at full intensity
        //     const g = Math.round(255 - t * 255);  // Green fades from yellow to 0
        //     const b = 0;  // Keep blue at 0 for pure red
        //     return `rgba(${r}, ${g}, ${b}, ${0.9 + (1 - t) * 0.1})`;  // Hold opacity
        // };
        

        const globe = new ThreeGlobe()
            .globeImageUrl('./assets/images/three-globe-imgs/earth-blue-marble.jpg')
            .bumpImageUrl('./assets/images/three-globe-imgs/earth-topology.png')
            // .pointsData(pointsData) 
            // .pointRadius('size')
            // .pointColor('#000')
            // .pointAltitude(0.0)

            // .labelsData(pointsData)  
            // .labelText(d => d.label) 
            // .labelSize(d => d.size) 
            // .labelDotRadius(d => d.size / 5) 
            // .labelColor('#000'); 

            .ringsData(pointsData)
            .ringColor(() => colorInterpolator)
            .ringMaxRadius('ringMaxSize')
            .ringPropagationSpeed('ringPropagationSpeed')
            .ringRepeatPeriod('ringRepeatPeriod');

        
        
        // Material for the globe with roughness
        const globeMaterial = new THREE.MeshStandardMaterial({
            color: 0x0055ff, 
            roughness: 0.7,  
            metalness: 0.3,  
            emissive: 0xFFD700, 
            emissiveIntensity: 1, 
        });
        globe.material = globeMaterial;

        
        globe.scale.set(1, 1, 1);

        const scene = new THREE.Scene();
        scene.add(globe);
        scene.add(new THREE.AmbientLight(0xcccccc, 0.5 * Math.PI));
        scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI).position.set(0, 1, 1));
        

        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

        // Start with view of the Americas
        camera.position.set(-200, 50, 50);

        // Start with view of Europe
        // camera.position.set(20, 110, 150);

        // Start with view between the Americas & Europe
        // camera.position.set(-120, 100, 100);


        function resizeCanvas() {
            if (!globeContainer.offsetWidth || !globeContainer.offsetHeight) return;

            const containerWidth = globeContainer.offsetWidth;
            const containerHeight = globeContainer.offsetHeight;

            // increase pixel density for clarity
            renderer.setSize(containerWidth, containerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);  
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
        controls.maxDistance = 220;

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
}

createGlobe();







