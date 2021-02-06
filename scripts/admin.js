import {getParent, toogleBox, toogleModifForm, toogleMenues} from './utilities.js'
toogleMenues ()
const foods = JSON.parse(localStorage.getItem('foods'));
let users;
    users= JSON.parse(localStorage.getItem('users'));
const foodsCount = document.querySelector('.foodscount');
      foodsCount.innerHTML = foods.length
const orderCount = document.querySelector('.ordercount');
let totalOrders = 0;
users.forEach(element => {
     totalOrders += element.userOrders.length;
});

orderCount.innerHTML = totalOrders;

let totalComment = 0
const commentCount = document.querySelector('.commentcount');
users.forEach(element => {
    element.userOrders.forEach(item =>{
        item['message'] != "" ? totalComment++ : '';
    });
});

    commentCount.innerHTML = totalComment;

function listFood (foodArray){
    let foods = foodArray.map(element =>{
        return `<div class="selection f-flex" id="${element.id}">
                                    <div>
                                        <div id="${element.id}" class="order-item">
                                            <div class="order-food-image">
                                                <img src="${element.image}" alt="">
                                            </div>
                                            <div class="order-food-info">
                                                <h1 class="order-food-name">${element.name}</h1>
                                                <p class="order-food-description">${element.note}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="order-food-price">${element.price}</p>
                                    </div>
                              </div>`
    });

    foods = foods.join('')
    const table = document.querySelector('.all-foods');
    table.innerHTML = foods;
}

function viewsOrders(){
    const users = JSON.parse(localStorage.getItem('users'));
    let newcommande = []
    users.forEach(element =>{
        let commande = element.userOrders.map(item =>{
            return `<div id="order-1" class="order-1 order">
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
                    </div> `
        });
        newcommande.push(commande);
    });

        newcommande = newcommande.reverse().join('');
        const orderBox = document.querySelector('.all-orders');
        orderBox.innerHTML = newcommande;
}

viewsOrders()

listFood(foods);

function viewComments(){
    const users = JSON.parse(localStorage.getItem('users'));
    const allComments = document.querySelector('.all-comments');
    users.forEach(element =>{
        const commentProfile = element.userLogin.name[0].toUpperCase();
        const message = element.userOrders.map(item =>{
            if(item.message != ''){
                return`<div class="comment-info">
                            <div class="profil">
                                ${commentProfile}
                            </div>
                            <div class="comment">
                                <p>
                                ${item.message}
                                </p>
                            </div>
                        </div>`
            }
        }).join('');
        allComments.innerHTML += message
    });
}

viewComments();
function viewFoods(){
    const foods = JSON.parse(localStorage.getItem('foods'))
    const food = foods.map(element =>{
        return`<tr class="selection ${element.id}" >
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
                            <p class="order-food-price">${element.price}</p>
                        </td>
                        <td>
                            <button type="button" id="modif-order"  class="btn-mf btn-mf-food">M</button>
                            <button type="button" id="remove-order" class="btn-mf btn-mf-food">X</button>
                        </td>
                </tr>`
    }).join('');

    const tbody = document.querySelector('.listfoods tbody');
    tbody.innerHTML = food;
    manageFoods('foodmanhead', 'foods','updatefood','insertfood','btn-mf-food')
}
viewFoods();

