// import modules
import {actions} from './animation.js';
import {foods} from './food.js';

window.addEventListener('load',function (){
    insertsFoods(foods)
    actions();
},false);

const foodBox = document.querySelector('.foods-box');
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
    foods = foods.join('');
    foodBox.innerHTML = foods;
    addToCart();
}

function addToCart(){
    const addButton = document.querySelectorAll('#add-food');
    addButton.forEach(item =>{
        item.addEventListener('click',function (e){
            const parent = getParent(e.currentTarget);
            add(parent.id);
        },false);
    })
}

let selectedFood = [];
const itemCount = document.querySelector('.item-count')
function add(id){
    const findSelection= selectedFood.filter(item => {
        if(item.id ===id){
            return item;
        }
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
                                <button type="button" id="remove-order">X</button>
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

function total(){
    let total = 0;
    selectedFood.forEach(item =>{
       const prixTotal = item.price * item.quantiter;
       total +=prixTotal
    });
    const orderTotal = document.querySelector('.order-total');
            orderTotal.innerHTML = total;
}

function getParent(child){
    while(child = child.parentNode){
        if(child.className === 'food' ||child.classList.contains('selection')){
            return child;
            break;
        }
    }
}

