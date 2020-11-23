// import modules
import {actions} from './animation.js';
import {foods} from './food.js';


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
    console.log(foods);
    foodBox.innerHTML = foods;
    addToCart();
}

window.addEventListener('load',function (){
    insertsFoods(foods)
    actions();
},false);