let stadsdeelFetch = fetch('/stadsdeel')
.then(res => res.json())
.then(stadsdeelData => {
    let stadFeatures = stadsdeelData.features;
    let stadArr = [];
    let stadArrDistinct = [];
    for(let i = 0; i < stadFeatures.length; i++){
        stadArr.push(stadFeatures[i].properties.NAAM);
    }
    stadArrDistinct = stadArr.filter((n, i) => stadArr.indexOf(n) === i);
    showList(stadArrDistinct, 'lijstStadsdeel');
});

//API buurt-gebruiksgroen
let buurtFetch = fetch('/buurt')
.then(res => res.json())
.then(buurtData => {
    let buurtFeatures = buurtData.features;
    let buurtArr = [];
    let buurtArrDistinct = [];
    for(let i = 0; i < buurtFeatures.length; i++){
        buurtArr.push(buurtFeatures[i].properties.NAAM);
    }
    buurtArrDistinct = buurtArr.filter((n, i) => buurtArr.indexOf(n) === i);
    showList(buurtArrDistinct, 'lijstBuurt');
});


function showList(giveArray, id) {
    let list = document.getElementById(id); 
    giveArray.forEach(stadsdeel => {
        let listElement = document.createElement('li');
        listElement.textContent = stadsdeel;
        list.appendChild(listElement);
    });
}

function showDiv() {
    let x = document.getElementById('lijstAPI');
    if(x.style.display === 'block'){
        x.style.display = 'none';
    } else{
        x.style.display = 'block';
    }
 }