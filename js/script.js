
const cars = [

    {
        id: "1",
        brand: "BMW",
        name: "BMW 5 Series",
        type: "LUXURY SEDAN",
        filterType: "sedan",
        image: "images/car1.jpg",
        price: "৳1,25,00,000",
        priceNumber: 12500000,
        year: "2025",
        mileage: "8,500 km",
        transmission: "Automatic",
        fuel: "Petrol",
        engine: "2.0L Turbo",
        seats: "5",
        description:
            "The BMW 5 Series combines elegant design, powerful performance and advanced technology for a refined luxury driving experience."
    },

    {
        id: "2",
        brand: "Rolls-Royce",
        name: "Rolls-Royce Phantom",
        type: "ULTRA LUXURY",
        filterType: "luxury",
        image: "images/car2.jpg",
        price: "৳8,50,00,000",
        priceNumber: 85000000,
        year: "2025",
        mileage: "4,200 km",
        transmission: "Automatic",
        fuel: "Petrol",
        engine: "6.75L V12",
        seats: "5",
        description:
            "The Rolls-Royce Phantom represents the highest level of automotive luxury, combining handcrafted elegance with effortless performance."
    },

    {
        id: "3",
        brand: "Toyota",
        name: "Toyota Land Cruiser",
        type: "LUXURY SUV",
        filterType: "suv",
        image: "images/car3.jpg",
        price: "৳1,85,00,000",
        priceNumber: 18500000,
        year: "2025",
        mileage: "11,000 km",
        transmission: "Automatic",
        fuel: "Diesel",
        engine: "3.3L V6",
        seats: "7",
        description:
            "The Toyota Land Cruiser delivers outstanding durability, comfort and off-road capability while maintaining a premium driving experience."
    },

    {
        id: "4",
        brand: "Toyota",
        name: "Toyota Supra",
        type: "SPORTS",
        filterType: "sports",
        image: "images/car4.jpg",
        price: "৳1,10,00,000",
        priceNumber: 11000000,
        year: "2025",
        mileage: "6,800 km",
        transmission: "Automatic",
        fuel: "Petrol",
        engine: "3.0L Turbo",
        seats: "2",
        description:
            "The Toyota Supra delivers thrilling sports-car performance, sharp handling and iconic styling for an exciting driving experience."
    }

];


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeMobileMenu();

    initializeCarsPage();

    initializeCarDetails();

    initializeFavorites();

    initializeScrollReveal();

    initializeContactForm();

    initializeCurrentYear();

    initializeHomepageSearch();

});


/* =========================================================
   MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (!menuBtn || !navLinks) {
        return;
    }

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("mobile-open");

        const icon = menuBtn.querySelector("i");

        if (!icon) {
            return;
        }

        if (navLinks.classList.contains("mobile-open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("mobile-open");

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });

}


/* =========================================================
   CARS PAGE
========================================================= */

function initializeCarsPage() {

    const carGrid = document.getElementById("carGrid");

    /*
       Only run this function on cars.html.
    */

    if (!carGrid) {
        return;
    }


    const searchInput = document.getElementById("carSearch");
    const brandFilter = document.getElementById("brandFilter");
    const typeFilter = document.getElementById("typeFilter");
    const carSort = document.getElementById("carSort");


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("input", function () {
            filterCars();
        });

    }


    /* =====================================================
       BRAND
    ===================================================== */

    if (brandFilter) {

        brandFilter.addEventListener("change", function () {
            filterCars();
        });

    }


    /* =====================================================
       TYPE
    ===================================================== */

    if (typeFilter) {

        typeFilter.addEventListener("change", function () {
            filterCars();
        });

    }


    /* =====================================================
       SORT
    ===================================================== */

    if (carSort) {

        carSort.addEventListener("change", function () {

            sortCars();

            filterCars();

        });

    }


    /* =====================================================
       READ URL PARAMETERS
       
       Example:
       cars.html?type=sports
       cars.html?type=luxury
       cars.html?type=suv
       cars.html?type=sedan
    ===================================================== */

    const params = new URLSearchParams(
        window.location.search
    );


    const urlBrand = (
        params.get("brand") || ""
    ).toLowerCase().trim();


    const urlType = (
        params.get("type") || ""
    ).toLowerCase().trim();


    const urlSearch = (
        params.get("search") || ""
    ).trim();


    /* =====================================================
       APPLY BRAND FROM URL
    ===================================================== */

    if (brandFilter && urlBrand) {

        brandFilter.value = urlBrand;

    }


    /* =====================================================
       APPLY TYPE FROM URL
    ===================================================== */

    if (typeFilter && urlType) {

        typeFilter.value = urlType;

    }


    /* =====================================================
       APPLY SEARCH FROM URL
    ===================================================== */

    if (searchInput && urlSearch) {

        searchInput.value = urlSearch;

    }


    /* =====================================================
       FILTER IMMEDIATELY
    ===================================================== */

    filterCars();

}


/* =========================================================
   SORT CARS
========================================================= */

