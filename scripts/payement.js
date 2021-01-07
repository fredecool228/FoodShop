const banks = document.querySelectorAll('.bank');
let payementMode ;
banks.forEach(item =>{
    item.addEventListener('click',function(){
        if(item.id ==='flooz'){
            payementMode = flooz();
        } else if(item.id ==='t-money'){
            payementMode = tMoney();
        }
    },false)
});

function flooz(){
    //plien de chose a faire
    return 'flooz';
}

function tMoney(){
    //plien de chose a faire
    return 'T-money';
}

function check(payementMode){
    const checkinfo = {};
    checkinfo['name'] = function (){
        const pName = document.querySelector('#p-name');
        const pNameValue = pName.value;
        if(pNameValue != ''){
        pName.className = 'correct';
            return pNameValue;
        }else{
            pName.className = 'incorrect';
        }
    }
    checkinfo['number'] = function (){
        const pName = document.querySelector('#number');
        const pNameValue = pName.value;
        if(pNameValue != ''){
            pName.className = 'correct';
            return pNameValue;
        }else{
            pName.className = 'incorrect';
        }
    }

    checkinfo['address'] = function (){
        const pName = document.querySelector('#address');
        const pNameValue = pName.value;
        if(pNameValue != ''){
            pName.className = 'correct';
            return pNameValue;
        }else{
            pName.className = 'incorrect';
        }
    }
    let infos = [];

    for(let id in checkinfo){
        const verif = checkinfo[id]()
        verif != undefined ? infos.push(verif) :'';
    }

    if(infos.length === 3 && payementMode !=undefined) {
        return {
            name :infos[0],
            number:infos[1],
            address: infos[2],
            payement: payementMode
        }
    }else if(infos.length === 3 && payementMode == undefined){
        return 'Choisir le mode de payement'
    } else {
        return 'Vieillez remplire tous les champs !'
    }
}

function reset(orders, total, itemCount){
    orders.innerHTML = '';
    total.innerHTML= 0;
    itemCount.innerHTML = 0;
}

export {check, payementMode, reset};
