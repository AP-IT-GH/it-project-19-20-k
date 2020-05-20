//functie om een welkom bericht te tonen aan user
function message(e){
    e.preventDefault();
    let myList = document.getElementById('loginFormActief');
    let myForm = new FormData(myList);
    let username = myForm.get('username');
    let element = document.getElementById("welkomBericht").innerHTML = "Welkom terug " + username +" !";
    console.log(username)
    document.getElementById('topAanmelden').style.display="none";
  }
  document.getElementById("registerbtn").addEventListener("submit", message);
  
  //functie hamburgermenu

  function hamburgerMobile() {
    let getCheckBox = document.getElementById("toggle-normal");
    let getNavMobile = document.getElementById("navMobile");
    
    if (getCheckBox.checked == true){
        getNavMobile.style.display = "block";
    } else {
        getNavMobile.style.display = "none";
    }
  }