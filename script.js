// ===============================
// MAHA MALIK ARTWORK STUDIO
// script.js
// ===============================


// ===============================
// WAIT FOR PAGE TO LOAD
// ===============================

document.addEventListener("DOMContentLoaded", function () {


    // ===============================
    // NAVBAR SHADOW ON SCROLL
    // ===============================

    const header = document.querySelector("header");

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {

                header.style.background = "rgba(0,0,0,0.85)";
                header.style.transition = "0.4s";

            } else {

                header.style.background = "rgba(0,0,0,0.45)";

            }

        });

    }


    // ===============================
    // HERO BUTTON ANIMATION
    // ===============================

    const button = document.querySelector(".btn");

    if (button) {

        button.addEventListener("mouseenter", function () {

            button.style.transform = "scale(1.05)";
            button.style.transition = "0.3s";

        });

        button.addEventListener("mouseleave", function () {

            button.style.transform = "scale(1)";

        });

    }


    // ===============================
    // FADE-IN HERO TEXT
    // ===============================

    const heroContent =
        document.querySelector(".hero-content");

    if (heroContent) {

        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(40px)";

        setTimeout(() => {

            heroContent.style.transition = "1.2s ease";
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0)";

        }, 300);

    }


    // ===============================
    // LOAD PAINTINGS FROM ORACLE APEX
    // ===============================

    const galleryContainer =
        document.getElementById("gallery-container");


    // Only run on gallery.html

    if (galleryContainer) {


        // ===============================
        // CORRECT PAINTINGS API
        // ===============================

        const API_URL =
            "https://oracleapex.com/ords/databasesetup/artwork_api/paintings/";


        console.log(
            "Loading paintings from:",
            API_URL
        );


        // ===============================
        // FETCH PAINTINGS
        // ===============================

        fetch(API_URL)

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "API Error: " +
                        response.status
                    );

                }

                return response.json();

            })


            // ===============================
            // PROCESS RESPONSE
            // ===============================

            .then(data => {

                console.log(
                    "Paintings received from Oracle:",
                    data
                );


                // ===============================
                // CLEAR LOADING MESSAGE
                // ===============================

                galleryContainer.innerHTML = "";


                // ===============================
                // CHECK PAINTINGS
                // ===============================

                if (
                    !data.items ||
                    data.items.length === 0
                ) {

                    galleryContainer.innerHTML = `

                        <p>
                            No paintings available.
                        </p>

                    `;

                    return;

                }


                // ===============================
                // CREATE PAINTING CARDS
                // ===============================

                data.items.forEach(painting => {


                    // ===============================
                    // CREATE CARD
                    // ===============================

                    const card =
                        document.createElement("a");


                    card.className =
                        "gallery-card";


                    // ===============================
                    // PAINTING ID
                    // ===============================

                    const paintingId =
                        painting.painting_id;


                    // ===============================
                    // PAINTING TITLE
                    // ===============================

                    const title =
                        painting.title ||
                        "Untitled Painting";


                    // ===============================
                    // IMAGE
                    // ===============================

                    const image =
                        painting.image ||
                        "logo.png";


                    // ===============================
                    // MEDIUM
                    // ===============================

                    const medium =
                        painting.medium ||
                        "Original Artwork";


                    // ===============================
                    // PRICE
                    // ===============================

                    const price =
                        painting.price || 0;


                    // ===============================
                    // OPEN PAINTING DETAILS
                    // ===============================

                    card.href =
                        "painting.html?id=" +
                        encodeURIComponent(
                            paintingId
                        );


                    // ===============================
                    // CARD HTML
                    // ===============================

                    card.innerHTML = `

                        <img
                            src="${image}"
                            alt="${title}"
                        >

                        <div class="gallery-info">

                            <h3>
                                ${title}
                            </h3>

                            <p>
                                ${medium}
                            </p>

                            <p class="gallery-price">
                                PKR ${price}
                            </p>

                            <span class="gallery-btn">
                                View Artwork →
                            </span>

                        </div>

                    `;


                    // ===============================
                    // IMAGE ERROR HANDLING
                    // ===============================

                    const cardImage =
                        card.querySelector("img");


                    cardImage.onerror = function () {

                        console.error(
                            "Image could not be loaded:",
                            image
                        );

                        this.src = "logo.png";

                    };


                    // ===============================
                    // ADD CARD TO GALLERY
                    // ===============================

                    galleryContainer.appendChild(card);

                });

            })


            // ===============================
            // ERROR HANDLING
            // ===============================

            .catch(error => {

                console.error(
                    "Oracle API Error:",
                    error
                );


                galleryContainer.innerHTML = `

                    <div class="gallery-error">

                        <p>
                            Unable to load artwork.
                            Please try again later.
                        </p>

                    </div>

                `;

            });

    }

});