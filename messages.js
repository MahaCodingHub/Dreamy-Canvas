// ======================================
// MESSAGES PAGE
// Maha Malik Artwork Studio
// ======================================


// ======================================
// API URL
// ======================================

const API_URL =
    "https://oracleapex.com/ords/databasesetup/artwork_api/messages/";


// ======================================
// PAGE ELEMENTS
// ======================================

const messageTable =
    document.getElementById("messageTable");

const messageCount =
    document.getElementById("messageCount");

const emptyMessages =
    document.getElementById("emptyMessages");

const searchBox =
    document.getElementById("searchMessage");


// Store messages
let messages = [];


// ======================================
// GET ALL MESSAGES
// ======================================

async function loadMessages() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error(
                "Failed to load messages"
            );

        }


        const data = await response.json();

        console.log(
            "Messages API Response:",
            data
        );


        messages = data.items || [];


        displayMessages(messages);

    }

    catch (error) {

        console.error(
            "Error loading messages:",
            error
        );


        messageTable.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="text-align:center;"
                >

                    Unable to load messages.

                </td>

            </tr>

        `;


        messageCount.textContent =
            "0 Messages";

    }

}



// ======================================
// DISPLAY MESSAGES
// ======================================

function displayMessages(messageList) {

    messageTable.innerHTML = "";


    messageCount.textContent =
        messageList.length +
        (
            messageList.length === 1
                ? " Message"
                : " Messages"
        );


    if (messageList.length === 0) {

        emptyMessages.style.display =
            "block";

        return;

    }


    emptyMessages.style.display =
        "none";


    messageList.forEach(function(message) {

        const row =
            document.createElement("tr");


        const initials =
            getInitials(message.name);


        const date =
            formatDate(message.sent_date);


        const status =
            message.status || "UNREAD";


        row.innerHTML = `

            <td>

                <div class="customer-info">

                    <div class="customer-avatar">

                        ${initials}

                    </div>

                    <div>

                        <strong>
                            ${message.name || ""}
                        </strong>

                        <small>
                            Customer
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${message.email || ""}
            </td>


            <td>

                <span class="subject">

                    ${message.subject || ""}

                </span>

            </td>


            <td>
                ${date}
            </td>


            <td>

                <span
                    class="message-status
                    ${getStatusClass(status)}"
                >

                    ${status}

                </span>

            </td>


            <td>

                <div class="message-actions">


                    <button
                        class="view-btn"
                        type="button"
                        onclick="viewMessage(${message.message_id})"
                    >

                        <i class="fas fa-eye"></i>

                        View

                    </button>


                    <button
                        class="delete-btn"
                        type="button"
                        onclick="deleteMessage(${message.message_id})"
                    >

                        <i class="fas fa-trash"></i>

                        Delete

                    </button>


                </div>

            </td>

        `;


        messageTable.appendChild(row);

    });

}



// ======================================
// GET MESSAGE BY ID
// ======================================

async function viewMessage(id) {

    try {

        const response =
            await fetch(API_URL + id);


        if (!response.ok) {

            throw new Error(
                "Message not found"
            );

        }


        const data =
            await response.json();


        let message;


        if (data.items) {

            message =
                data.items[0];

        }

        else {

            message = data;

        }


        if (!message) {

            alert(
                "Message not found."
            );

            return;

        }


        alert(

            "Customer Name : " +
            (message.name || "") +

            "\nEmail : " +
            (message.email || "") +

            "\nSubject : " +
            (message.subject || "") +

            "\nDate : " +
            formatDate(message.sent_date) +

            "\nStatus : " +
            (message.status || "") +

            "\n\nMessage:\n\n" +
            (message.message || "")

        );


        // Mark as READ
        await updateMessageStatus(
            id,
            "READ"
        );

    }

    catch (error) {

        console.error(
            "Error viewing message:",
            error
        );


        alert(
            "Unable to load this message."
        );

    }

}



// ======================================
// PUT — UPDATE MESSAGE STATUS
// ======================================

async function updateMessageStatus(
    id,
    newStatus
) {

    const message =
        messages.find(
            function(item) {

                return item.message_id == id;

            }
        );


    if (!message) {

        return;

    }


    try {

        const response =
            await fetch(
                API_URL + id,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        NAME:
                            message.name,

                        EMAIL:
                            message.email,

                        SUBJECT:
                            message.subject,

                        MESSAGE:
                            message.message,

                        STATUS:
                            newStatus

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to update message"
            );

        }


        message.status =
            newStatus;


        displayMessages(messages);

    }

    catch (error) {

        console.error(
            "Error updating status:",
            error
        );

    }

}



// ======================================
// DELETE MESSAGE
// ======================================

async function deleteMessage(id) {

    const confirmDelete =
        confirm(
            "Delete this message?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                API_URL + id,
                {

                    method: "DELETE"

                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete message"
            );

        }


        messages =
            messages.filter(
                function(message) {

                    return message.message_id != id;

                }
            );


        displayMessages(messages);


    }

    catch (error) {

        console.error(
            "Error deleting message:",
            error
        );


        alert(
            "Unable to delete message."
        );

    }

}



// ======================================
// SEARCH
// ======================================

searchBox.addEventListener(
    "keyup",
    function() {

        const filter =
            searchBox.value.toLowerCase();


        const filteredMessages =
            messages.filter(
                function(message) {

                    return (

                        (message.name || "")
                            .toLowerCase()
                            .includes(filter)

                        ||

                        (message.email || "")
                            .toLowerCase()
                            .includes(filter)

                        ||

                        (message.subject || "")
                            .toLowerCase()
                            .includes(filter)

                    );

                }
            );


        displayMessages(
            filteredMessages
        );

    }
);



// ======================================
// GET INITIALS
// ======================================

function getInitials(name) {

    if (!name) {

        return "?";

    }


    return name
        .trim()
        .split(/\s+/)
        .map(
            function(word) {

                return word.charAt(0);

            }
        )
        .join("")
        .substring(0, 2)
        .toUpperCase();

}



// ======================================
// FORMAT DATE
// ======================================

function formatDate(dateString) {

    if (!dateString) {

        return "";

    }


    const date =
        new Date(dateString);


    if (isNaN(date)) {

        return dateString;

    }


    return date.toLocaleDateString(
        "en-GB",
        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }
    );

}



// ======================================
// STATUS CLASS
// ======================================

function getStatusClass(status) {

    if (!status) {

        return "unread";

    }


    if (
        status.toUpperCase() === "READ"
    ) {

        return "read";

    }


    return "unread";

}



// ======================================
// LOAD MESSAGES
// ======================================

loadMessages();


// ======================================
// PAGE LOADED
// ======================================

console.log(
    "Messages Page Loaded Successfully"
);