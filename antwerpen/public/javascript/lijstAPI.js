let stadsdeelFetch = fetch('/stadsdeel')
.then(res => res.json())
.then(stadsdeelData => {
    let stadFeatures = stadsdeelData.features;
    let stadArr = [];
    for(let i = 0; i < stadFeatures.length; i++){
        stadArr.push(stadFeatures[i].properties.NAAM);
    }
    showList(stadArr);
});




//API buurt-gebruiksgroen
let buurtFetch = fetch('/buurt')
.then(res => res.json())
.then(buurtData => {
    let buurtFeatures = buurtData.features;
    let buurtArr = [];
    for(let i = 0; i < buurtFeatures.length; i++){
        buurtArr.push(buurtFeatures[i].properties.NAAM);
    }
    showList(buurtArr);
});


function showList(giveArray) {
    let list = document.getElementById("lijstAPI"); 
    giveArray.forEach(stadsdeel => {
        let listElement = document.createElement("li");
        listElement.textContent = stadsdeel;
        list.appendChild(listElement);
    });
}