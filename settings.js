// ======================================
// SETTINGS PAGE
// Maha Malik Artwork Studio
// ======================================

const settingsForm = document.getElementById("settingsForm");

settingsForm.addEventListener("submit", function(e){

    e.preventDefault();

    const websiteName = document.getElementById("websiteName").value;

    const ownerName = document.getElementById("ownerName").value;

    const email = document.getElementById("email").value;

    const phone = document.getElementById("phone").value;

    const youtube = document.getElementById("youtube").value;

    const instagram = document.getElementById("instagram").value;

    const facebook = document.getElementById("facebook").value;

    const address = document.getElementById("address").value;

    console.log("Website Name:", websiteName);
    console.log("Owner Name:", ownerName);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("YouTube:", youtube);
    console.log("Instagram:", instagram);
    console.log("Facebook:", facebook);
    console.log("Address:", address);

    alert("Settings saved successfully! (Demo Mode)");

});



// ======================================
// RESET SETTINGS
// ======================================

function resetSettings(){

    if(confirm("Reset all settings?")){

        settingsForm.reset();

        alert("Settings have been reset.");

    }

}



// ======================================
// LOAD SETTINGS
// (Will be replaced with database later)
// ======================================

window.addEventListener("load", function(){

    console.log("Settings Page Loaded");

});



// ======================================
// SIMPLE FIELD VALIDATION
// ======================================

const emailField = document.getElementById("email");

emailField.addEventListener("blur", function(){

    if(emailField.value === ""){

        alert("Email cannot be empty.");

    }

});



// ======================================
// YOUTUBE URL CHECK
// ======================================

const youtubeField = document.getElementById("youtube");

youtubeField.addEventListener("change", function(){

    if(
        youtubeField.value !== "" &&
        !youtubeField.value.includes("youtube.com") &&
        !youtubeField.value.includes("youtu.be")
    ){

        alert("Please enter a valid YouTube URL.");

    }

});



// ======================================
// PAGE READY
// ======================================

console.log("Settings JavaScript Loaded Successfully");