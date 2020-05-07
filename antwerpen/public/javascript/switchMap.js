let keuzeSwitch;

function showStadOfBuurt() {
    let el = document.getElementsByClassName('a-switch__label');
    if(el === 'STADSDEEL'){
        keuzeSwitch = 0;
    } else{
        keuzeSwitch = 1;
    }
}