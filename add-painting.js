// ===========================================
// ADD PAINTING
// Maha Malik Artwork Studio
// ===========================================


// ===========================================
// POST API
// ===========================================

const POST_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/paintings/";


// ===========================================
// FORM
// ===========================================

const form =
    document.getElementById("paintingForm");


// ===========================================
// IMAGE PREVIEW
// ===========================================

const imageInput =
    document.getElementById("image");

const previewImage =
    document.getElementById("previewImage");


if (imageInput && previewImage) {

    imageInput.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) {

                previewImage.style.display = "none";
                previewImage.src = "";

                return;
            }

            const imageURL =
                URL.createObjectURL(file);

            previewImage.src = imageURL;
            previewImage.style.display = "block";

        }
    );

}


// ===========================================
// SUBMIT FORM
// ===========================================

form.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();


        try {

            // ==================================
            // GET IMAGE FILE
            // ==================================

            const imageFile =
                document.getElementById("image").files[0];


            // ==================================
            // GET CATEGORY ID
            // ==================================

            const categoryID =
                document.getElementById(
                    "category_id"
                ).value;


            // ==================================
            // VALIDATE CATEGORY
            // ==================================

            if (!categoryID) {

                alert(
                    "Please select a category."
                );

                return;
            }


            // ==================================
            // CREATE PAINTING DATA
            // ==================================

            const painting = {

                category_id:
                    Number(categoryID),

                title:
                    document.getElementById(
                        "title"
                    ).value.trim(),

                description:
                    document.getElementById(
                        "description"
                    ).value.trim(),

                story:
                    document.getElementById(
                        "story"
                    ).value.trim(),

                medium:
                    document.getElementById(
                        "medium"
                    ).value.trim(),

                painting_size:
                    document.getElementById(
                        "size"
                    ).value.trim(),

                price:
                    Number(
                        document.getElementById(
                            "price"
                        ).value
                    ),

                status:
                    document.getElementById(
                        "status"
                    ).value,

                image:
                    imageFile
                        ? imageFile.name
                        : null

            };


            // ==================================
            // SHOW DATA IN CONSOLE
            // ==================================

            console.log(
                "POST data:",
                painting
            );


            // ==================================
            // SEND POST REQUEST
            // ==================================

            const response =
                await fetch(
                    POST_API,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                painting
                            )

                    }
                );


            // ==================================
            // RESPONSE STATUS
            // ==================================

            console.log(
                "POST response status:",
                response.status
            );


            // ==================================
            // HANDLE ERROR
            // ==================================

            if (!response.ok) {

                let errorMessage =
                    "Failed to add painting.";

                try {

                    const errorData =
                        await response.json();

                    console.error(
                        "POST API error:",
                        errorData
                    );

                    errorMessage =
                        errorData.message ||
                        errorData.error ||
                        errorMessage;

                }

                catch (error) {

                    console.error(
                        "Could not read API error response."
                    );

                }

                throw new Error(
                    errorMessage +
                    "\nHTTP Status: " +
                    response.status
                );

            }


            // ==================================
            // SUCCESS RESPONSE
            // ==================================

            let result = null;

            try {

                result =
                    await response.json();

                console.log(
                    "POST API response:",
                    result
                );

            }

            catch (error) {

                console.log(
                    "POST completed successfully."
                );

            }


            // ==================================
            // SUCCESS MESSAGE
            // ==================================

            const successMessage =
                document.getElementById(
                    "successMessage"
                );

            if (successMessage) {

                successMessage.style.display =
                    "block";

            }


            alert(
                "Painting added successfully!"
            );


            // ==================================
            // RESET FORM
            // ==================================

            form.reset();


            if (previewImage) {

                previewImage.src = "";

                previewImage.style.display =
                    "none";

            }

        }


        // ======================================
        // CATCH ERROR
        // ======================================

        catch (error) {

            console.error(
                "Error adding painting:",
                error
            );

            alert(
                "Could not add painting.\n\n" +
                error.message
            );

        }

    }
);