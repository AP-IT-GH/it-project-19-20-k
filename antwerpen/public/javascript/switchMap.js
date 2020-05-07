let keuzeSwitch;

function showStadOfBuurt() {
    let baklava = document.getElementById('switch1');
    if(baklava.checked){
        keuzeSwitch = 1;
        console.log(keuzeSwitch);
    } else{
        keuzeSwitch = 0;
        console.log(keuzeSwitch);
    }
}