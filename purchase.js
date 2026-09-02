// ==========================================
// MAHA MALIK ARTWORK
// PURCHASE FORM
// ==========================================


// ==========================================
// ORACLE APIs
// ==========================================

const PAINTINGS_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/paintings/";

const CUSTOMERS_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/customers/";

const ORDERS_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/orders/";


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadPurchasePage();

});


// ==========================================
// LOAD PURCHASE PAGE
// ==========================================

async function loadPurchasePage() {

    // --------------------------------------
    // GET PAINTING ID FROM URL
    // --------------------------------------

    const params =
        new URLSearchParams(window.location.search);

    const paintingId =
        params.get("id");

    const urlPaintingName =
        params.get("painting");

    const urlPaintingPrice =
        params.get("price");


    console.log("================================");
    console.log("PURCHASE PAGE");
    console.log("================================");

    console.log("Painting ID:", paintingId);
    console.log("Painting name from URL:", urlPaintingName);
    console.log("Painting price from URL:", urlPaintingPrice);


    // --------------------------------------
    // FIND FORM
    // --------------------------------------

    const form =
        document.querySelector("form");

    if (!form) {

        console.error("Purchase form not found.");

        return;

    }


    // --------------------------------------
    // FIND PAINTING NAME INPUT
    // --------------------------------------

    const paintingNameInput =
        document.getElementById("paintingName");


    if (!paintingNameInput) {

        console.error(
            "ERROR: #paintingName input not found."
        );

        return;

    }


    // --------------------------------------
    // NO PAINTING ID
    // --------------------------------------

    if (!paintingId) {

        console.error(
            "ERROR: Painting ID is missing from URL."
        );

        paintingNameInput.value =
            "Painting information unavailable";

        return;

    }


    // ======================================
    // FIRST TRY URL NAME
    // ======================================

    let paintingName =
        urlPaintingName || "";

    let paintingPrice =
        urlPaintingPrice || "";


    // ======================================
    // ALWAYS GET PAINTING FROM ORACLE
    // ======================================

    try {

        console.log(
            "Loading painting from Oracle..."
        );


        /*
         IMPORTANT:

         We fetch ALL paintings and then
         find the correct painting by ID.

         This avoids the ORDS /paintings/{id}
         problem that was causing trouble.
        */

        const response =
            await fetch(
                PAINTINGS_API,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        const responseText =
            await response.text();


        console.log(
            "Paintings API Status:",
            response.status
        );


        console.log(
            "Paintings API Response:",
            responseText
        );


        if (!response.ok) {

            throw new Error(
                "Paintings API failed: " +
                response.status
            );

        }


        const data =
            JSON.parse(responseText);


        // ----------------------------------
        // FIND PAINTING
        // ----------------------------------

        const paintings =
            data.items || [];


        const painting =
            paintings.find(function (item) {

                const id =
                    item.PAINTING_ID ??
                    item.painting_id;

                return String(id) ===
                    String(paintingId);

            });


        // ----------------------------------
        // PAINTING NOT FOUND
        // ----------------------------------

        if (!painting) {

            console.error(
                "Painting ID not found:",
                paintingId
            );

            paintingNameInput.value =
                "Painting not found";

            return;

        }


        // ==================================
        // GET TITLE
        // ==================================

        paintingName =
            painting.TITLE ??
            painting.title ??
            painting.PAINTING_NAME ??
            painting.painting_name ??
            "";


        // ==================================
        // GET PRICE
        // ==================================

        paintingPrice =
            painting.PRICE ??
            painting.price ??
            paintingPrice ??
            "";


        console.log(
            "================================"
        );

        console.log(
            "PAINTING FOUND"
        );

        console.log(
            "Painting ID:",
            paintingId
        );

        console.log(
            "Painting Name:",
            paintingName
        );

        console.log(
            "Painting Price:",
            paintingPrice
        );

        console.log(
            "================================"
        );


        // ==================================
        // AUTO-FILL PAINTING NAME
        // ==================================

        paintingNameInput.value =
            paintingName;


        // Keep it readonly
        paintingNameInput.readOnly =
            true;


        // Optional: make sure browser
        // validation does not complain
        paintingNameInput.required =
            false;


        console.log(
            "Painting name AUTO-FILLED:",
            paintingNameInput.value
        );


    }

    catch (error) {

        console.error(
            "Painting loading error:",
            error
        );


        paintingNameInput.value =
            "Unable to load painting";


        alert(
            "Unable to load painting information.\n\n" +
            error.message
        );


        return;

    }


    // ======================================
    // SUBMIT FORM
    // ======================================

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            try {

                // ==================================
                // CUSTOMER FIELDS
                // ==================================

                const fullNameInput =
                    form.querySelector(
                        'input[placeholder="Enter your full name"]'
                    );


                const emailInput =
                    form.querySelector(
                        'input[type="email"]'
                    );


                const phoneInput =
                    form.querySelector(
                        'input[type="tel"]'
                    );


                const countryInput =
                    form.querySelector(
                        "select"
                    );


                const textareas =
                    form.querySelectorAll(
                        "textarea"
                    );


                const fullName =
                    fullNameInput
                        ? fullNameInput.value.trim()
                        : "";


                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";


                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";


                const country =
                    countryInput
                        ? countryInput.value
                        : "";


                const address =
                    textareas.length > 0
                        ? textareas[0].value.trim()
                        : "";


                // ==================================
                // QUANTITY
                // ==================================

                const quantityInput =
                    form.querySelector(
                        'input[name="quantity"]:checked'
                    );


                let quantity =
                    quantityInput
                        ? parseInt(
                            quantityInput.value
                        )
                        : 1;


                /*
                 Your HTML has:

                 value="3+"

                 parseInt("3+") gives 3.

                 So we keep it as 3.
                */

                if (isNaN(quantity)) {

                    quantity = 1;

                }


                // ==================================
                // PAYMENT
                // ==================================

                const paymentInput =
                    form.querySelector(
                        'input[name="payment"]:checked'
                    );


                const payment =
                    paymentInput
                        ? paymentInput.value
                        : "";


                // ==================================
                // VALIDATION
                // ==================================

                if (!paintingId) {

                    alert(
                        "Painting ID is missing."
                    );

                    return;

                }


                if (
                    !paintingName ||
                    paintingName ===
                    "Painting not found"
                ) {

                    alert(
                        "Painting name could not be loaded."
                    );

                    return;

                }


                if (!paintingPrice) {

                    alert(
                        "Painting price could not be loaded."
                    );

                    return;

                }


                if (!fullName) {

                    alert(
                        "Please enter your full name."
                    );

                    return;

                }


                if (!email) {

                    alert(
                        "Please enter your email."
                    );

                    return;

                }


                if (!payment) {

                    alert(
                        "Please select a payment method."
                    );

                    return;

                }


                // ==================================
                // TOTAL
                // ==================================

                const totalAmount =
                    parseFloat(paintingPrice) *
                    quantity;


                console.log(
                    "Total Amount:",
                    totalAmount
                );


                // ==================================
                // FIND CUSTOMER
                // ==================================

                let customerId = null;


                const customerLookupUrl =
                    CUSTOMERS_API +
                    "?EMAIL=" +
                    encodeURIComponent(email);


                console.log(
                    "Checking customer:",
                    customerLookupUrl
                );


                const customerLookupResponse =
                    await fetch(
                        customerLookupUrl,
                        {
                            method: "GET",

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                const customerLookupText =
                    await customerLookupResponse.text();


                console.log(
                    "Customer Lookup Status:",
                    customerLookupResponse.status
                );


                console.log(
                    "Customer Lookup Response:",
                    customerLookupText
                );


                if (
                    !customerLookupResponse.ok
                ) {

                    throw new Error(
                        "Customer lookup failed: " +
                        customerLookupResponse.status +
                        "\n" +
                        customerLookupText
                    );

                }


                const customerLookup =
                    JSON.parse(
                        customerLookupText
                    );


                // ==================================
                // EXISTING CUSTOMER
                // ==================================

                if (
                    customerLookup.items &&
                    customerLookup.items.length > 0
                ) {

                    customerId =
                        customerLookup.items[0].CUSTOMER_ID ??
                        customerLookup.items[0].customer_id;


                    console.log(
                        "Existing customer found."
                    );


                    console.log(
                        "Customer ID:",
                        customerId
                    );

                }


                // ==================================
                // CREATE CUSTOMER
                // ==================================

                else {

                    console.log(
                        "Customer not found."
                    );


                    console.log(
                        "Creating new customer..."
                    );


                    const customerUrl =
                        CUSTOMERS_API +
                        "?FULLNAME=" +
                        encodeURIComponent(fullName) +
                        "&EMAIL=" +
                        encodeURIComponent(email) +
                        "&PHONE=" +
                        encodeURIComponent(phone) +
                        "&COUNTRY=" +
                        encodeURIComponent(country) +
                        "&ADDRESS=" +
                        encodeURIComponent(address);


                    console.log(
                        "Customer URL:",
                        customerUrl
                    );


                    const customerResponse =
                        await fetch(
                            customerUrl,
                            {
                                method: "POST",

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    const customerText =
                        await customerResponse.text();


                    console.log(
                        "Customer Status:",
                        customerResponse.status
                    );


                    console.log(
                        "Customer Response:",
                        customerText
                    );


                    if (
                        !customerResponse.ok
                    ) {

                        throw new Error(
                            "Customer creation failed: " +
                            customerResponse.status +
                            "\n" +
                            customerText
                        );

                    }


                    const customerResult =
                        JSON.parse(
                            customerText
                        );


                    customerId =
                        customerResult.CUSTOMER_ID ??
                        customerResult.customer_id;


                    if (!customerId) {

                        throw new Error(
                            "Customer ID was not returned."
                        );

                    }


                    console.log(
                        "New customer created."
                    );


                    console.log(
                        "Customer ID:",
                        customerId
                    );

                }


                // ==================================
                // VERIFY CUSTOMER
                // ==================================

                if (!customerId) {

                    throw new Error(
                        "Unable to obtain Customer ID."
                    );

                }


                // ==================================
                // CREATE ORDER URL
                // ==================================

                const orderUrl =
                    ORDERS_API +
                    "?EMAIL=" +
                    encodeURIComponent(email) +
                    "&FULLNAME=" +
                    encodeURIComponent(fullName) +
                    "&PHONE=" +
                    encodeURIComponent(phone) +
                    "&COUNTRY=" +
                    encodeURIComponent(country) +
                    "&ADDRESS=" +
                    encodeURIComponent(address) +
                    "&PAINTINGID=" +
                    encodeURIComponent(
                        parseInt(paintingId)
                    ) +
                    "&QUANTITY=" +
                    encodeURIComponent(quantity) +
                    "&PAYMENTMETHOD=" +
                    encodeURIComponent(payment) +
                    "&TOTALAMOUNT=" +
                    encodeURIComponent(totalAmount) +
                    "&PAINTINGNAME=" +
                    encodeURIComponent(paintingName);


                console.log(
                    "================================"
                );

                console.log(
                    "CREATING ORDER"
                );

                console.log(
                    "Painting Name:",
                    paintingName
                );

                console.log(
                    "Order URL:",
                    orderUrl
                );


                // ==================================
                // SEND ORDER
                // ==================================

                const orderResponse =
                    await fetch(
                        orderUrl,
                        {
                            method: "POST",

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                const orderText =
                    await orderResponse.text();


                console.log(
                    "Order Status:",
                    orderResponse.status
                );


                console.log(
                    "Order Response:",
                    orderText
                );


                if (!orderResponse.ok) {

                    throw new Error(
                        "Order creation failed: " +
                        orderResponse.status +
                        "\n" +
                        orderText
                    );

                }


                // ==================================
                // SUCCESS
                // ==================================

                alert(
                    "Purchase Request Submitted Successfully!"
                );


                // Reset form
                form.reset();


                // Put painting name back
                paintingNameInput.value =
                    paintingName;


                console.log(
                    "Purchase completed successfully."
                );

            }


            // ==================================
            // ERROR
            // ==================================

            catch (error) {

                console.error(
                    "Purchase Error:",
                    error
                );


                alert(
                    "Failed to submit purchase request.\n\n" +
                    error.message
                );

            }

        }
    );

}