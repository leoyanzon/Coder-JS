//Declaraciones de Variables Globales
let logged_in = false;
let activeUserId;
let canvas;
let user;
let posibleUsers;
let transactions = [];
const DateTime = luxon.DateTime;

// DEFINICION DE CLASE ERC20, imitando los tokens en solidity
// Y CREACION DEL CONTRATO ERC20 WETH.
class ERC20 {
  constructor(name, symbol, totalSupply) {
    this.name = name;
    this.symbol = symbol;
    this.totalSupply = totalSupply;
    this.balances = [totalSupply]; //El balance es del owner ya que el ID es 0
    this.allowed = [0][0];
    this.contractFunds = 0; //Este es el fondo en ETH que posee el contrato inteligente ERC20
  }

  balanceOf(tokenOwner) {
    return this.balances[tokenOwner];
  }
  allowance(owner, delegate) {
    return this.allowed[owner][delegate];
  }
  transfer(user, recipient, amount) {
    if (amount <= this.balances[msgOwner]) {
      this.balances[user] -= amount;
      this.balances[recipient] += amount;
      return true;
    } else {
      return false;
    }
  }
}
// INICIAR CONTRATOS ERC20
const weth = new ERC20("Wrapped Ethereum", "WETH", 100); //Será usado mas adelante
const wbtc = new ERC20("Wrapped Bitcoin", "WBTC", 100); // Será usado mas adelante
const link = new ERC20("Chainlink", "LINK", 1000); // Será usado mas adelante

// CREACION DE USUARIOS
function CrearUsuario(_userName, _password, _initialFunds = 0) {
  //FUNCION PARA CREAR USUARIOS
  if (!users.includes(_userName)) {
    users.push({
      id: users.length,
      userName: _userName,
      password: _password,
      funds: _initialFunds,
    });
    weth.balances.push(0);
    return true;
  } else {
    return false;
  }
}

// VERIFICA SI HAY USUARIOS Y FONDOS; SI NO LOS HAY LOS CREA
users = JSON.parse(localStorage.getItem("users"));
if (users == null) {
  users = [];
  CrearUsuario("admin", "pass", 100); //Creo admin
  CrearUsuario("user1", "pass1", 50); //Creo usuario 1, con fondos
  CrearUsuario("user2", "pass2", 10); //Creo usuario 2, sin fondos
  const usersJSON = JSON.stringify(users);
  localStorage.setItem("users", usersJSON); //guardo usuarios en localStorage
}

// VERIFICA SESION ABIERTA
logged_in = localStorage.getItem("logged_in");
activeUserId = localStorage.getItem("activeUserId");
activeSession = JSON.parse(localStorage.getItem("activeSession")) || null;
if (activeSession == null) {
  activeSession = {
    logged_in: false,
    activeUserId: null,
    activeUserName: null
  }
}
transactions = JSON.parse(localStorage.getItem("transactions")) || [];
transactions = transactions.length > 0 ? TransformDates(transactions) : transactions;

// Transforma Strings de Fechas en DATES del JSON
function TransformDates(_transactions){
    for (const prop of _transactions){
      prop.date = new Date(Date.parse(prop.date));
    }
  return _transactions
}
  
// GUARDA SESION Y TX
function SaveSession(_activeSession){
  localStorage.setItem("activeSession", JSON.stringify(activeSession));
 
}

function SaveTx(_transactions){
  localStorage.setItem("transactions", JSON.stringify(_transactions));
}
