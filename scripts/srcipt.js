// import modules
import {actions, tooglePayement} from './animation.js';
import {foods} from './food.js';
import {check,payementMode, reset} from './payement.js';
import {login, singUp, logOut, displayAll} from './login.js';
import {getParent} from './utilities.js'
window.addEventListener('DOMContentLoaded',function (){
    insertsFoods(foods);
    getFromLocalStorage();
    currenTUserConnected !== null ? displayAll(currenTUserConnected.name) : ''; 
    // initOrder() 
    actions();
    addToOrders()
},false);

function insertsFoods(foodArray){
    let foods = foodArray.map(item =>{
        return`<div id="${item.id}" class="food">
                    <div class="food-image">
                        <img src="${item.image}" alt="">
                    </div>
                    <div class="food-info">
                        <h1 class="food-name">${item.name}</h1>
                        <p class="food-description">${item.note}</p>
                        <h2>Price</h2>
                        <p class="food-price">${item.price} Fcfa</p>
                        <div class="food-level-star">
                        <span class="food-level"><img src="icon_star.svg" alt=""></span>
                        <button type="button" id="add-food">+</button>
                        </div>
                    </div>
                </div>`
    });
    const foodBox = document.querySelector('.foods-box');
    foods = foods.join('');
    foodBox.innerHTML = foods;
    addToCart();
}
let currenTUserConnected = null;
function addToCart(){
        const addButton = document.querySelectorAll('#add-food');
        addButton.forEach(item =>{
            item.addEventListener('click',function (e){
                if (currenTUserConnected != null){
                    const parent = getParent(e.currentTarget);
                    add(parent.id);
                } else{
                    alert('vieillez vous connecter')
                }
            },false);
        })
}

let selectedFood = []

const itemCount = document.querySelector('.item-count')
function add(id){
    const findSelection= selectedFood.filter(item => {
            return item.id == id;    
    });
    if(findSelection.length !== 0){
        findSelection[0].quantiter++;
        const select = document.querySelector(`.t-body`).getElementsByClassName(id);
        const input = select[0].firstElementChild.nextElementSibling.firstElementChild;
        input.value = findSelection[0].quantiter
    } else{
        foods.forEach(item =>{
            if(item.id === id){      
                const selection = new Createselected(item.id, item.image, item.name, item.note, item.price);
                insertSelection(selection); 
                selectedFood.push(selection);
                // localStorage.setItem('selectedFood', JSON.stringify(selectedFood));
                return false;
            }
        }); 
    }
    total();
    itemCount.innerHTML = selectedFood.length;
}


function Createselected (...array){
        this.id = array[0];
        this.image = array[1];
        this.name = array[2];
        this.note = array[3];
        this.price = array[4];
        this.quantiter = 1;
        this.updateQuantiter= function(nombre) {
            this.quantiter = nombre;
    }
    this.clientID = currenTUserConnected.name
}
const myCartTBody = document.querySelector('.t-body');
function insertSelection(element){
    const selected = `<tr class="selection ${element.id}" >
                            <td>
                                <div id="${element.id}" class="order-item">
                                    <div class="order-food-image">
                                        <img src="${element.image}" alt="">
                                    </div>
                                    <div class="order-food-info">
                                        <h1 class="order-food-name">${element.name}</h1>
                                        <p class="order-food-description">${element.note}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <input type="number" name="Quantity" id="quality" min="1" max="4" step="1" value="1">
                            </td>
                            <td>
                                <p class="order-food-price">${element.price}</p>
                            </td>
                            <td>
                                <button type="button" id="remove-order" class="btn-mf">X</button>
                            </td>
                      </tr>`
    myCartTBody.innerHTML += selected;
    modifSlection();
}

function modifSlection(){
    const quantity = document.querySelectorAll('#quality');
    const removeButton = document.querySelectorAll('#remove-order');
    quantity.forEach(item =>{
        item.addEventListener('change',function(e){
            const value = item.value;
            const parent = e.currentTarget.parentElement.previousElementSibling.firstElementChild.id;
            SetQuantity(parent,value)
            total()
        },false);
    })
    removeButton.forEach(item =>{
        item.addEventListener('click',function(e){
            const parent = getParent(this).firstElementChild.firstElementChild.id
            const tr = getParent(this);
            removeSelection(parent);
            myCartTBody.removeChild(tr);
            itemCount.innerHTML = selectedFood.length;
        },false);
    })
}

function SetQuantity(id,value){
    selectedFood.forEach(element =>{
        if(element.id ===id){
            element.updateQuantiter(value);
            return false
        }
    });
}

function removeSelection(id){
    selectedFood.forEach((element, i)=>{
        if(element.id === id){
            selectedFood.splice(selectedFood.indexOf(selectedFood[i]),1);  
        }
    });
    total()
}
const orderTotal = document.querySelector('.order-total');
let totalPrice = 0;
function total(){
    totalPrice = 0;
    selectedFood.forEach(item =>{
       const findTotal = item.price * item.quantiter;
       totalPrice += findTotal; 
    });
    orderTotal.innerHTML = totalPrice;
}

