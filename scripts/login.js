import {AddUser} from './users.js';

function checkSingUp(){
    const checkinfo = {};
    checkinfo['name'] = function (){
        const pName = document.querySelector('#user-name');
        const pNameValue = pName.value;
        if(pNameValue != ''){
        pName.className = 'correct';
            return pName;
        }else{
            pName.className = 'incorrect';
        }
    }
    checkinfo['password'] = function (){
        const pName = document.querySelector('#user-password');
        const pNameValue = pName.value;
        if(pNameValue != ''){
        pName.className = 'correct';
            return pName;
        }else{
            pName.className = 'incorrect';
        }
    }

    checkinfo['verifPass'] = function (){
        const password = document.querySelector('#user-password');
        const pName = document.querySelector('#verif-password');
        const pNameValue = pName.value;
        if(pNameValue == password.value){
            pName.className = 'correct';
            return {
                status : true,
                parent : pName
            };
        }else{
            pName.className = 'incorrect';
            return {
                status : false,
            };        
        }
    }
    let infos = [];

    for(let id in checkinfo){
        const verif = checkinfo[id]()
        verif != undefined ? infos.push(verif) :'';
    }
    return infos
}

function login(){
    const users = JSON.parse(localStorage.getItem('users'));
    const name = document.querySelector('#name');
    const userName = name.value;
    const password = document.querySelector('#password')
    const userPassword =  password.value;
    const status = document.querySelector('.status'); 
    if(userName != '' && userPassword !=''){
        name.classname = 'correct';
        password.className= 'correct';
        let userId ;
        // users.forEach((element, i) =>
        for (const element of users){
            const loginName = element.userLogin.name;
            const loginPassword = element.userLogin.password;
            if(loginName === userName &&  loginPassword === userPassword){
                status.innerHTML =''
                userId =  {
                    id : element.id,
                    name : element.userLogin.name,
                    place : users.indexOf(element)
                }
                displayAll(userId.name);
                name.value ='';
                password.value = '';
                name.className = '';
                password.className = '';
                break;
            } else if(loginName === userName &&  loginPassword != userPassword){
                name.className = 'correct';
                password.className = 'incorrect';
                status.innerHTML ='Mots de passe non identique';

                userId = null;
                break;
            } else{
                name.className = 'incorrect';
                password.className = 'incorrect';
                status.innerHTML ="Cette compte n'existe pas, sing Up";
                userId = null
            }
        };

        return userId; 
    } else {
        status.innerHTML ="Veillez remplire tous les champs";

        return null
    }
}
function singUp(){
    const userInfo = checkSingUp();
    const userName =  userInfo[0].value ;
    const userPassword = userInfo[1].value;
    let userId;
    if(userInfo[2].status === true){
        const users = JSON.parse(localStorage.getItem('users'));
        const id = users.length + 1;
        users.push(new AddUser(userName, userPassword, id));
         userId = {
            id : users[id-1].id,
            name : users[id-1].userLogin.name,
            place : id-1
        };
        localStorage.setItem('users', JSON.stringify(users));
        userInfo[0].value = '';
        userInfo[1].value = '';
        userInfo[2].parent.value =''
        userInfo[0].className = '';
        userInfo[1].className = '';
        userInfo[2].parent.className ='';
        displayAll(userId.name);
        return userId;
    }
    
}

function displayAll(user){
    const visibledElements = document.querySelectorAll('.visibled');
    const userloging = document.querySelector('.user');
    const userlogingLink = document.querySelector('.current-user');
    const login = document.querySelector('.logform');
    visibledElements.forEach(item =>{
        item.classList.remove('visibled');
    });
    login.classList.add('hidden');
    userlogingLink.innerHTML = user
    userloging.classList.add('visibled');
    if(user == 'admin'){
        const dashbord = document.querySelector('.dashbord');
        dashbord.classList.add('visibled');
    }
}



function logOut(){
    const userloging = document.querySelector('.user');
    const login = document.querySelector('.logform');
    const userlogingLink = document.querySelector('.current-user');
    const dashbord = document.querySelector('.dashbord');
    userlogingLink.innerHTML = 'user'
    login.classList.remove('hidden');
    userloging.classList.remove('visibled');
    dashbord.classList.remove('visibled')
    const orderBox = document.querySelector('.orders-box');
    orderBox.innerHTML =''
    return null;
}



export {login, singUp, logOut, displayAll}