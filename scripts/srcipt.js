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

function getParent(child){
    while(child = child.parentNode){
        if(child.className === 'food' ){
            return child;
            break;
        }
    }
}

function add(id){
    let selectedFood = [];
    foods.forEach(item =>{
        if(item.id === id){      
            const selection = new Createselected(item.id, item.image, item.name, item.note, item.price);
            insertSelection(selection); 
            selectedFood.push(selection);
            return false;
        }
    }); 
}


function Createselected (...array){
        this.id = array[0];
        this.image = array[1];
        this.name = array[2];
        this.note = array[3];
        this.price = array[4];
        this.quantiter = 1;
        this.updateQuantiter= function(nombre) {
            this.quantiter = this.quantiter + nombre;
    }
}

function insertSelection(element){
    const selected = `<tr>
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

    const myCartTBody = document.querySelector('.t-body');
    myCartTBody.innerHTML += selected;
}