function AddUser(name, password, id){
    this.id = id;
    this.userLogin = {  
        name : name,
        password : password
    }
    this.userOrders = [];

    this.updateUserLogin = function (username, userpassword){
        username ==''? username = name:'';
        userpassword ==''?userpassword= password:'';
        this.userLogin.name = username;
        this.userLogin.password = userpassword;
    }

}

let users = [new AddUser('admin', 'admin')];

let count = 1;
users.forEach(item=>{
    item['id'] = count;
    count ++
});

const verifstore = localStorage.getItem('users');
if(verifstore === null){
    localStorage.setItem('users', JSON.stringify(users));
}
export {AddUser};