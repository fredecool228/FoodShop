function getParent(child){
    while(child = child.parentNode){
        if(child.className === 'food' ||child.classList.contains('selection')){
            return child;
            break;
        }
    }
}

function toogleBox(boxe, type = 'visible'){
    const box = document.querySelector(`.${boxe}`);
    if(type == 'visible'){
        if(!box.classList.contains('visibled')){
            box.classList.remove('hidden');
            box.classList.add('visibled');
        }
    } else{
        if(!box.classList.contains('hidden')){
            box.classList.remove('visibled');
        }   box.classList.add('hidden'); 
    }
}

function toogleModifForm(formType, modif, insert){
    const type = formType;
    const modifForm = document.querySelector('.'+modif)
    const insertForm = document.querySelector('.'+insert);
    if(type === 'modif'){
        if(!modifForm.classList.contains('visibled')){
            insertForm.classList.remove('visibled');
            insertForm.classList.add('hidden');
            modifForm.classList.remove('hidden');
            modifForm.classList.add('visibled');
        }
    }
    else if(type === 'insert'){
        if(!insertForm.classList.contains('visibled')){
            insertForm.classList.remove('hidden');
            insertForm.classList.add('visibled');
            modifForm.classList.remove('visibled');
            modifForm.classList.add('hidden');
        }
    }
}

export {getParent, toogleBox, toogleModifForm}