function manageFoods(...arg){
    const buttons = document.querySelectorAll('.'+arg[4]);
    for(let value of buttons){
        value.addEventListener('click',function(){
            if(this.id == 'modif-order' || this.id == 'modif'){
                toogleBox(arg[0]);
                toogleModifForm('modif', arg[2], arg[3]);
                const parent = arg[0] == 'foodmanhead' ? getParent(this).firstElementChild.firstElementChild.id:
                               getParent(this).id;                               
                const modifiedFood = findFood(parent, arg[1]);
                localStorage.setItem('modifItemPlace', JSON.stringify(modifiedFood['place']));
                let properties;
                if(arg[1] == 'foods'){
                    properties = [modifiedFood['item'].name, modifiedFood['item'].note,
                                  modifiedFood['item'].price, foodsModifInputs, arg[1]]
                }else{
                    properties = [modifiedFood['item']['userLogin'].name, modifiedFood['item']['userLogin'].password,
                                  modifiedFood['item']['userLogin'].password, usersModifInputs,arg[1]]
                }         
                initInput(properties)
            } else{
                const foodBox = arg[1] == 'foods'? document.querySelector('.listfoods .t-body') :
                                                   document.querySelector('.user-box'); 
                const parent = arg[0] == 'foodmanhead' ? getParent(this).firstElementChild.firstElementChild.id:
                                                         getParent(this).id;  
                const tr = getParent(this);          
                removeSelection(parent , arg[1]);
                foodBox.removeChild(tr);
            }
        },false);
    }   
}

function removeSelection(id, database){
    const modifItemPlace = null
    localStorage.setItem('modifItemPlace', JSON.stringify(modifItemPlace));
    const data = JSON.parse(localStorage.getItem(database));
    data.forEach((element, i)=>{
        if(element.id == id){
            data.splice(i,1);  
        }
    });
    if(database == 'foods'){
        foodsCount.innerHTML = foods.length
        listFood(foods)
    }
    let updateDatabaseLength = JSON.parse(localStorage.getItem(`${database}Length`));
          updateDatabaseLength --
    localStorage.setItem(`${database}Length`, JSON.stringify(updateDatabaseLength));
    localStorage.setItem(database, JSON.stringify(data));
}


function findFood(id , table){
    const datas = JSON.parse(localStorage.getItem(table));
    let  findingFood; 
    for(let value of datas){  
        if(value.id == id){
            findingFood = {
               item : value,
               place: datas.indexOf(value),
            };
        }
    }
    return findingFood;
}
const foodsModifInputs = [document.querySelector('#m-food-name'),document.querySelector('#m-food-note'),
                           document.querySelector('#m-food-price'),document.querySelector('#m-food-image')]
const usersModifInputs = [document.querySelector('#update-username'),document.querySelector('#update-password'),
                          document.querySelector('#update-repassword')]
function initInput(args){
    args[3][0].value =  args[0]!= "" ? args[0]: args[3][0].value;  
    args[3][1].value = args[1]!= "" ? args[1] : args[3][1].value;
    args[3][2].value = args[2]!= "" ? args[2]: args[3][2].value;
}

function update(itemArray, itemPlace ,type = 'none'){
    const table = JSON.parse(localStorage.getItem(itemArray));
    if(itemArray == 'foods'){ 
        const updateInputs =  foodsModifInputs;  
        table[itemPlace].name = updateInputs[0].value;
        table[itemPlace].note = updateInputs[1].value;
        table[itemPlace].price = updateInputs[2].value;
        table[itemPlace].image = updateInputs[3].value != ''?
        `images/${updateInputs[3].value.split('\\')[2]}`: table[itemPlace].image ;
        updateInputs[0].value = "";
        updateInputs[1].value= "";
        updateInputs[2].value = "";
        updateInputs[3].value = "";
        
        localStorage.setItem(itemArray, JSON.stringify(table))
        viewFoods() 
        listFood(table); 
        
        itemPlace = null
        localStorage.setItem('modifItemPlace', JSON.stringify(itemPlace));
    }      
}

function addNew(itemArray, type = 'none'){
    const table = JSON.parse(localStorage.getItem(itemArray));
    if(type =='food'){
        const insertFoodName = document.querySelector('#foodname');
        const insertFoodNote = document.querySelector('#foodnote');
        const insertFoodPrice = document.querySelector('#foodprice');
        const insertFoodImage = document.querySelector('#foodimage');
        const id = (table.length + 1)+'-food';
        const newFood = new NewFood(id, insertFoodName.value, insertFoodPrice.value,
                                    insertFoodNote.value, insertFoodImage.value);
        table.push(newFood);
              insertFoodName.value = '';
              insertFoodNote.value = '';
              insertFoodPrice.value = '';
              insertFoodImage.value = '';
        foodsCount.innerHTML = table.length;

        localStorage.setItem(itemArray, JSON.stringify(table));

        listFood(table)
        viewFoods()
    }

}

