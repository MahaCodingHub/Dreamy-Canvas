// ======================================
// MAHA MALIK ARTWORK STUDIO
// ORDERS ADMIN PAGE
// ======================================


// ======================================
// ORDERS API
// ======================================

const ORDERS_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/orders/";


// ======================================
// HTML ELEMENTS
// ======================================

const searchBox =
    document.getElementById("searchOrder");

const orderTable =
    document.getElementById("orderTable");

const orderCount =
    document.getElementById("orderCount");


// ======================================
// STORE ORDERS
// ======================================

let orders = [];


// ======================================
// LOAD ORDERS FROM ORACLE
// ======================================

async function loadOrders() {

    try {

        orderTable.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; padding:30px;">
                    <i class="fas fa-spinner fa-spin"></i>
                    Loading orders...
                </td>
            </tr>
        `;


        const response =
            await fetch(ORDERS_API);


        if (!response.ok) {

            throw new Error(
                "API Error: " + response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "Orders received from Oracle:",
            data
        );


        orders =
            data.items || [];


        console.log(
            "Total orders:",
            orders.length
        );


        renderOrders(orders);

    }

    catch (error) {

        console.error(
            "Orders API Error:",
            error
        );


        orderTable.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center; padding:40px; color:#c0392b;">

                    <i class="fas fa-exclamation-circle"></i>

                    <br><br>

                    Unable to load orders.

                    <br>

                    Please check the Orders API.

                </td>
            </tr>
        `;


        updateOrderCount(0);

    }

}


// ======================================
// DISPLAY ORDERS
// ======================================

function renderOrders(orderList) {

    orderTable.innerHTML = "";


    // ==================================
    // NO ORDERS
    // ==================================

    if (!orderList || orderList.length === 0) {

        orderTable.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center; padding:40px;">

                    <i class="fas fa-shopping-bag"></i>

                    <br><br>

                    No orders found.

                </td>
            </tr>
        `;


        updateOrderCount(0);

        return;

    }


    // ==================================
    // CREATE ORDER ROWS
    // ==================================

    orderList.forEach(function(order) {


        // ==================================
        // DATABASE VALUES
        // ==================================

        const orderId =
            order.order_id ??
            order.ORDER_ID ??
            "";


        const customer =
            order.customer ??
            order.CUSTOMER ??
            order.customer_name ??
            order.CUSTOMER_NAME ??
            "N/A";


        const email =
            order.email ??
            order.EMAIL ??
            "N/A";


        const phone =
            order.phone ??
            order.PHONE ??
            "N/A";


        const country =
            order.country ??
            order.COUNTRY ??
            "N/A";


        const painting =
            order.painting ??
            order.PAINTING ??
            order.painting_name ??
            order.PAINTING_NAME ??
            "N/A";


        const paintingId =
            order.painting_id ??
            order.PAINTING_ID ??
            "";


        const quantity =
            order.quantity ??
            order.QUANTITY ??
            1;


        const totalAmount =
            order.total_amount ??
            order.TOTAL_AMOUNT ??
            0;


        const payment =
            order.payment ??
            order.PAYMENT ??
            order.payment_method ??
            order.PAYMENT_METHOD ??
            "N/A";


        const status =
            order.status ??
            order.STATUS ??
            order.order_status ??
            order.ORDER_STATUS ??
            "Pending";


        const orderDate =
            order.order_date ??
            order.ORDER_DATE ??
            "";


        // ==================================
        // CUSTOMER INITIALS
        // ==================================

        const initials =
            getInitials(customer);


        // ==================================
        // PAYMENT ICON
        // ==================================

        const paymentIcon =
            getPaymentIcon(payment);


        // ==================================
        // STATUS CLASS
        // ==================================

        const statusClass =
            getStatusClass(status);


        // ==================================
        // CREATE ROW
        // ==================================

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <!-- ORDER ID -->

            <td>

                <strong class="order-id">

                    #${escapeHTML(orderId)}

                </strong>

            </td>


            <!-- CUSTOMER -->

            <td>

                <div class="customer-info">

                    <div class="customer-avatar">

                        ${escapeHTML(initials)}

                    </div>


                    <div>

                        <strong>

                            ${escapeHTML(customer)}

                        </strong>

                        <small>

                            ${escapeHTML(email)}

                        </small>

                    </div>

                </div>

            </td>


            <!-- PAINTING -->

            <td>

                <span class="painting-name">

                    ${escapeHTML(painting)}

                </span>

            </td>


            <!-- COUNTRY -->

            <td>

                ${escapeHTML(country)}

            </td>


            <!-- PAYMENT -->

            <td>

                <span class="payment-method">

                    <i class="${paymentIcon}"></i>

                    ${escapeHTML(payment)}

                </span>

            </td>


            <!-- STATUS -->

            <td>

                <span class="order-status ${statusClass}">

                    ${escapeHTML(status)}

                </span>

            </td>


            <!-- ACTIONS -->

            <td>

                <div class="order-actions">

                    <button
                        class="view-btn"
                        type="button"
                        data-id="${escapeHTML(orderId)}">

                        <i class="fas fa-eye"></i>

                        View

                    </button>


                    ${
                        String(status).toLowerCase() !== "completed" &&
                        String(status).toLowerCase() !== "delivered"
                        ?

                        `
                        <button
                            class="complete-btn"
                            type="button"
                            data-id="${escapeHTML(orderId)}">

                            <i class="fas fa-check"></i>

                            Complete

                        </button>
                        `

                        :

                        ""
                    }

                </div>

            </td>

        `;


        orderTable.appendChild(row);

    });


    // ==================================
    // UPDATE COUNT
    // ==================================

    updateOrderCount(
        orderList.length
    );


    // ==================================
    // ATTACH BUTTON EVENTS
    // ==================================

    attachButtonEvents();

}