function NewOrder(ordersInfo, orderItems, total){
    this.userID = currenTUserConnected['id'];
    this.commandeID = `00${JSON.parse(localStorage.getItem('users'))
    [currenTUserConnected.place].userOrders.length +1}`;
    this.ordersInfo = ordersInfo;
    this.orderItems = orderItems;
    this.total = total;
    this.status = 'Confirmation ...';
    this.message = 'Les repas sont delicieux';
    this.statusChange = function (status){
        this.status = status;
    };
    this.sendMessage = function(message){
        this.message = message;
    }
}
function addToLocalStorage(currenTUserConnected = null){
    localStorage.setItem('currenTUserConnected', JSON.stringify(currenTUserConnected));
}

function getFromLocalStorage(){
    const reference = localStorage.getItem('currenTUserConnected');
    const reference1 = localStorage.getItem('selectedFood');
    reference ? currenTUserConnected = JSON.parse(reference) :''; 
    // reference1 ? selectedFood = JSON.parse(reference1) :''; 
}

function setOrder(info){
    const alert = document.querySelector('.payement-alert');
    if(typeof info == 'object'){
        alert.innerHTML = '';
        const orders = selectedFood.map(item =>{
            return{
                id : item.id,
                image : item.image,
                name : item.name,
                note : item.note,
                quantity: item.quantiter
            }
        });
        const users = JSON.parse(localStorage.getItem('users'));
        const newOrder = new NewOrder(info, orders, totalPrice);
        users[currenTUserConnected.place].userOrders.push(newOrder);
        localStorage.setItem('users', JSON.stringify(users));
        const visibled = document.querySelectorAll('.visibled');
        for (const element of visibled) {
            !element.classList.contains('user') && !element.classList.contains('dashbord') ? 
            element.classList.remove('visibled') : '';
        }
        reset(myCartTBody, itemCount, orderTotal);
    } else{
        alert.innerHTML = info;
    };
}

function addToOrders(){
    const users = JSON.parse(localStorage.getItem('users'));
    const currentUser = JSON.parse(localStorage.getItem('currenTUserConnected'));
    if(currentUser){
        const findUserOrder = users[currentUser['place']]['userOrders'];
         let newcommande = findUserOrder.map(item =>{
             const name = item.ordersInfo.name, 
                   number = item.ordersInfo.number, 
                   address = item.ordersInfo.address, 
                   payement = item.ordersInfo.payement;
            return `<div id="order-1" class="order-1 order">
                            <div class="order-1-info info-contener">
                                <p class="user-name">${name}</p>
                                <p class="user-phone">${number}</p>
                                <p class="user-address">${address}</p>
                                <p>payement : <span class="user-bank">${payement}</span></p>
                            </div>
                            <div class="order-1-foods info-contener">
                                ${
                                    item.orderItems.map(item =>{
                                        return `<div class="order-1-food-1 order-item">
                                                        <div class="order-food-image">
                                                        <img src="${item.image}" alt="">
                                                        </div>
                                                        <div class="order-food-info">
                                                            <h1 class="order-food-name">${item.name}</h1>
                                                            <p class="order-food-description">${item.note}</p>
                                                        </div>
                                                        <div class="quantite">
                                                            ${item.quantity}
                                                        </div>
                                                </div>`
                                    }).join('')
                                }
                            </div>
                            <div class="order-1-total info-contener">
                                <p><span class="tolal">${item.total}</span> Fcfa</p>
                            </div>
                            <div class="order-1-status info-contener">
                                <button id="order-status" class="btn_confirm">${item.status}</button>
                            </div>
                        </div>`
        });
        newcommande = newcommande.reverse().join('');
        const orderBox = document.querySelector('.orders-box');
        orderBox.innerHTML = newcommande;
    }
}

function initOrder(){
    let verif = false;
    selectedFood.forEach(item =>{
        if(currenTUserConnected !=null && item.clientID == currenTUserConnected.name){
            verif = true;
            insertSelection(item);
            item.updateQuantiter= function(nombre) {
                this.quantiter = nombre;
            };  
        }      
    });
    if(verif == true){
        itemCount.innerHTML = selectedFood.length;
        total()
    }
}
// Gestion des payement
const payementButton = document.querySelector('.payement');
    payementButton.addEventListener('click',function(){
        const total = document.querySelector('.total-price');
        total.innerHTML = totalPrice;
        tooglePayement();
    },false);
const setOrderButton = document.querySelector('#commander');
setOrderButton.addEventListener('click',function(e){
    e.preventDefault()
    const info = check(payementMode);
    setOrder(info);
    selectedFood = [];
    localStorage.setItem('selectedFood', JSON.stringify(selectedFood));
    addToOrders();
},false);

// Gestion de la connection
// let currenTUserConnected = null;
const connect = document.querySelector('#connecter');
connect.addEventListener('click',function(e){
    e.preventDefault()
    currenTUserConnected = login();
    addToLocalStorage(currenTUserConnected)
    addToOrders();
},false);

const inscire = document.querySelector('#inscrire');
inscire.addEventListener('click',function(e){
    e.preventDefault()
    currenTUserConnected = singUp();
    addToLocalStorage(currenTUserConnected)
},false);

const disconnect = document.querySelector('#logout');
disconnect.addEventListener('click',function(){
    currenTUserConnected = logOut();
    addToLocalStorage(currenTUserConnected)
    reset(myCartTBody, itemCount, orderTotal);
},false)
