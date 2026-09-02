// ==========================================
// MAHA MALIK ARTWORK STUDIO
// EDIT PAINTING
// ==========================================

// ==========================================
// API URL
// ==========================================

const API_URL =
    "https://oracleapex.com/ords/databasesetup/artwork_api/paintings/";


// ==========================================
// GET PAINTING ID FROM URL
// Example: edit-painting.html?id=21
// ==========================================

const params = new URLSearchParams(window.location.search);

const id = parseInt(params.get("id"));


// ==========================================
// CHECK ID
// ==========================================

if (!id) {

    alert("Invalid painting ID.");

    window.location.href = "paintings.html";

}


// ==========================================
// LOAD PAINTING FROM ORACLE
// ==========================================

async function loadPainting() {

    try {

        const response = await fetch(API_URL + id);

        if (!response.ok) {

            throw new Error(
                "API Error: " + response.status
            );

        }

        const data = await response.json();

        console.log("Painting from Oracle:", data);


        // ==========================================
        // HANDLE ORDS RESPONSE
        // ==========================================

        let painting;

        if (data.items) {

            painting = data.items[0];

        } else {

            painting = data;

        }


        if (!painting) {

            alert("Painting not found.");

            window.location.href = "paintings.html";

            return;

        }


        // ==========================================
        // FILL FORM
        // ==========================================

        document.getElementById("title").value =
            painting.title || "";


        document.getElementById("category").value =
            painting.category_id || "";


        document.getElementById("medium").value =
            painting.medium || "";


        document.getElementById("size").value =
            painting.painting_size || "";


        // FIXED: LOAD PRICE
        document.getElementById("price").value =
            painting.price ?? "";


        document.getElementById("status").value =
            painting.status || "";


        document.getElementById("image").value =
            painting.image || "";


        document.getElementById("description").value =
            painting.description || "";


        document.getElementById("story").value =
            painting.story || "";

    }

    catch (error) {

        console.error(
            "Error loading painting:",
            error
        );

        alert(
            "Failed to load painting."
        );

    }

}


// ==========================================
// UPDATE PAINTING
// ==========================================

document
    .getElementById("editPaintingForm")
    .addEventListener("submit", async function(e) {

        e.preventDefault();


        // ==========================================
        // GET FORM VALUES
        // ==========================================

        const updatedPainting = {

            category_id:
                parseInt(
                    document.getElementById("category").value
                ),

            title:
                document.getElementById("title").value.trim(),

            description:
                document.getElementById("description").value.trim(),

            story:
                document.getElementById("story").value.trim(),

            medium:
                document.getElementById("medium").value.trim(),

            painting_size:
                document.getElementById("size").value.trim(),

            price:
                parseFloat(
                    document.getElementById("price").value
                ),

            status:
                document.getElementById("status").value,

            image:
                document.getElementById("image").value.trim()

        };


        console.log(
            "Sending PUT data:",
            updatedPainting
        );


        // ==========================================
        // VALIDATE PRICE
        // ==========================================

        if (isNaN(updatedPainting.price)) {

            alert("Please enter a valid price.");

            return;

        }


        // ==========================================
        // VALIDATE CATEGORY
        // ==========================================

        if (isNaN(updatedPainting.category_id)) {

            alert("Please select a valid category.");

            return;

        }


        // ==========================================
        // SEND PUT REQUEST
        // ==========================================

        try {

            const response = await fetch(
                API_URL + id,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body:
                        JSON.stringify(updatedPainting)

                }
            );


            // ==========================================
            // HANDLE ERROR
            // ==========================================

            if (!response.ok) {

                const errorText =
                    await response.text();

                console.error(
                    "PUT API Error:",
                    errorText
                );

                throw new Error(
                    "PUT failed: " +
                    response.status
                );

            }


            // ==========================================
            // SUCCESS
            // ==========================================

            alert(
                "Painting updated successfully!"
            );


            window.location.href =
                "paintings.html";

        }

        catch (error) {

            console.error(
                "Error updating painting:",
                error
            );

            alert(
                "Failed to update painting."
            );

        }

    });


// ==========================================
// START
// ==========================================

loadPainting();