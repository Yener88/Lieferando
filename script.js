async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

let basket = [];

function render() {
    let card = document.getElementById('card');
    card.innerHTML = '';
    for (let i = 0; i < dishes.length; i++) {
        const food = dishes[i];
        card.innerHTML += /*html*/`
         <div class="menuCard">
             <div class="dishesname">${food['name']}</div>
               <div class="description">${food['description']}</div>
               <div class="price">${food['price'].toFixed(2).replace(".", ",")}&nbsp;€</div>
                    <div class="image"><img class="dishespicture" src="${food['image']}"></div>
                    <div onclick="addToBasket(${i})" id="amountforshow"><i class="atbPlus">+</i></div>
                </div>
            </div>
        `;
    }
}


//  SORTIER FUNKTION  ##################
// function render() {
//     let foods = menue.filter(d => d.type === 'salad');
//     for (i = 0; i < 3; i++) {
//         let card = document.getElementById('favourites');
//         const food = dishes[i];
//         card.innerHTML += /*html*/`
//          <div class="menuCard">
//              <div class="dishesname">${food['name']}</div>
//                <div class="description">${food['description']}</div>
//                <div class="price">${food['price'].toFixed(2).replace(".", ",")}&nbsp;€</div>
//                     <div class="image"><img class="dishespicture" src="${food['image']}"></div>
//                     <div onclick="addToBasket(${i})" id="amountforshow"><i class="atbPlus">+</i></div>
//                 </div>
//             </div>
//         `;
//     }

//     for (i = 0; i < sort.length; i++) {
//         document.getElementById('salads').innerHTML += /*html*/`
//         <div class="menuCard">
//             <div class="dishesname">${food['name']}</div>
//               <div class="description">${food['description']}</div>
//               <div class="price">${food['price'].toFixed(2).replace(".", ",")}&nbsp;€</div>
//                    <div class="image"><img class="dishespicture" src="${food['image']}"></div>
//                    <div onclick="addToBasket(${i})" id="amountforshow"><i class="atbPlus">+</i></div>
//                </div>
//            </div>
//        `;
//     }
//     sort = menue.filter(d => d.type === 'pizza');
//     for (i = 0; i < sort.length; i++) {
//         document.getElementById('pizza').innerHTML += /*html*/`
//         <div class="menuCard">
//             <div class="dishesname">${food['name']}</div>
//               <div class="description">${food['description']}</div>
//               <div class="price">${food['price'].toFixed(2).replace(".", ",")}&nbsp;€</div>
//                    <div class="image"><img class="dishespicture" src="${food['image']}"></div>
//                    <div onclick="addToBasket(${i})" id="amountforshow"><i class="atbPlus">+</i></div>
//                </div>
//            </div>
//        `;
//     }

// }


function renderBasket() {
    let basket = document.getElementById('basket');
    basket.innerHTML = '';
    basket.innerHTML += /*html*/`           
        <img class="basketheader2img" src="img/iconwarenkorb.png">
        <p class="bh2title1"><b>Fülle deinen Warenkorb</b></p>
        <p class="bh2title2">Füge einige leckere
                        Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
        <div class="x2" onclick="closeBasket()">x</div>  
   `;
}

function renderFilledBasket() {
    let basketIndex = document.getElementById('basket')
    basketIndex.innerHTML = '';
    if (basket.length >= 1) {
        for (let i = 0; i < basket.length; i++) {
            let basketContent = basket[i];
            basketIndex.innerHTML += /*html*/`
        
                <div class="basketContent">
                    <div class="btnposition1">
                        <div class="basketDescription">
                            <b class="basketname">${basketContent['amount']}&ensp;&ensp;&ensp;${basketContent['name']}</b>
                        </div>

                        <div class="basketDescription">${basketContent['endsum'].toFixed(2).replace(".", ",")}&nbsp;€</div>
                    </div>
                    <!-- <div class="btnposition2">
                        <span onclick="inputButton()">Anmerkung hinzufügen</span>
                        <div class="inputDisplay" id="inputDisplay${basketContent[i]}">
                            <input class="inputMessage" type="text" id="inputMessage${basketContent[i]}" required minlength="3" maxlength="22" placeholder="Hier hinzufügen!">
                            </div> -->
                            <div class="btnposition22">
                        <div class="basketButton1" onclick="deleteBasket(${i})">-</div>&ensp;
                        <div class="basketButton2" onclick="addToInnerBasket(${i})">+</div>
                        </div>    
                    <!-- </div> -->
                </div>
            `;
        }
        payButtonExtra();
    } else {
        renderBasket();
    }
}
//  ANMERKUNG IM BASKET  ##################
// function inputButton(i) {
//     document.getElementById('inputDisplay' + i).classList.toggle('d-none');
// }
// function addMessage(i) {
//     let input = document.getElementById('inputMessage' + i).value;

