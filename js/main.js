//Declaraciones
let logged_in = false;
let network;
let ticker;
let user_funds;
let activeUserId;

// DEFINICION DE ARRAY DE USUARIOS Y CREACION DEL OWNER


// DEFINICION DE CLASE ERC20, imitando los tokens en solidity
// Y CREACION DEL CONTRATO ERC20 WETH.
class ERC20{
    constructor(name, symbol, decimals, totalSupply){
        this.name = name;
        this.symbol = symbol;
        this.decimals = decimals;
        this.totalSupply = totalSupply;
        this.balances = [totalSupply]; //El balance es del owner ya que el ID es 0
        this.allowed = [0][0];
    }
    
    balanceOf(tokenOwner){
        return this.balances[tokenOwner]
    }
    allowance(owner, delegate){
        return this.allowed[owner][delegate]
    }
    transfer(user, recipient, amount){
        if (amount <= this.balances[msgOwner]){
            this.balances[user] -= amount;
            this.balances[recipient] += amount;
            return true
        } else {return false}
    }
}

//INICIAR CONTRATO, USUARIO ADMIN Y USER1
const users = [{id: 0, userName: "admin", password:"pass"}];
const weth = new ERC20("Wrapped Ethereum", "WETH", 8, 1000000);
CrearUsuario("user1", "user1");

// MAIN
Welcome();
let user = prompt("Ingrese su nombre de usuario");
let pass = prompt("Ingrese su contraseña para el ingreso");
logged_in = CheckLogIn(user, pass);

while(logged_in){
    network = SeleccionRed(prompt("Seleccionar tipo de red:\n 1.Ethereum\n 2.Polygon\n 3.BSC"));
    ticker = SeleccionTicker(network); 
    user_funds = GetFunds(activeUserId, network);
    InsertHtml();
    break;
}





// FUNCTIONS
function Welcome(){
    alert("Bienvenidos!!!");
}

//FUNCION PARA CREAR UN USUARIO
function CrearUsuario(_userName, _password){
    if (!users.includes(_userName)){
        users.push({id:users.length, userName: _userName, password: _password})
        weth.balances.push(0)
        return true
    } else {return false}
    
}


function CheckLogIn(_user, _pass){ // LogIn requiere que el usuario se autentique para el ingreso
    for(let i = 0; i < users.length; i++){ //Check que el usuario este entre el array de usuarios
        if (users[i].userName === _user){
            activeUserId = i;
            userExists = true;
            break;
        } else{
            userExists = false;
        }
    }       
    if (userExists){ // Si existe en la base de datos, compara usuario y contraseña
        if (_user === users[activeUserId].userName &&_pass === users[activeUserId].password){
            alert("El ingreso ha sido exitoso Sr. " + _user);
            successfull = true;
        } else{
            alert("Ingreso denegado. El nombre de usuario o contraseña son erroneos");
            successfull = false;
        }
    } else {
        alert("Ingreso denegado. El nombre de usuario no existe");
        successfull = false;
    }   
    return successfull
}

function SeleccionRed(_seleccion){ // seleccionRed permite la seleccion de la red a la que se quiere conectar
    switch (_seleccion) {
        case "1":
            return "Ethereum"
        case "2":
            return "Polygon"
        case "3":
            return "BSC"
        default:
            return "Ethereum"
    }
}     
function SeleccionTicker(_seleccion){ // seleccionRed permite la seleccion del tipo de ticker dependiendo de la red
    switch (_seleccion) {
        case "Ethereum":
            return "ETH"
        case "Polygon":
            return "MATIC"
        case "BSC":
            return "BNB"
        default:
            return "ERROR"
    }
}    
function GetFunds(_activeUserId, _network){ // obtiene valores de una API
    //estos valores se obtendran de apis en proximas entregas
    switch (_network){
        case "Ethereum":
            return weth.balanceOf(_activeUserId)
        case "Polygon":
            return 10
        case "BSC":
            return 0
    }
}
function InsertHtml(){ // DOM - inyecta graficos y datos en el HTML
    // se completará mas adelante en proximas entregas
    alert("Usted tiene " + user_funds + ticker + " en la red " + network );
}