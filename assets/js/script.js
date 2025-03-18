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



// Toggle color scheme (webpage background)
const themes = ["theme-1", "theme-2", "theme-3", "theme-4", "theme-5", "theme-6", "theme-7", "theme-8"];
let currentTheme = 0;

document.body.classList.add(themes[currentTheme]); // Default on initial load

document.getElementById("color-scheme-toggle").addEventListener("click", function() {
    // Remove curr theme and grab next in list
    document.body.classList.remove(themes[currentTheme]);
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.classList.add(themes[currentTheme]);
});


// About Me text paragraph
document.addEventListener("DOMContentLoaded", function () {
    const paragraph = document.querySelector(".about-text p");
        const sentences = [
            "Hi! ", 
            "",
            "I'm Adrien, a data-driven software engineer with a passion for building. ", 
            "I care about generating impact, delighting users, leaning into cool ideas, and learning along the way. ",
            "\n\nMy approach to engineering is human-centered, so I hope you have as much fun exploring this site as I had creating it. ", 
            "\n\nCheck out my projects, interact with the globe, and if you'd like to collaborate, be sure to reach out! ",
            "\n\n -A "
        ];
        // Clear text initially
        const text = paragraph.innerText;
        paragraph.innerText = ""; 

    // Wait 2 sec after DOM loaded before starting typing effect
    setTimeout(function() {
        let i = 0, sentenceIndex = 0;
        const fastSpeed = 70; // Typing speed
        const commaPause = 300;
        const sentencePause = 700; // Pause before next sentence
        let fullText = ""; 

        function typeEffect() {
            if (sentenceIndex < sentences.length) {
                if (i < sentences[sentenceIndex].length) {
                    let char = sentences[sentenceIndex][i];
                    fullText += char; 

                    paragraph.innerHTML = fullText + '<span class="cursor">▊</span>';
                    i++;

                    // Pause slightly after commas
                    let delay = (char === ",") ? commaPause : fastSpeed;
                    setTimeout(typeEffect, delay);
                } 
                else {
                    i = 0;
                    sentenceIndex++;
                    if (sentenceIndex < sentences.length) {
                        // Pause before next sentence
                        setTimeout(typeEffect, sentencePause); 
                    } 
                    else {
                        // Cursor blinks after full text
                        document.querySelector(".cursor").classList.add("blink"); 
                    }
                }
            }
        }
        // Initial delay before typing starts
        setTimeout(typeEffect, 500); 
    }, 1000);
});



// Create nebula animation for about me page
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".nebula-container");
    const canvas = container.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to match the container size
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const stars = [];

    // Star class for twinkling effect
    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.25 + 0.25;  // More varied sizes
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.6 + 0.4;  // Initial opacity for twinkling effect
            this.maxOpacity = Math.random() * 0.3 + 0.6; 
            this.color = Math.random() < 0.1 ? this.getRandomColor() : 'rgba(255, 255, 255, 1)'; // 10% chance for a colorful star
        }

        // Random color generation for rare color pops
        getRandomColor() {
            const randomChoice = Math.random();
            
            // 50% chance to pick from default colors
            if (randomChoice < 0.5) { 
                const colors = ['#ff6347', '#1e90ff', '#32cd32', '#ff1493', '#ff4500'];
                return colors[Math.floor(Math.random() * colors.length)];
            } 
            // 50% chance to pick random bright color
            else { 
                // Random hue between 30-60 degrees for bright colors
                const hue = Math.floor(Math.random() * 30) + 30; 
                const saturation = 100; 
                const lightness = Math.floor(Math.random() * 40) + 40; 
                return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            }
        }
        
        // Update star's position
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap stars around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;

            // Make star twinkle with random opacity change
            this.opacity += (Math.random() * 0.1 - 0.05);  
            if (this.opacity > this.maxOpacity) this.opacity = this.maxOpacity;
            if (this.opacity < 0.2) this.opacity = 0.2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            if (this.color === 'rgba(255, 255, 255, 1)') {
                ctx.fillStyle = this.color;
            } 
            else {
                // For colorful stars, use the RGB color
                ctx.fillStyle = this.color;
            }

            ctx.fill();
        }
    }

    for (let i = 0; i < 150; i++) { 
        stars.push(new Star());
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 

        // Update and draw stars
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(animateStars);  // Keep animation going
    }

    animateStars(); 
});