function manageOrdes(){
    const users = JSON.parse(localStorage.getItem('users'));
    let newcommande = []
    users.forEach(element =>{
        let commande = element.userOrders.map(item =>{
            const  name     = item.ordersInfo.name, 
                   number   = item.ordersInfo.number, 
                   address  = item.ordersInfo.address, 
                   payement = item.ordersInfo.payement;
            return `<div id="${item.commandeID}" class="order-1 order selection" data-user="${item.userID}">
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
                    </div> `
        });
        newcommande.push(commande);
    });

        newcommande = newcommande.reverse().join('');
        const orderBox = document.querySelector('.list-orders-contener');
        orderBox.innerHTML = newcommande;
        manage()
}

manageOrdes();

function NewFood(...array){
    this.name = array[1];
    this.price = array[2];
    this.note = array[3];
    this.image = array[4];
    this.id = array[0];
}

function manage(){
    const confirmBtn = document.querySelectorAll('.btn_confirm');
    confirmBtn.forEach(element =>{
        element.addEventListener('click',function(e){
            if(this.innerHTML === 'Confirmation ...'){
                const newStatus = 'En cours de livraison';
                this.innerHTML = newStatus;
                this.style.backgroundColor = 'yellow';
                const commande = getParent(this);
                const commandeInfo = {
                    user : commande.getAttribute('data-user')-1,
                    id   : commande.id
                }
                changeStatus(commandeInfo, newStatus)
            }else if(this.innerHTML == 'En cours de livraison'){
                const newStatus = 'livre';
                this.innerHTML = newStatus;
                this.style.backgroundColor = 'green';
                this.style.padding = '8px 30px';
                const commande = getParent(this);
                const commandeInfo = {
                    user : commande.getAttribute('data-user')-1,
                    id   : commande.id
                }
                changeStatus(commandeInfo, newStatus)
            } 
        },false)
    })
}

function changeStatus(element, status){
    const users = JSON.parse(localStorage.getItem('users'));
    const orders = users[element.user].userOrders;
   for(let item of orders){
       if(item.commandeID = element.id){
           item.status = status;
           break;
       }
   }
   localStorage.setItem('users', JSON.stringify(users));
}
const manageaccount = manageFoods;
function viewUsers(){
    const users = JSON.parse(localStorage.getItem('users'));
    const usersBox = document.querySelector('.user-box')
    const allUsers = users.map(item =>{
        return`<div id='${item.id}' class="user-info selection">
                    <div class='user-name'>${item.userLogin.name}</div>
                    <div class= 'manage-button'>
                        <button id='modif' class="btn-mf btn-mf-user">modif</button>
                        <button id='new-user' class="btn-mf btn-mf-user">X</button>
                    </div>
                </div>`
    }).join('');
    usersBox.innerHTML = allUsers;
    manageaccount('account-man-head','users', 'update-account', 'insert-account','btn-mf-user')   
}


viewUsers();

const closeBtn = document.querySelectorAll('.btn-close');
      closeBtn.forEach(element =>{
        element.addEventListener('click',function(){
            if(this.classList.contains('close')){
                toogleBox('account-man-head','hidden');
            } else{
                toogleBox('foodmanhead','hidden'); 
            }
        },false)
      })

const addFoodButton = document.querySelector('.add')
addFoodButton.addEventListener('click',function(){
    addNew('foods', 'food')
},false);

const updateFoodButton = document.querySelector('#updatefood');
updateFoodButton.addEventListener('click',function(){
    const modifItemPlace = JSON.parse(localStorage.getItem('modifItemPlace'));
    if(modifItemPlace != undefined || modifItemPlace != null){
        update('foods', modifItemPlace);
    }
    toogleBox('foodmanhead','hidden');
},false);

const addAccountbtn = document.querySelector('#create-account');
addAccountbtn.addEventListener('click',function(){
    toogleBox('account-man-head');
},false)