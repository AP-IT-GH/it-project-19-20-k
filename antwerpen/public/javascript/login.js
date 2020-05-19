function message(e){
    e.preventDefault();
    let myForm = new FormData(e.target);
    let username = myForm.get('username');
    let element = document.getElementById("welkomBericht").innerHTML = "Welkom terug " + username +" !";
    document.getElementById('topAanmelden').style.display="none";
}
document.getElementById("loginFormActief").addEventListener("submit", message);

