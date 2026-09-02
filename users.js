// ======================================
// USERS PAGE
// Maha Malik Artwork Studio
// ======================================


// ======================================
// SEARCH USERS
// ======================================

const searchBox = document.getElementById("searchUser");

searchBox.addEventListener("keyup", function () {

    let filter = searchBox.value.toLowerCase();

    let rows = document.querySelectorAll("#userTable tr");

    rows.forEach(function(row){

        let text = row.innerText.toLowerCase();

        if(text.includes(filter)){

            row.style.display = "";

        }

        else{

            row.style.display = "none";

        }

    });

});



// ======================================
// VIEW USER
// ======================================

document.querySelectorAll(".view").forEach(function(button){

    button.addEventListener("click", function(){

        let row = this.parentElement.parentElement;

        let data = row.querySelectorAll("td");

        alert(

"User ID : " + data[0].innerText +

"\nName : " + data[1].innerText +

"\nEmail : " + data[2].innerText +

"\nRole : " + data[3].innerText +

"\nStatus : " + data[4].innerText

        );

    });

});



// ======================================
// DELETE USER
// ======================================

document.querySelectorAll(".delete").forEach(function(button){

    button.addEventListener("click", function(){

        let confirmDelete = confirm("Are you sure you want to delete this user?");

        if(confirmDelete){

            this.parentElement.parentElement.remove();

            updateUserCount();

        }

    });

});



// ======================================
// USER COUNT
// ======================================

function updateUserCount(){

    let rows = document.querySelectorAll("#userTable tr");

    console.log("Total Users : " + rows.length);

}

updateUserCount();



// ======================================
// PAGE LOADED
// ======================================

console.log("Users Page Loaded Successfully");