function sortCars() {

    const carGrid = document.getElementById("carGrid");
    const carSort = document.getElementById("carSort");

    if (!carGrid || !carSort) {
        return;
    }


    const cards = Array.from(
        carGrid.querySelectorAll(".car-card")
    );


    const sortValue = carSort.value;


    if (sortValue === "low") {

        cards.sort(function (a, b) {

            return (
                Number(a.dataset.price || 0) -
                Number(b.dataset.price || 0)
            );

        });

    }

    else if (sortValue === "high") {

        cards.sort(function (a, b) {

            return (
                Number(b.dataset.price || 0) -
                Number(a.dataset.price || 0)
            );

        });

    }

    else {

        cards.sort(function (a, b) {

            return (
                Number(a.dataset.id || 0) -
                Number(b.dataset.id || 0)
            );

        });

    }


    cards.forEach(function (card) {

        carGrid.appendChild(card);

    });

}


/* =========================================================
   FILTER CARS
========================================================= */

function filterCars() {

    const carGrid = document.getElementById("carGrid");

    if (!carGrid) {
        return;
    }


    const cards = carGrid.querySelectorAll(".car-card");


    const searchInput =
        document.getElementById("carSearch");

    const brandFilter =
        document.getElementById("brandFilter");

    const typeFilter =
        document.getElementById("typeFilter");

    const noCars =
        document.getElementById("noCars");


    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";


    const brand = brandFilter
        ? brandFilter.value.toLowerCase().trim()
        : "all";


    const type = typeFilter
        ? typeFilter.value.toLowerCase().trim()
        : "all";


    let found = 0;


    cards.forEach(function (card) {

        const cardBrand = (
            card.dataset.brand || ""
        ).toLowerCase().trim();


        const cardType = (
            card.dataset.type || ""
        ).toLowerCase().trim();


        const cardName = (
            card.dataset.name || ""
        ).toLowerCase().trim();


        const cardText = (
            card.textContent || ""
        ).toLowerCase();


        /* =================================================
           SEARCH MATCH
        ================================================= */

        const matchesSearch =
            search === "" ||
            cardName.includes(search) ||
            cardBrand.includes(search) ||
            cardType.includes(search) ||
            cardText.includes(search);


        /* =================================================
           BRAND MATCH
        ================================================= */

        const matchesBrand =
            brand === "all" ||
            brand === "" ||
            cardBrand === brand;


        /* =================================================
           TYPE MATCH
        ================================================= */

        const matchesType =
            type === "all" ||
            type === "" ||
            cardType === type;


        /* =================================================
           FINAL RESULT
        ================================================= */

        if (
            matchesSearch &&
            matchesBrand &&
            matchesType
        ) {

            card.style.display = "";

            found++;

        } else {

            card.style.display = "none";

        }

    });


    /* =====================================================
       NO RESULTS
    ===================================================== */

    if (noCars) {

        noCars.style.display =
            found === 0 ? "block" : "none";

    }

}


/* =========================================================
   HOMEPAGE SEARCH
========================================================= */

function searchCars() {

    const homeBrand =
        document.getElementById("homeBrand");

    const homeType =
        document.getElementById("homeType");

    const homeSearch =
        document.getElementById("homeSearch");


    const params =
        new URLSearchParams();


    const brand =
        homeBrand
            ? homeBrand.value.toLowerCase().trim()
            : "all";


    const type =
        homeType
            ? homeType.value.toLowerCase().trim()
            : "all";


    const search =
        homeSearch
            ? homeSearch.value.trim()
            : "";


    /* =====================================================
       BRAND
    ===================================================== */

    if (
        brand &&
        brand !== "all"
    ) {

        params.set(
            "brand",
            brand
        );

    }


    /* =====================================================
       TYPE
    ===================================================== */

    if (
        type &&
        type !== "all"
    ) {

        params.set(
            "type",
            type
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (search) {

        params.set(
            "search",
            search
        );

    }


    /* =====================================================
       GO TO CARS PAGE
    ===================================================== */

    const query =
        params.toString();


    if (query) {

        window.location.href =
            "cars.html?" + query;

    } else {

        window.location.href =
            "cars.html";

    }

}


/* =========================================================
   HOMEPAGE SEARCH BUTTON
========================================================= */

function initializeHomepageSearch() {

    const homeSearch =
        document.getElementById("homeSearch");


    const searchButton =
        document.getElementById("homeSearchButton");


    /*
       Search button
    */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                searchCars();

            }
        );

    }


    /*
       Press ENTER in search box
    */

    if (homeSearch) {

        homeSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchCars();

                }

            }
        );

    }

}


/* =========================================================
   CAR DETAILS PAGE
========================================================= */