let isFirstLoad = true;
document.addEventListener("DOMContentLoaded", function() {
    // Only apply timeout on the first load
    if (isFirstLoad) {
        setTimeout(function() {
            attachToggleEvents();
            isFirstLoad = false; 
        }, 10);  // Slight delay to ensure everything is populated
    } 
    else {
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

            const sections = [
                { 
                    key: "cities", 
                    title: "print(cities_i_loved)", 
                    icon: "location-outline" 
                },
                { 
                    key: "favoriteFood", 
                    title: "let favorite_food =", 
                    icon: "pizza-outline" 
                },
                { 
                    key: "mustSee", 
                    title: "#include 'must_see.h'", 
                    icon: "star-outline" 
                },
                { 
                    key: "coolUnusual", 
                    title: "assert cool() && unusual();", 
                    icon: "eye-outline" 
                },
                { 
                    key: "funFact", 
                    title: "return fun_fact;", 
                    icon: "bulb-outline" 
                }
            ];

            data.forEach(region => {
                // Create list item
                const listItem = document.createElement("li");
                listItem.classList.add("places-post-item");

                // Create card container
                const cardContent = document.createElement("div");
                cardContent.classList.add("card-content");

                // Create figure element for image banner
                const figure = document.createElement("figure");
                figure.classList.add("places-banner-box");

                const img = document.createElement("img");
                img.src = region.image.src;  // Assuming JSON has `image.src`
                img.alt = region.image.alt;  // Assuming JSON has `image.alt`
                img.loading = "lazy";

                // Region Title
                const title = document.createElement("h3");
                title.classList.add("h3", "places-item-title");
                title.textContent = region.name;

                // Add the meta and title above the image
                figure.appendChild(title);
                figure.appendChild(img);

                // Append the figure to the card content
                cardContent.appendChild(figure);
                
                // Create places content
                const placesContent = document.createElement("div");
                placesContent.classList.add("places-content");

                // Timeline Container (Hidden by Default)
                const timelineContainer = document.createElement("div");
                timelineContainer.classList.add("timeline-container");
                timelineContainer.style.display = "none";

                const timelineSection = document.createElement("section");
                timelineSection.classList.add("timeline");

                // Now loop through sections to populate timeline dynamically
                sections.forEach(section => {
                    const sectionDiv = document.createElement("div");
                    sectionDiv.classList.add("timeline-section");

                    const titleWrapper = document.createElement("div");
                    titleWrapper.classList.add("title-wrapper");

                    const iconBox = document.createElement("div");
                    iconBox.classList.add("icon-box");
                    iconBox.innerHTML = `<ion-icon name="${section.icon}"></ion-icon>`;

                    const sectionTitle = document.createElement("h3");
                    sectionTitle.classList.add("h3");
                    sectionTitle.textContent = section.title;

                    titleWrapper.appendChild(iconBox);
                    titleWrapper.appendChild(sectionTitle);

                    const list = document.createElement("ol");
                    list.classList.add("timeline-list");

                    // Assuming `region[section.key]` contains an array of items
                    region[section.key].forEach(item => {
                        const listItem = document.createElement("li");
                        listItem.classList.add("timeline-item");

                        const listItemTitle = document.createElement("h4");
                        listItemTitle.classList.add("h4", "timeline-item-title");

                        // Handle objects (cities) & regular strings (other fields)
                        listItemTitle.textContent = typeof item === "object" ? item.name : item;

                        listItem.appendChild(listItemTitle);
                        list.appendChild(listItem);
                    });

                    sectionDiv.appendChild(titleWrapper);
                    sectionDiv.appendChild(list);
                    timelineSection.appendChild(sectionDiv);
                });

                // Append timeline section to container
                timelineContainer.appendChild(timelineSection);
                cardContent.appendChild(timelineContainer);
                listItem.appendChild(cardContent);
                placesList.appendChild(listItem);

                // Add click event to toggle timeline visibility
                cardContent.addEventListener("click", (event) => {
                    // Prevent page scroll to top
                    event.preventDefault(); 

                    if (timelineContainer.style.display === "none") {
                        timelineContainer.style.display = "block"; // Show 
                    } else {
                        timelineContainer.style.display = "none"; // Hide
                    }
                    cardContent.classList.toggle("clicked");
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

            // Add the region (e.g. country) itself
            pointsData.push({
                id: region.name.toLowerCase().replace(/\s+/g, '-'), // Generate unique ID from region name
                ringMaxSize: 5,
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

        // Start with view of... 
        camera.position.set(-200, 50, 50); // the Americas
        // camera.position.set(20, 110, 150); // Europe
        // camera.position.set(-120, 100, 100); // the Americas & Europe


        // Raycaster & mouse vector
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // Check mouse proximity to any region (used for click & hover)
        function getClosestRegion(clickedLatLng, pointsData, threshold = 4) {
            let closestRegion = null;
            let closestDistance = Infinity; 

            pointsData.forEach(region => {
                const latDiff = Math.abs(clickedLatLng.lat - region.lat);
                const lngDiff = Math.abs(clickedLatLng.lng - region.lng);

                // If within threshold, it's a match
                if (latDiff < threshold && lngDiff < threshold) {
                    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestRegion = region;
                    }
                }
            });

            return closestRegion;
        }

        // Handle mouse movement around globe ripples
        function onMouseMovement(event) {
            // Get container position & normalize click coordinates
            const rect = globeContainer.getBoundingClientRect(); 
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;  
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;  

            // Update raycaster based on camera settings & find intersections
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);  

            if (intersects.length > 0) {
                const mouseLatLng = getLatLngFromIntersection(intersects[0]);
                return getClosestRegion(mouseLatLng, pointsData);
            }
        }

        // Make sure click not activated on globe rotate
        let isRotating = false;
        let lastMousePosition = { x: 0, y: 0 };
        let mouseMovementThreshold = 50; 

        window.addEventListener("mousemove", (event) => {
            const deltaX = Math.abs(event.clientX - lastMousePosition.x);
            const deltaY = Math.abs(event.clientY - lastMousePosition.y);

            // If mouse has moved beyond threshold, consider it a rotation
            if (deltaX > mouseMovementThreshold || deltaY > mouseMovementThreshold) {
                isRotating = true;
            }

            lastMousePosition = { x: event.clientX, y: event.clientY };
        });

        // Handle mouse CLICK on globe specifically
        let clickCooldown = false;
        function onMouseClick(event) {
            // Prevent duplicate / excessive clicks 
            if (clickCooldown) return;   
            clickCooldown = true;
            setTimeout(() => clickCooldown = false, 50);

            if (isRotating) {
                // Ignore click if rotating globe
                console.log("Ignored click during globe rotation");
                isRotating = false;
                return;
            }

            const closestRegion = onMouseMovement(event);

            if (closestRegion) {
                console.log(`Closest region: ${closestRegion.label} (ID: ${closestRegion.id})`);
 
                // Find card by region to toggle open 
                const cards = document.querySelectorAll(".card-content");
                let matchingCard = null;

                cards.forEach((card) => {
                    const titleElement = card.querySelector(".places-item-title");
                    if (titleElement && titleElement.textContent.trim() === closestRegion.label) {
                        matchingCard = card;
                    }
                });

                if (matchingCard) {  
                    console.log(`Opening card for ${closestRegion.label}`);                  
                    const timelineContainer = matchingCard.querySelector(".timeline-container");

                    // Check if already open before applying state
                    if (!matchingCard.classList.contains("clicked")) {
                        matchingCard.classList.add("clicked"); 
                        if (timelineContainer) timelineContainer.style.display = "block"; 
                    } 

                    // Scroll to open card (based on region clicked)
                    matchingCard.scrollIntoView({ behavior: "smooth", block: "start" });
                } 
                else {
                    console.log(`No card found for ${closestRegion.label}`);
                }
            }
        }

        // Handle mouse HOVER on globe specifically
        function onMouseHover(event) {
            const closestRegion = onMouseMovement(event)

            // Change cursor to hand if near clickable region (ripple)
            if (closestRegion) {
                document.body.style.cursor = 'pointer'; 
            } 
            else {
                document.body.style.cursor = 'default';
            }
        }

        // Event listeners for click & hover within globe
        globeContainer.addEventListener("click", onMouseClick);
        globeContainer.addEventListener("mousemove", onMouseHover);


        // Function to convert intersection point to lat/long on globe
        function getLatLngFromIntersection(intersection) {
            const point = intersection.point;  

            if (!point || !point.x || !point.y || !point.z) {
                console.error('Invalid point:', point);
                return { lat: NaN, lng: NaN };
            }

            // Globe's radius (adjusted by scale) & camera distance from origin
            const globeRadius = globe.scale.x;  
            // const cameraDistance = camera.position.length(); 

            // Normalize point relative to globe (scale, zoom, etc)
            const normalizedPoint = point.clone().normalize(); 

            // Convert to latitude & longitude
            const lat = Math.asin(normalizedPoint.y / globeRadius) * (180 / Math.PI);
            const lng = Math.atan2(normalizedPoint.x, normalizedPoint.z) * (180 / Math.PI);

            return { lat, lng };
        }

        // Add click event listener to renderer's DOM element
        renderer.domElement.addEventListener('click', onMouseClick, false);


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







