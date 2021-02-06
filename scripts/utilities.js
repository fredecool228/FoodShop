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

function toogleMenues (){
    const manageTabs = document.querySelectorAll('.tab');
    manageTabs.forEach(item =>{
        item.addEventListener('click',function(e){
            e.preventDefault()
            const target = e.currentTarget
            let activeTabLink , activeTab;
            if(!this.classList.contains('init')){
                manageTabs.forEach(item =>{
                    if(item.classList.contains('init')){
                        activeTabLink = item
                        activeTab = findTab(item.getAttribute('href'));
                    }
                });
                activeTabLink.classList.remove('init');
                activeTab.classList.add('fade');
                activeTab.classList.remove('in')
                const transitionend = function(){
                    activeTab.classList.remove('fade');
                    activeTab.classList.remove('visibled')
                    activeTab.classList.add('hidden')

                    target.classList.add('init');
                    const tab = findTab(target.getAttribute('href'));
                    console.log(tab)
                    tab.classList.add('visibled');
                    tab.classList.remove('hidden');
                    tab.classList.add('fade');
                    tab.offsetWidth;
                    tab.classList.add('in');
                    activeTab.removeEventListener('transitionend', transitionend);
                }
                activeTab.addEventListener('transitionend',transitionend,false);
            }
        },false);
    });
}

function findTab (id){
    console.log(id)
    const tab = document.querySelector(id);
    return tab
}

export {getParent, toogleBox, toogleModifForm, toogleMenues}