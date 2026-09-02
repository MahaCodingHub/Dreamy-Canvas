/*=========================================
        MAHA MALIK ARTWORK STUDIO
        ADMIN DASHBOARD SCRIPT
=========================================*/


// =========================================
// API URLS
// =========================================

const PAINTINGS_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/paintings/";

const ORDERS_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/orders/";

const MESSAGES_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/messages/";

const CUSTOMERS_API =
    "https://oracleapex.com/ords/databasesetup/artwork_api/customers/";



// =========================================
// WELCOME MESSAGE
// =========================================

const greeting =
    document.getElementById("greeting");

const hour =
    new Date().getHours();


if (greeting) {

    if (hour < 12) {

        greeting.innerHTML =
            "Good Morning, Maha 👋";

    }

    else if (hour < 17) {

        greeting.innerHTML =
            "Good Afternoon, Maha 🌸";

    }

    else {

        greeting.innerHTML =
            "Good Evening, Maha 🌙";

    }

}



// =========================================
// LIVE CLOCK
// =========================================

const clock =
    document.getElementById("clock");


function updateClock() {

    if (!clock) return;


    const now =
        new Date();


    let h =
        now.getHours();

    let m =
        now.getMinutes();

    let s =
        now.getSeconds();


    if (h < 10)
        h = "0" + h;

    if (m < 10)
        m = "0" + m;

    if (s < 10)
        s = "0" + s;


    clock.innerHTML =
        h + ":" + m + ":" + s;

}


setInterval(
    updateClock,
    1000
);

updateClock();



// =========================================
// CARD HOVER EFFECT
// =========================================

const cards =
    document.querySelectorAll(".card");


cards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.transform =
                "translateY(-10px)";

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "translateY(0px)";

        }
    );

});



// =========================================
// GET API COUNT
// =========================================

async function getApiCount(apiUrl) {

    try {

        const response =
            await fetch(apiUrl);


        if (!response.ok) {

            throw new Error(
                "API request failed"
            );

        }


        const data =
            await response.json();


        console.log(
            "API:",
            apiUrl,
            data
        );


        if (data.items) {

            return data.items.length;

        }


        return 0;

    }

    catch (error) {

        console.error(
            "Error loading API:",
            apiUrl,
            error
        );


        return 0;

    }

}



// =========================================
// LIVE DASHBOARD COUNTS
// =========================================

async function loadDashboardCounts() {

    console.log(
        "Loading dashboard counts..."
    );


    const paintingCount =
        await getApiCount(
            PAINTINGS_API
        );


    const orderCount =
        await getApiCount(
            ORDERS_API
        );


    const messageCount =
        await getApiCount(
            MESSAGES_API
        );


    const customerCount =
        await getApiCount(
            CUSTOMERS_API
        );



    // PAINTINGS

    const paintingElement =
        document.getElementById(
            "paintingCount"
        );


    if (paintingElement) {

        paintingElement.textContent =
            paintingCount;

    }



    // ORDERS

    const orderElement =
        document.getElementById(
            "orderCount"
        );


    if (orderElement) {

        orderElement.textContent =
            orderCount;

    }



    // MESSAGES

    const messageElement =
        document.getElementById(
            "messageCount"
        );


    if (messageElement) {

        messageElement.textContent =
            messageCount;

    }



    // CUSTOMERS

    const customerElement =
        document.getElementById(
            "customerCount"
        );


    if (customerElement) {

        customerElement.textContent =
            customerCount;

    }


    console.log(
        "Dashboard counts updated:",
        {
            paintings: paintingCount,
            orders: orderCount,
            messages: messageCount,
            customers: customerCount
        }
    );

}



// =========================================
// COUNTING ANIMATION
// =========================================

const counters =
    document.querySelectorAll(".counter");


counters.forEach(counter => {

    const target =
        +counter.getAttribute(
            "data-target"
        );


    let count = 0;


    const speed =
        target / 100;


    function update() {

        if (count < target) {

            count += speed;

            counter.innerHTML =
                Math.ceil(count);

            requestAnimationFrame(
                update
            );

        }

        else {

            counter.innerHTML =
                target;

        }

    }


    update();

});



// =========================================
// TODAY'S DATE
// =========================================

const today =
    document.getElementById("today");


if (today) {

    const months = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];


    const d =
        new Date();


    today.innerHTML =
        d.getDate() +
        " " +
        months[d.getMonth()] +
        " " +
        d.getFullYear();

}



// =========================================
// LOGOUT BUTTON
// =========================================

const logout =
    document.getElementById("logout");


if (logout) {

    logout.addEventListener(
        "click",
        function() {

            const answer =
                confirm(
                    "Do you really want to logout?"
                );


            if (answer) {

                window.location.href =
                    "login.html";

            }

        }
    );

}



// =========================================
// SIDEBAR ACTIVE LINK
// =========================================

const menu =
    document.querySelectorAll(
        ".sidebar ul li"
    );


menu.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            menu.forEach(
                li =>
                    li.classList.remove(
                        "active"
                    )
            );


            item.classList.add(
                "active"
            );

        }
    );

});



// =========================================
// NOTIFICATION BELL
// =========================================

const bell =
    document.getElementById("bell");


if (bell) {

    bell.addEventListener(
        "click",
        () => {

            alert(
                "No new notifications."
            );

        }
    );

}



// =========================================
// QUICK ACTION BUTTONS
// =========================================

const actions =
    document.querySelectorAll(
        ".action-btn"
    );


actions.forEach(btn => {

    btn.addEventListener(
        "mouseenter",
        () => {

            btn.style.transform =
                "scale(1.05)";

        }
    );


    btn.addEventListener(
        "mouseleave",
        () => {

            btn.style.transform =
                "scale(1)";

        }
    );

});



// =========================================
// LOAD DASHBOARD DATA
// =========================================

loadDashboardCounts();



// =========================================
// DASHBOARD LOADED
// =========================================

console.log(
    "Maha Malik Admin Dashboard Loaded Successfully"
);