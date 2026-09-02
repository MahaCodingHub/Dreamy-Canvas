// ============================================
// MAHA MALIK ARTWORK STUDIO
// PAINTINGS MANAGEMENT
// ============================================


// ============================================
// API URLS
// ============================================

const GET_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/paintings/";

const DELETE_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/painting/";


// ============================================
// LOAD PAINTINGS
// ============================================

async function loadPaintings() {

    const table = document.getElementById("paintingTable");

    if (!table) {
        console.error("paintingTable not found");
        return;
    }

    table.innerHTML = `
        <tr>
            <td colspan="7" style="text-align:center;">
                Loading paintings...
            </td>
        </tr>
    `;

    try {

        console.log("Calling GET API...");

        const response = await fetch(GET_API, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        console.log("GET response status:", response.status);

        if (!response.ok) {
            throw new Error("API Error: " + response.status);
        }

        const data = await response.json();

        console.log("GET API Response:", data);

        const paintings = data.items || [];

        console.log("Paintings:", paintings);


        // ============================================
        // NO DATA
        // ============================================

        if (paintings.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center;">
                        No paintings found.
                    </td>
                </tr>
            `;

            return;
        }


        // ============================================
        // CLEAR TABLE
        // ============================================

        table.innerHTML = "";


        // ============================================
        // CREATE ROWS
        // ============================================

        paintings.forEach(function (painting) {

            const row = document.createElement("tr");


            // ========================================
            // GET VALUES
            // ========================================

            const id =
                painting.painting_id ??
                painting.PAINTING_ID ??
                painting.id ??
                painting.ID ??
                "";

            const title =
                painting.title ??
                painting.TITLE ??
                "";

            const category =
                painting.category ??
                painting.CATEGORY ??
                "—";

            const medium =
                painting.medium ??
                painting.MEDIUM ??
                "";

            const status =
                painting.status ??
                painting.STATUS ??
                "Available";

            const image =
                painting.image ??
                painting.IMAGE ??
                "";


            console.log(
                "Painting ID:",
                id
            );


            // ========================================
            // STATUS
            // ========================================

            let statusClass = "available";

            if (
                String(status).toLowerCase() === "sold"
            ) {

                statusClass = "sold";

            }


            // ========================================
            // IMAGE
            // ========================================

            let imageHTML = `
                <span>No Image</span>
            `;

            if (image) {

                const imagePath = "../" + image;

                imageHTML = `
                    <img
                        src="${imagePath}"
                        class="table-image"
                        alt="${title || "Painting"}"
                        onerror="
                            this.style.display='none';
                            this.parentElement.innerHTML='<span>Image not found</span>';
                        "
                    >
                `;
            }


            // ========================================
            // ACTIONS
            // ========================================

            let actionsHTML = `
                <span style="color:red;">
                    No ID
                </span>
            `;


            if (id !== "") {

                actionsHTML = `

                    <!-- EDIT -->

                    <a
                        href="edit-painting.html?id=${encodeURIComponent(id)}"
                        title="Edit Painting"
                        class="painting-action edit-action"
                    >

                        <i class="fas fa-edit"></i>

                    </a>


                    <!-- DELETE -->

                    <button
                        type="button"
                        class="painting-action delete-action"
                        data-id="${id}"
                        title="Delete Painting"
                    >

                        <i class="fas fa-trash"></i>

                    </button>

                `;
            }


            // ========================================
            // TABLE ROW
            // ========================================

            row.innerHTML = `

                <td>
                    ${id}
                </td>

                <td>
                    ${imageHTML}
                </td>

                <td>
                    ${title}
                </td>

                <td>
                    ${category}
                </td>

                <td>
                    ${medium}
                </td>

                <td>

                    <span class="${statusClass}">
                        ${status}
                    </span>

                </td>

                <td class="actions">

                    ${actionsHTML}

                </td>

            `;


            table.appendChild(row);

        });


        // ============================================
        // ACTIVATE DELETE BUTTONS
        // ============================================

        setupDeleteButtons();

    }


    catch (error) {

        console.error(
            "Error loading paintings:",
            error
        );

        table.innerHTML = `
            <tr>

                <td
                    colspan="7"
                    style="text-align:center;color:red;"
                >

                    Failed to load paintings.

                    <br>

                    <small>
                        ${error.message}
                    </small>

                </td>

            </tr>
        `;
    }
}



// ============================================
// SEARCH PAINTINGS
// ============================================

function setupSearch() {

    const searchInput =
        document.getElementById("searchPainting");

    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {

            const value =
                this.value.toLowerCase();

            const rows =
                document.querySelectorAll(
                    "#paintingTable tr"
                );


            rows.forEach(function (row) {

                const text =
                    row.innerText.toLowerCase();

                row.style.display =
                    text.includes(value)
                        ? ""
                        : "none";

            });

        }
    );
}



// ============================================
// DELETE PAINTING
// ============================================

function setupDeleteButtons() {

    const deleteButtons =
        document.querySelectorAll(".delete-action");


    deleteButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            async function () {

                const id =
                    this.getAttribute("data-id");


                if (!id) {

                    alert(
                        "Painting ID not found."
                    );

                    return;
                }


                // ========================================
                // CONFIRMATION
                // ========================================

                const confirmDelete =
                    confirm(
                        "Are you sure you want to delete painting ID " +
                        id +
                        "?"
                    );


                if (!confirmDelete) {
                    return;
                }


                // ========================================
                // DELETE URL
                // ========================================

                const url =
                    DELETE_API + encodeURIComponent(id);


                console.log(
                    "DELETE URL:",
                    url
                );


                try {

                    const response =
                        await fetch(url, {

                            method: "DELETE",

                            headers: {
                                "Accept": "application/json"
                            }

                        });


                    console.log(
                        "DELETE response status:",
                        response.status
                    );


                    // ====================================
                    // SUCCESS
                    // ====================================

                    if (
                        response.ok ||
                        response.status === 204
                    ) {

                        alert(
                            "Painting deleted successfully."
                        );

                        loadPaintings();

                        return;
                    }


                    // ====================================
                    // ERROR
                    // ====================================

                    let errorMessage =
                        "Delete failed.";


                    try {

                        const errorData =
                            await response.json();

                        console.error(
                            "DELETE API error:",
                            errorData
                        );

                        errorMessage =
                            errorData.message ||
                            errorData.error ||
                            errorMessage;

                    }

                    catch (e) {

                        console.error(
                            "Could not read error response."
                        );

                    }


                    alert(
                        errorMessage +
                        "\nHTTP Status: " +
                        response.status
                    );

                }


                catch (error) {

                    console.error(
                        "DELETE request failed:",
                        error
                    );

                    alert(
                        "Could not connect to the DELETE API."
                    );

                }

            }
        );

    });
}



// ============================================
// START
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Paintings page loaded"
        );

        setupSearch();

        loadPaintings();

    }
);