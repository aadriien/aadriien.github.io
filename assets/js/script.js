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




let isFirstLoad = true;
document.addEventListener("DOMContentLoaded", function() {
    // Only apply timeout on the first load
    if (isFirstLoad) {
        setTimeout(function() {
            attachToggleEvents();
            isFirstLoad = false; 
        }, 10);  // Slight delay to ensure everything is populated
    } else {
        attachToggleEvents();
    }
});

function attachToggleEvents() {
    const toggleCards = document.querySelectorAll(".toggle-card");

    toggleCards.forEach((card) => {
        card.addEventListener("click", function (event) {
            event.preventDefault();  // Prevent default behavior
            console.log("Card clicked:", card);

            let timelineContainer = card.querySelector(".timeline-container");

            if (timelineContainer) {
                // Toggle open class
                if (timelineContainer.classList.contains("open")) {
                    timelineContainer.classList.remove("open");
                } 
                else {
                    timelineContainer.classList.add("open");
                }
            } else {
                console.log("Timeline container not found for:", card);
            }
        });
    });
}


function populatePlacesPage() {
    return fetch('./assets/data/places.json')
        .then(response => response.json())
        .then(data => {
            const placesList = document.querySelector(".places-posts-list"); // Target the <ul> container

            data.forEach(country => {
                // Create list item
                const listItem = document.createElement("li");
                listItem.classList.add("places-post-item");

                // Create card container
                const cardContent = document.createElement("div");
                cardContent.classList.add("card-content", "toggle-card");

                // Create places content
                const placesContent = document.createElement("div");
                placesContent.classList.add("places-content");

                // Meta category (e.g., Continent or Category)
                const placesMeta = document.createElement("div");
                placesMeta.classList.add("places-meta");
                placesMeta.innerHTML = `<p class="places-category">Europe</p>`;

                // Country Title
                const title = document.createElement("h3");
                title.classList.add("h3", "places-item-title");
                title.textContent = country.name;

                // Append elements
                placesContent.appendChild(placesMeta);
                placesContent.appendChild(title);
                cardContent.appendChild(placesContent);

                // Timeline Container (Hidden by Default)
                const timelineContainer = document.createElement("div");
                timelineContainer.classList.add("timeline-container");
                timelineContainer.style.display = "none"; // Initially hidden

                const timelineSection = document.createElement("section");
                timelineSection.classList.add("timeline");

                // Timeline Header
                const titleWrapper = document.createElement("div");
                titleWrapper.classList.add("title-wrapper");

                const iconBox = document.createElement("div");
                iconBox.classList.add("icon-box");
                iconBox.innerHTML = `<ion-icon name="book-outline"></ion-icon>`;

                const timelineTitle = document.createElement("h3");
                timelineTitle.classList.add("h3");
                timelineTitle.textContent = country.name;

                titleWrapper.appendChild(iconBox);
                titleWrapper.appendChild(timelineTitle);

                // Timeline List
                const timelineList = document.createElement("ol");
                timelineList.classList.add("timeline-list");

                country.cities.forEach(city => {
                    const timelineItem = document.createElement("li");
                    timelineItem.classList.add("timeline-item");

                    const timelineItemTitle = document.createElement("h4");
                    timelineItemTitle.classList.add("h4", "timeline-item-title");
                    timelineItemTitle.textContent = city.name;

                    timelineItem.appendChild(timelineItemTitle);
                    timelineList.appendChild(timelineItem);
                });

                // Append everything to the timeline
                timelineSection.appendChild(titleWrapper);
                timelineSection.appendChild(timelineList);
                timelineContainer.appendChild(timelineSection);
                cardContent.appendChild(timelineContainer);
                listItem.appendChild(cardContent);
                placesList.appendChild(listItem);

                // Add click event to toggle timeline visibility
                cardContent.addEventListener("click", (event) => {
                    event.preventDefault(); // Prevent page scroll to top

                    // Toggle display of the timeline container
                    if (timelineContainer.style.display === "none") {
                        timelineContainer.style.display = "block"; // Show the timeline
                    } else {
                        timelineContainer.style.display = "none"; // Hide the timeline
                    }
                });
            });

            console.log(placesList)
        })
        .catch(error => console.error("Error loading places data:", error));
}

// Call function on page load
document.addEventListener("DOMContentLoaded", populatePlacesPage);


  





// places page spinning globe with pins

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
    "Puerto Rico": addAlphaToColor(getCssVar('--soft-purple'), 1), 
    "Mexico": addAlphaToColor(getCssVar('--bright-blue'), 1), 
};


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

        const colorInterpolator = t => {
            // Yellow (255, 255, 0) -> Neon Cyan (0, 255, 255) transition
            const r = Math.round(255 - t * 255);  // Transition from yellow to red
            const g = Math.round(255);             // Keep green constant (255)
            const b = Math.round(t * 255);        // Transition from no blue to full cyan
            return `rgba(${r}, ${g}, ${b}, ${0.9 + (1 - t) * 0.1})`;  // Hold opacity
        };

        const globe = new ThreeGlobe()
            .globeImageUrl('./assets/images/three-globe-imgs/earth-blue-marble.jpg')
            .bumpImageUrl('./assets/images/three-globe-imgs/earth-topology.png')
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

        // watch for changes to the `.places` section becoming active
        const observer = new MutationObserver(() => {
            if (document.querySelector(".places.active")) {
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







