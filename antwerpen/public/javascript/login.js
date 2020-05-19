function message(e){
    e.preventDefault();
    let myList = document.getElementById('loginFormActief');
    let myForm = new FormData(myList);
    let username = myForm.get('userName');
    let element = document.getElementById("welkomBericht").innerHTML = "Welkom terug " + username +" !";
    document.getElementById('topAanmelden').style.display="none";
}
document.getElementById("loginButton").addEventListener("click", message);