function initializeCarDetails() {

    const detailImage =
        document.getElementById("detailImage");


    if (!detailImage) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const carId =
        params.get("id");


    const selectedCar =
        cars.find(function (car) {

            return car.id === carId;

        });


    if (!selectedCar) {

        showCarNotFound();

        return;

    }


    /* =====================================================
       IMAGE
    ===================================================== */

    detailImage.src =
        selectedCar.image;

    detailImage.alt =
        selectedCar.name;


    /* =====================================================
       TYPE
    ===================================================== */

    const detailType =
        document.getElementById("detailType");

    if (detailType) {

        detailType.textContent =
            selectedCar.type;

    }


    /* =====================================================
       NAME
    ===================================================== */

    const detailName =
        document.getElementById("detailName");

    if (detailName) {

        detailName.textContent =
            selectedCar.name;

    }


    /* =====================================================
       PRICE
    ===================================================== */

    const detailPrice =
        document.getElementById("detailPrice");

    if (detailPrice) {

        detailPrice.textContent =
            selectedCar.price;

    }


    /* =====================================================
       DESCRIPTION
    ===================================================== */

    const detailDescription =
        document.getElementById(
            "detailDescription"
        );

    if (detailDescription) {

        detailDescription.textContent =
            selectedCar.description;

    }


    /* =====================================================
       YEAR
    ===================================================== */

    const detailYear =
        document.getElementById("detailYear");

    if (detailYear) {

        detailYear.textContent =
            selectedCar.year;

    }


    /* =====================================================
       MILEAGE
    ===================================================== */

    const detailMileage =
        document.getElementById("detailMileage");

    if (detailMileage) {

        detailMileage.textContent =
            selectedCar.mileage;

    }


    /* =====================================================
       TRANSMISSION
    ===================================================== */

    const detailTransmission =
        document.getElementById(
            "detailTransmission"
        );

    if (detailTransmission) {

        detailTransmission.textContent =
            selectedCar.transmission;

    }


    /* =====================================================
       FUEL
    ===================================================== */

    const detailFuel =
        document.getElementById("detailFuel");

    if (detailFuel) {

        detailFuel.textContent =
            selectedCar.fuel;

    }


    /* =====================================================
       ENGINE
    ===================================================== */

    const detailEngine =
        document.getElementById("detailEngine");

    if (detailEngine) {

        detailEngine.textContent =
            selectedCar.engine;

    }


    /* =====================================================
       SEATS
    ===================================================== */

    const detailSeats =
        document.getElementById("detailSeats");

    if (detailSeats) {

        detailSeats.textContent =
            selectedCar.seats;

    }


    /* =====================================================
       PAGE TITLE
    ===================================================== */

    document.title =
        selectedCar.name +
        " | Prime Wheels";

}


/* =========================================================
   CAR NOT FOUND
========================================================= */

function showCarNotFound() {

    const detailImage =
        document.getElementById("detailImage");

    const detailType =
        document.getElementById("detailType");

    const detailName =
        document.getElementById("detailName");

    const detailPrice =
        document.getElementById("detailPrice");

    const detailDescription =
        document.getElementById(
            "detailDescription"
        );


    if (detailType) {

        detailType.textContent =
            "ERROR";

    }


    if (detailName) {

        detailName.textContent =
            "Car Not Found";

    }


    if (detailPrice) {

        detailPrice.textContent =
            "";

    }


    if (detailDescription) {

        detailDescription.textContent =
            "The selected vehicle could not be found.";

    }


    if (detailImage) {

        detailImage.removeAttribute("src");

        detailImage.alt =
            "Car not found";

    }


    document.title =
        "Car Not Found | Prime Wheels";

}


/* =========================================================
   FAVORITES
========================================================= */

function initializeFavorites() {

    const buttons =
        document.querySelectorAll(
            ".favorite-btn"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                button.classList.toggle(
                    "liked"
                );


                const icon =
                    button.querySelector("i");


                if (!icon) {
                    return;
                }


                if (
                    button.classList.contains("liked")
                ) {

                    icon.classList.remove(
                        "fa-regular"
                    );

                    icon.classList.add(
                        "fa-solid"
                    );

                } else {

                    icon.classList.remove(
                        "fa-solid"
                    );

                    icon.classList.add(
                        "fa-regular"
                    );

                }

            }
        );

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".car-card, " +
            ".feature, " +
            ".feature-list-item, " +
            ".offer-card, " +
            ".about-content, " +
            ".about-image, " +
            ".about-home-content, " +
            ".about-stats, " +
            ".value-card, " +
            ".stat, " +
            ".contact-info, " +
            ".contact-form-box, " +
            ".contact-item, " +
            ".details-content, " +
            ".details-image, " +
            ".vehicle-type-card"
        );


    if (!revealElements.length) {
        return;
    }


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show-element"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal-element"
                );

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "show-element"
                );

            }
        );

    }

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initializeContactForm() {

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (!contactForm) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const button =
                contactForm.querySelector(
                    "button[type='submit']"
                );


            if (button) {

                button.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                button.disabled = true;

            }


            setTimeout(
                function () {

                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you! Your message has been received. We will contact you shortly.";

                    }


                    contactForm.reset();


                    if (button) {

                        button.innerHTML =
                            'Send Message <i class="fa-solid fa-paper-plane"></i>';

                        button.disabled = false;

                    }

                },
                1000
            );

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeCurrentYear() {

    document
        .querySelectorAll(".current-year")
        .forEach(function (element) {

            element.textContent =
                new Date().getFullYear();

        });

}







