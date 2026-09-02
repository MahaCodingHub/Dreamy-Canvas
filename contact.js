// ==========================================
// MAHA MALIK ARTWORK
// CONTACT FORM
// ==========================================


// ==========================================
// ORACLE APEX MESSAGES API
// ==========================================

const MESSAGES_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/messages/";


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Contact page loaded.");

    const form =
        document.querySelector(".contact-form");


    if (!form) {

        console.error("Contact form not found.");

        return;
    }


    // ==========================================
    // SUBMIT FORM
    // ==========================================

    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        try {

            // ==========================================
            // GET FORM VALUES
            // ==========================================

            const inputs =
                form.querySelectorAll("input");

            const textareas =
                form.querySelectorAll("textarea");


            const fullName =
                inputs[0]
                    ? inputs[0].value.trim()
                    : "";


            const email =
                inputs[1]
                    ? inputs[1].value.trim()
                    : "";


            const phone =
                inputs[2]
                    ? inputs[2].value.trim()
                    : "";


            const subject =
                inputs[3]
                    ? inputs[3].value.trim()
                    : "";


            const message =
                textareas[0]
                    ? textareas[0].value.trim()
                    : "";


            console.log("==========================================");
            console.log("CONTACT FORM");
            console.log("Name:", fullName);
            console.log("Email:", email);
            console.log("Phone:", phone);
            console.log("Subject:", subject);
            console.log("Message:", message);
            console.log("==========================================");


            // ==========================================
            // VALIDATION
            // ==========================================

            if (!fullName) {

                alert("Please enter your full name.");

                return;
            }


            if (!email) {

                alert("Please enter your email address.");

                return;
            }


            if (!message) {

                alert("Please enter your message.");

                return;
            }


            // ==========================================
            // CREATE MESSAGE URL
            // ==========================================

            const messageUrl =
                MESSAGES_API +
                "?NAME=" +
                encodeURIComponent(fullName) +

                "&EMAIL=" +
                encodeURIComponent(email) +

                "&PHONE=" +
                encodeURIComponent(phone) +

                "&SUBJECT=" +
                encodeURIComponent(subject) +

                "&MESSAGE=" +
                encodeURIComponent(message);


            console.log(
                "Sending message to:",
                messageUrl
            );


            // ==========================================
            // SEND MESSAGE
            // ==========================================

            const response =
                await fetch(
                    messageUrl,
                    {
                        method: "POST",

                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            const responseText =
                await response.text();


            console.log(
                "Messages API Status:",
                response.status
            );


            console.log(
                "Messages API Response:",
                responseText
            );


            // ==========================================
            // CHECK ERROR
            // ==========================================

            if (!response.ok) {

                throw new Error(
                    "Message submission failed: " +
                    response.status +
                    "\n" +
                    responseText
                );

            }


            // ==========================================
            // SUCCESS
            // ==========================================

            alert(
                "Your message has been sent successfully!\n\n" +
                "Thank you for contacting Maha Malik Artwork."
            );


            // Clear form

            form.reset();


            console.log(
                "Message submitted successfully."
            );

        }


        // ==========================================
        // ERROR
        // ==========================================

        catch (error) {

            console.error(
                "Contact Form Error:",
                error
            );


            alert(
                "Failed to send your message.\n\n" +
                error.message
            );

        }

    });

});