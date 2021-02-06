function AddUser(name, password, id){
    this.id = id;
    this.userLogin = {  
        name : name,
        password : password
    }
    this.userOrders = [];

    this.updateUserLogin = function (username, userpassword){
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
const usersLength = users.length
const verifstore = localStorage.getItem('users');

if(verifstore === null){
    localStorage.setItem('usersLength', JSON.stringify(usersLength));
    localStorage.setItem('users', JSON.stringify(users));
}
export {AddUser};