// ======================================
// SEARCH ORDERS
// ======================================

if (searchBox) {

    searchBox.addEventListener(
        "input",
        function () {


            const filter =
                searchBox.value
                    .toLowerCase()
                    .trim();


            // Show all orders

            if (!filter) {

                renderOrders(orders);

                return;

            }


            // ==================================
            // FILTER ORDERS
            // ==================================

            const filteredOrders =
                orders.filter(function(order) {


                    const orderId =
                        String(
                            order.order_id ??
                            order.ORDER_ID ??
                            ""
                        );


                    const customer =
                        String(
                            order.customer ??
                            order.CUSTOMER ??
                            order.customer_name ??
                            order.CUSTOMER_NAME ??
                            ""
                        );


                    const email =
                        String(
                            order.email ??
                            order.EMAIL ??
                            ""
                        );


                    const phone =
                        String(
                            order.phone ??
                            order.PHONE ??
                            ""
                        );


                    const painting =
                        String(
                            order.painting ??
                            order.PAINTING ??
                            order.painting_name ??
                            order.PAINTING_NAME ??
                            ""
                        );


                    const country =
                        String(
                            order.country ??
                            order.COUNTRY ??
                            ""
                        );


                    const payment =
                        String(
                            order.payment ??
                            order.PAYMENT ??
                            order.payment_method ??
                            order.PAYMENT_METHOD ??
                            ""
                        );


                    const status =
                        String(
                            order.status ??
                            order.STATUS ??
                            order.order_status ??
                            order.ORDER_STATUS ??
                            ""
                        );


                    return (

                        orderId
                            .toLowerCase()
                            .includes(filter)

                        ||

                        customer
                            .toLowerCase()
                            .includes(filter)

                        ||

                        email
                            .toLowerCase()
                            .includes(filter)

                        ||

                        phone
                            .toLowerCase()
                            .includes(filter)

                        ||

                        painting
                            .toLowerCase()
                            .includes(filter)

                        ||

                        country
                            .toLowerCase()
                            .includes(filter)

                        ||

                        payment
                            .toLowerCase()
                            .includes(filter)

                        ||

                        status
                            .toLowerCase()
                            .includes(filter)

                    );

                });


            renderOrders(
                filteredOrders
            );

        }
    );

}


// ======================================
// BUTTON EVENTS
// ======================================

