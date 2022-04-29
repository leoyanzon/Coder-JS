//Declaraciones
let logged_in = false;
let network;
let ticker;
let user_funds;
let activeUserId;

// DEFINICION DE CLASE ERC20, imitando los tokens en solidity
// Y CREACION DEL CONTRATO ERC20 WETH.
class ERC20{
    constructor(name, symbol, totalSupply){
        this.name = name;
        this.symbol = symbol;
        this.totalSupply = totalSupply;
        this.balances = [totalSupply]; //El balance es del owner ya que el ID es 0
        this.allowed = [0][0];
        this.contractFunds = 0; //Este es el fondo en ETH que posee el contrato inteligente ERC20
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
const users = [{id: 0, userName: "admin", password:"pass", funds: 100}];
const weth = new ERC20("Wrapped Ethereum", "WETH", 100); //Será usado mas adelante
const wbtc = new ERC20("Wrapped Bitcoin", "WBTC", 100); // Será usado mas adelante
const link = new ERC20("Chainlink", "LINK", 1000); // Será usado mas adelante
CrearUsuario("user1", "pass1", 1); //Creo usuario 1, con fondos
CrearUsuario("user2", "pass2", 0); //Creo usuario 2, sin fondos

// MAIN
Welcome();
let user = prompt("Ingrese su nombre de usuario");
let pass = prompt("Ingrese su contraseña para el ingreso");
logged_in = CheckLogIn(user, pass);
while(logged_in){
    SeleccionAccion(prompt("Seleccione la opcion que desea realizar:\n 1.Ver sus fondos\n 2.Enviar fondos a otra dirección\n 3.Comprar un token\n 4.Salir/Log Off"));
    InsertHtml();
}

// FUNCTIONS

function Welcome(){
    alert("Bienvenidos!!!");
}

function CrearUsuario(_userName, _password, _initialFunds = 0){ //FUNCION PARA CREAR USUARIOS
    if (!users.includes(_userName)){
        users.push({id:users.length, userName: _userName, password: _password, funds: _initialFunds})
        weth.balances.push(0)
        return true
    } else {return false}
    
}
// ESTA PARTE DEL CODIGO SE DEJA COMENTADA SOLO EN ESTA ENTREGA.. LUEGO SE REMOVERA..
// ESTA FUNCION ES REMPLAZADA POR LA QUE SE MUESTRA ABAJO, UTILIZANDO UNA DE ALTO NIVEL FILTER PARA OBTENER EL ARRAY CON EL USUARIO

// function CheckLogIn(_user, _pass){ // LogIn requiere que el usuario se autentique para el ingreso
//     for(let i = 0; i < users.length; i++){ //Check que el usuario este entre el array de usuarios
//         if (users[i].userName === _user){
//             activeUserId = i;
//             userExists = true;
//             break;
//         } else{
//             userExists = false;
//         }
//     }       
//     if (userExists){ // Si existe en la base de datos, compara usuario y contraseña
//         if (_user === users[activeUserId].userName &&_pass === users[activeUserId].password){
//             alert("El ingreso ha sido exitoso Sr. " + _user);
//             successfull = true;
//         } else{
//             alert("Ingreso denegado. El nombre de usuario o contraseña son erroneos");
//             successfull = false;
//         }
//     } else {
//         alert("Ingreso denegado. El nombre de usuario no existe");
//         successfull = false;
//     }   
//     return successfull
// }

function CheckLogIn(_user, _pass){ //LogIn requiere que el usuario se autentique para el ingreso
    const isUser = users.filter((el)=> el.userName == _user); 
    if (isUser.length > 0){
        if (isUser[0].password == _pass){
            alert("El ingreso ha sido exitoso Sr. " + _user);
            activeUserId = isUser[0].id;
            successfull = true;
        } else {
            alert("Ingreso denegado. El nombre de usuario o contraseña son erroneos");
            successfull = false;
        }
    } else {
        alert("Ingreso denegado. El usuario <"+ _user + "> no existe");
        successfull = false;
    }
    return successfull
}

function SeleccionAccion(_seleccion){ // seleccionRed permite la seleccion de la red a la que se quiere conectar
    switch (_seleccion) {
        case "1":
            GetFunds();
            break;
        case "2":
            TransferFunds(activeUserId);
            break;
        case "3":
            alert("Opcion aun no implementada");
            break;
        case "4":
            logged_in = false;
            break;
        default: 
            break;
    }
}     

function GetFunds(){ // obtiene valores de una API
    //estos valores se obtendran de apis en proximas entregas
        alert("Usted posee " + users[activeUserId].funds + "ETH y " + weth.balanceOf(activeUserId) + "WETH");
}

function TransferFunds(){ // pide los datos para trasnferencia de fondos
    let posibleUsers = users.map(el => el.id);
    posibleUsers = posibleUsers.filter(el => el != activeUserId);
    let transferTo = prompt("Seleccionar el ID del destinatario. Posible/s destinatarios:\n" + posibleUsers);
    if (posibleUsers.some(el => el == transferTo)){
        let transferAmount = prompt("Seleccionar el monto a enviar (max:" + users[activeUserId].funds + "ETH)");
        if (transferAmount <= users[activeUserId].funds){
            TransferTo(activeUserId, transferTo, transferAmount);
            GetFunds();
        } else {
            alert("El monto elegido supera al disponible");
        }
    } else {
        alert("El usuario elegido o su ID no existe");
    }
}

function TransferTo(_from, _to, _amount, _type = "ETH"){ //transfiere fondos
    users[_from].funds -= _amount;
    users[_to].funds += _amount;
}

function InsertHtml(){ // DOM - inyecta graficos y datos en el HTML
    // se completará mas adelante en proximas entregas  
}