//     let x = basketContent.indexOf(dishes[i]);
//     messageArray.splice(x, 1, input);

//     document.getElementById('inputDisplay' + i).classList.toggle('d-none');
//     renderFilledBasket();
// }

//  ANZAHL IM GERICHT SOLL MIT ZÄHLEN  ##################

// function amountShowing() {
//     let amounts = document.getElementById('amountforshow')
//     if (basket.length >= 1) {
//         for (let i = 0; i < basket.length; i++) {
//             amounts.innerHTML += /*html*/`
//             <i class="atbPlusamount">${amounts[i]['amount']}</i>
//             `;
//         } else {
//                 amounts.innerHTML += /*html*/`
//                 <i class="atbPlus">+</i>
//                 `;
//             }
//     }
// }

function payButtonExtra() {

    let payB = document.getElementById('paybuttonextra')
    payB.innerHTML = '';
    if (basket.length > 0) {
        payB.innerHTML += /*html*/`
            <div id="sumBetween"></div>
            <div class="pay">
            <button onclick="overflowAuto()" id="totale" class="payButton"></button>
            </div>
            `;
    } else {
        renderBasket();
    }
}

function addToInnerBasket(i) {
    basket[i].amount++;
    basket[i].endsum += basket[i].price;
    renderFilledBasket();
    calc();
}

function addToBasket(i) {
    let x = basket.indexOf(dishes[i])
    if (basket.includes(dishes[i])) {
        basket[x].amount++;
        basket[x].endsum += basket[x].price;
        renderFilledBasket();
    } else {
        basket.push(dishes[i]);
        renderFilledBasket();
    }
    calc();
}

function deleteBasket(i) {
    if (basket[i].amount <= 1) {
        basket.splice(i, 1);
        renderFilledBasket();
        payButtonExtra();
    } else {
        basket[i].amount--;
        basket[i].endsum -= basket[i].price;
        renderFilledBasket();
        payButtonExtra();
    }
    document.getElementById('responsivePay').innerHTML = `
    Warenkorb
    `;
    calc();
}

function calc() {
    let sum = 1;
    let sum2 = 0;
    for (let i = 0; i < basket.length; i++) {
        sum += basket[i].price * basket[i].amount;
        sum2 += basket[i].price * basket[i].amount;
    }

    document.getElementById('totale').innerHTML += `
    Bezahlen ( ${sum.toFixed(2).replace(".", ",")} € )
    `;
    document.getElementById('sumBetween').innerHTML += /*html*/`
    <div class="paybtn"><div>Zwischensumme</div><div> ${sum2.toFixed(2).replace(".", ",")}&nbsp;€</div></div>
    <div class="paybtn"><div>Lieferkosten</div><div>1.00&nbsp;€</div></div>
    <div class="paybtn"><div><b>Gesamt</b> </div><div><b>${sum.toFixed(2).replace(".", ",")}&nbsp;€</b></div></div>
    <div class="x" onclick="closeBasket()">x</div>
    `;
    document.getElementById('responsivePay').innerHTML = `
    Bezahlen ( ${sum.toFixed(2).toString().replace(".", ",")} € )
    `;
}

function responsiveBasket() {
    let mobileBasket = document.getElementById('rightDiv');
    mobileBasket.classList.remove('basket');
    document.getElementById('bodyFlow').style.overflow = 'hidden';
}

function closeBasket() {
    let mobileBasket = document.getElementById('rightDiv');
    mobileBasket.classList.add('basket');
    document.getElementById('bodyFlow').style.overflow = 'auto';

}

function overflowAuto() {
    let mobileBasket = document.getElementById('rightDiv');
    mobileBasket.classList.add('basket');
    document.getElementById('bodyFlow').style.overflow = 'hidden';
}