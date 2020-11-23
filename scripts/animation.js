
 function actions() {
    // Affichage des boites(carts, login, order)

const links = document.querySelectorAll('.link');
const overlay = document.querySelector('.overlay');
links.forEach(item =>{
    item.addEventListener('click',function(e){
        if(!item.classList.contains('home')){
            overlay.classList.add('visibled');
            showBox(item.id);
        }
    },false)
});
function showBox(id){
    const box = document.querySelector(`#my-${id}`);
    console.log(`my-${id}`)
    if(box){
        box.classList.add('visibled');
    }
}
overlay.onclick = function(){
    const toggles = document.querySelectorAll('.toggle');
    toggles.forEach(item =>{
        if(item.classList.contains('visibled')){
            item.classList.remove('visibled')
        }
    })
    overlay.classList.remove('visibled');
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
            const newForm = document.querySelector(this.getAttribute('href'));
            newForm.classList.remove('hidden');
            
        }
    },false);
});
}

export {actions}