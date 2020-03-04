let modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function message(e){
e.preventDefault();
let formData = new FormData(e.target);
let name = formData.get('userName')
let element = document.getElementById("welkomBericht").textContent = "welkom" + name;
}

document.getElementById("loginFormActief").addEventListener("submit",message());
