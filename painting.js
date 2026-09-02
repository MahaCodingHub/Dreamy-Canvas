// ==========================================
// MAHA MALIK ARTWORK
// PAINTING DETAILS PAGE
// ==========================================


// ==========================================
// ORACLE APEX / ORDS API
// ==========================================

const API_URL =
    "https://oracleapex.com/ords/databasesetup/artwork_api/paintings/";


// ==========================================
// GET PAINTING ID FROM URL
// ==========================================

const params =
    new URLSearchParams(window.location.search);

const id =
    params.get("id");


// ==========================================
// LOAD PAINTING FROM ORACLE
// ==========================================

async function loadPainting() {

    try {

        console.log(
            "Loading painting from Oracle API..."
        );


        // ==========================================
        // FETCH PAINTINGS
        // ==========================================

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "API request failed. Status: " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "Oracle API response:",
            data
        );


        const paintings =
            data.items || [];


        if (paintings.length === 0) {

            throw new Error(
                "No paintings were returned from the database."
            );

        }


        // ==========================================
        // FIND REQUESTED PAINTING
        // ==========================================

        let painting;


        if (id) {

            painting =
                paintings.find(p =>

                    String(
                        p.painting_id ??
                        p.PAINTING_ID ??
                        p.id
                    ) === String(id)

                );

        } else {

            painting =
                paintings[0];

        }


        // ==========================================
        // CHECK PAINTING
        // ==========================================

        if (!painting) {

            console.error(
                "Painting not found. Requested ID:",
                id
            );

            alert(
                "Painting not found."
            );

            return;

        }


        console.log(
            "Selected painting:",
            painting
        );


        // ==========================================
        // GET DATABASE VALUES
        // ==========================================

        const paintingId =
            painting.painting_id ??
            painting.PAINTING_ID ??
            painting.id;


        const title =
            painting.title ??
            painting.TITLE ??
            "Untitled Painting";


        const price =
            painting.price ??
            painting.PRICE ??
            0;


        const image =
            painting.image ??
            painting.IMAGE ??
            painting.image_url ??
            painting.IMAGE_URL ??
            "";


        const category =
            painting.category ??
            painting.CATEGORY ??
            "";


        const medium =
            painting.medium ??
            painting.MEDIUM ??
            "";


        const size =
            painting.painting_size ??
            painting.PAINTING_SIZE ??
            painting.size ??
            painting.SIZE ??
            "";


        const status =
            painting.status ??
            painting.STATUS ??
            "";


        const description =
            painting.description ??
            painting.DESCRIPTION ??
            "";


        const story =
            painting.story ??
            painting.STORY ??
            "";


        // ==========================================
        // UPDATE IMAGE
        // ==========================================

        const paintingImage =
            document.getElementById(
                "paintingImage"
            );


        if (paintingImage) {

            paintingImage.src =
                image;

            paintingImage.alt =
                title;


            paintingImage.onerror =
                function () {

                    console.error(
                        "Could not load painting image:",
                        image
                    );

                };

        }


        // ==========================================
        // UPDATE TITLE
        // ==========================================

        const paintingTitle =
            document.getElementById(
                "paintingTitle"
            );


        if (paintingTitle) {

            paintingTitle.textContent =
                title;

        }


        // ==========================================
        // UPDATE CATEGORY
        // ==========================================

        const paintingCategory =
            document.getElementById(
                "paintingCategory"
            );


        if (paintingCategory) {

            paintingCategory.textContent =
                category;

        }


        // ==========================================
        // UPDATE DESCRIPTION
        // ==========================================

        const paintingDescription =
            document.getElementById(
                "paintingDescription"
            );


        if (paintingDescription) {

            paintingDescription.textContent =
                description;

        }


        // ==========================================
        // UPDATE STORY
        // ==========================================

        const paintingStory =
            document.getElementById(
                "paintingStory"
            );


        if (paintingStory) {

            paintingStory.textContent =
                story;

        }


        // ==========================================
        // UPDATE MEDIUM
        // ==========================================

        const paintingMedium =
            document.getElementById(
                "paintingMedium"
            );


        if (paintingMedium) {

            paintingMedium.textContent =
                medium;

        }


        // ==========================================
        // UPDATE SIZE
        // ==========================================

        const paintingSize =
            document.getElementById(
                "paintingSize"
            );


        if (paintingSize) {

            paintingSize.textContent =
                size;

        }


        // ==========================================
        // UPDATE STATUS
        // ==========================================

        const paintingStatus =
            document.getElementById(
                "paintingStatus"
            );


        if (paintingStatus) {

            paintingStatus.textContent =
                status;

        }


        // ==========================================
        // UPDATE SPECIFICATIONS
        // ==========================================

        const specMedium =
            document.getElementById(
                "specMedium"
            );


        if (specMedium) {

            specMedium.textContent =
                medium;

        }


        const specSize =
            document.getElementById(
                "specSize"
            );


        if (specSize) {

            specSize.textContent =
                size;

        }


        const specCategory =
            document.getElementById(
                "specCategory"
            );


        if (specCategory) {

            specCategory.textContent =
                category;

        }


        const specStatus =
            document.getElementById(
                "specStatus"
            );


        if (specStatus) {

            specStatus.textContent =
                status;

        }


        // ==========================================
        // CREATE PURCHASE URL
        // ==========================================

        const purchaseURL =
            "purchase.html?id=" +
            encodeURIComponent(paintingId) +
            "&painting=" +
            encodeURIComponent(title) +
            "&price=" +
            encodeURIComponent(price);


        // ==========================================
        // PURCHASE BUTTON 1
        // ==========================================

        const purchaseBtn =
            document.getElementById(
                "purchaseBtn"
            );


        if (purchaseBtn) {

            purchaseBtn.href =
                purchaseURL;

        }


        // ==========================================
        // PURCHASE BUTTON 2
        // ==========================================

        const purchaseButton =
            document.getElementById(
                "purchaseButton"
            );


        if (purchaseButton) {

            purchaseButton.href =
                purchaseURL;

        }


        // ==========================================
        // PAGE TITLE
        // ==========================================

        document.title =
            title +
            " | Maha Malik Artwork";


        // ==========================================
        // CONSOLE INFORMATION
        // ==========================================

        console.log(
            "Painting loaded successfully:",
            title
        );

        console.log(
            "Painting ID:",
            paintingId
        );

        console.log(
            "Painting Price:",
            price
        );

        console.log(
            "Purchase URL:",
            purchaseURL
        );

    }


    catch (error) {

        console.error(
            "Failed to load painting:",
            error
        );


        alert(
            "Failed to load painting. Please check the browser Console."
        );

    }

}


// ==========================================
// START
// ==========================================

loadPainting();