function attachButtonEvents() {


    // ==================================
    // VIEW ORDER
    // ==================================

    document
        .querySelectorAll(".view-btn")
        .forEach(function(button) {


            button.addEventListener(
                "click",
                function () {


                    const orderId =
                        Number(
                            this.dataset.id
                        );


                    const order =
                        orders.find(function(item) {

                            return Number(
                                item.order_id ??
                                item.ORDER_ID
                            ) === orderId;

                        });


                    if (!order) {

                        alert(
                            "Order information not found."
                        );

                        return;

                    }


                    // ==================================
                    // GET ORDER INFORMATION
                    // ==================================

                    const customer =
                        order.customer ??
                        order.CUSTOMER ??
                        order.customer_name ??
                        order.CUSTOMER_NAME ??
                        "N/A";


                    const email =
                        order.email ??
                        order.EMAIL ??
                        "N/A";


                    const phone =
                        order.phone ??
                        order.PHONE ??
                        "N/A";


                    const country =
                        order.country ??
                        order.COUNTRY ??
                        "N/A";


                    const painting =
                        order.painting ??
                        order.PAINTING ??
                        order.painting_name ??
                        order.PAINTING_NAME ??
                        "N/A";


                    const paintingId =
                        order.painting_id ??
                        order.PAINTING_ID ??
                        "N/A";


                    const quantity =
                        order.quantity ??
                        order.QUANTITY ??
                        "N/A";


                    const totalAmount =
                        order.total_amount ??
                        order.TOTAL_AMOUNT ??
                        0;


                    const payment =
                        order.payment ??
                        order.PAYMENT ??
                        order.payment_method ??
                        order.PAYMENT_METHOD ??
                        "N/A";


                    const status =
                        order.status ??
                        order.STATUS ??
                        order.order_status ??
                        order.ORDER_STATUS ??
                        "N/A";


                    const orderDate =
                        order.order_date ??
                        order.ORDER_DATE ??
                        "N/A";


                    // ==================================
                    // SHOW COMPLETE ORDER DETAILS
                    // ==================================

                    alert(

                        "ORDER DETAILS\n" +
                        "==============================\n\n" +

                        "Order ID: #" +
                        orderId +

                        "\nCustomer: " +
                        customer +

                        "\nEmail: " +
                        email +

                        "\nPhone: " +
                        phone +

                        "\nCountry: " +
                        country +

                        "\n\nPainting ID: " +
                        paintingId +

                        "\nPainting: " +
                        painting +

                        "\nQuantity: " +
                        quantity +

                        "\nTotal Amount: Rs. " +
                        totalAmount +

                        "\n\nPayment: " +
                        payment +

                        "\nStatus: " +
                        status +

                        "\nOrder Date: " +
                        formatDate(orderDate)

                    );

                }
            );

        });


    // ==================================
    // COMPLETE ORDER
    // ==================================

    document
        .querySelectorAll(".complete-btn")
        .forEach(function(button) {


            button.addEventListener(
                "click",
                function () {


                    const orderId =
                        Number(
                            this.dataset.id
                        );


                    const order =
                        orders.find(function(item) {

                            return Number(
                                item.order_id ??
                                item.ORDER_ID
                            ) === orderId;

                        });


                    if (!order) {

                        alert(
                            "Order not found."
                        );

                        return;

                    }


                    alert(

                        "Order #" +
                        orderId +

                        "\n\nCurrent Status: " +
                        (
                            order.status ??
                            order.STATUS ??
                            order.order_status ??
                            order.ORDER_STATUS ??
                            "Pending"
                        ) +

                        "\n\nThe order status PUT API needs to be connected before this button can permanently update the status."

                    );

                }
            );

        });

}


// ======================================
// UPDATE ORDER COUNT
// ======================================

function updateOrderCount(count) {

    if (!orderCount) {
        return;
    }


    orderCount.textContent =
        count +
        (
            count === 1
                ? " Order"
                : " Orders"
        );

}


// ======================================
// STATUS CLASS
// ======================================

function getStatusClass(status) {


    if (!status) {

        return "pending-status";

    }


    const value =
        String(status)
            .toLowerCase()
            .trim();


    if (value === "pending") {

        return "pending-status";

    }


    if (
        value === "completed" ||
        value === "delivered" ||
        value === "confirmed"
    ) {

        return "completed-status";

    }


    if (
        value === "processing" ||
        value === "shipped"
    ) {

        return "processing-status";

    }


    if (
        value === "cancelled" ||
        value === "canceled"
    ) {

        return "cancelled-status";

    }


    return "pending-status";

}


// ======================================
// PAYMENT ICON
// ======================================

function getPaymentIcon(payment) {


    const value =
        String(payment || "")
            .toLowerCase()
            .trim();


    if (value.includes("paypal")) {

        return "fab fa-paypal";

    }


    if (
        value.includes("jazzcash") ||
        value.includes("easypaisa")
    ) {

        return "fas fa-wallet";

    }


    if (
        value.includes("bank")
    ) {

        return "fas fa-building-columns";

    }


    return "fas fa-credit-card";

}


// ======================================
// CUSTOMER INITIALS
// ======================================

function getInitials(name) {


    if (!name) {

        return "CU";

    }


    const words =
        String(name)
            .trim()
            .split(/\s+/);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

}


// ======================================
// DATE FORMAT
// ======================================

function formatDate(dateString) {


    if (!dateString) {

        return "N/A";

    }


    const date =
        new Date(dateString);


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return dateString;

    }


    return date.toLocaleDateString(
        "en-GB"
    );

}


// ======================================
// HTML SAFETY
// ======================================

function escapeHTML(value) {


    const div =
        document.createElement("div");


    div.textContent =
        value ?? "";


    return div.innerHTML;

}


// ======================================
// START
// ======================================

loadOrders();