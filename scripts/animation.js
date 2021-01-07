
function actions() {
    // Affichage des boites(carts, login, order)
const links = document.querySelectorAll('.link');
const overlay = document.querySelector('.overlay');
const bodyHeigth = document.querySelector('body').offsetHeight
overlay.style.height = bodyHeigth +'px';
links.forEach(item =>{
    item.addEventListener('click',function(e){
        const active = document.querySelector('.active');
        const activeBox = document.querySelector('#my-'+active.getAttribute('href').slice(1));
        if(!item.classList.contains('.active')){
            active.classList.remove('active');
            activeBox ? activeBox.classList.remove('visibled'):'';
            overlay.classList.remove('visibled');
            this.classList.add('active');
            showBox(item.id);
        }
    },false);
});
const myCart = document.querySelector('.my-cart');
function showBox(id){
    const box = document.querySelector(`#my-${id}`);
    if(box !== null ){
        overlay.classList.add('visibled');
        box.classList.add('visibled');
    }   
}
overlay.onclick = function(){
    const toggles = document.querySelectorAll('.toggle');
    toggles.forEach(item =>{
        if(item.classList.contains('visibled')){
            if(item.classList.contains('payement-box')){
                item.classList.remove('visibled');
                myCart.classList.add('visibled');
            }else{
                item.classList.remove('visibled');
                overlay.classList.remove('visibled');
            };
        }
    });
};

//Formulaire de connection

const logs = document.querySelectorAll('.log');
logs.forEach(item =>{
    item.addEventListener('click',function(e){
        e.preventDefault();
        const activeItem = document.querySelector('.login-box .actived');
        const activeForm = document.querySelector(activeItem.getAttribute('href'));
        if(!item.classList.contains('actived')){
            activeItem.classList.remove('actived');
            this.classList.add('actived');
            activeForm.classList.add('hidden');
            const formInput = activeForm.querySelectorAll('input');
            formInput.forEach(item =>{
                if(item.type == 'text' || item.type =='password'){
                    item.value = '';
                }
            })
            const newForm = document.querySelector(this.getAttribute('href'));
            newForm.classList.remove('hidden');           
        }
    },false);
});
}

function tooglePayement(){
    const myCart = document.querySelector('.my-cart');
    myCart.classList.remove('visibled')
    const payementBox = document.querySelector('.payement-box');
    payementBox.classList.add('visibled');
}

window.addEventListener('scroll',function(e){
    const navBar = document.querySelector('.head');
    const navBarHeigth = navBar.offsetHeight;
    const scroll = window.pageYOffset;
    const hasFixed = navBar.classList.contains('fixed');
    const header = document.querySelector('header')
    if(scroll >= navBarHeigth && !hasFixed){
        navBar.classList.add('fixed');
        const fakeDiv = document.createElement('div');
         fakeDiv.className = 'fake';
         header.insertBefore(fakeDiv, navBar)
    } else if(scroll < navBarHeigth && hasFixed ){
        navBar.classList.remove('fixed');
        header.removeChild(header.firstElementChild);  
    }
    
},false)

export {actions, tooglePayement}