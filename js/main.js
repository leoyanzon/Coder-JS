//Declaraciones de Variables
let logged_in = false;
let network;
let ticker;
let user_funds;
let activeUserId;
let canvas;

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


// LOGIN

let loginForm = document.getElementById("loginFormID");
let mainTitle = document.getElementById("mainTitleID");
let mainText = document.getElementById("mainTextID");
let sendForm = document.getElementById("sendFormID");


loginForm.innerHTML = `<div class="mb-3">
                        <label for="userName" class="form-label">Nombre de usuario</label>
                        <input type="text" class="form-control" id="userName" aria-describedby="userHelp">
                        <div id="userHelp" class="form-text">Nunca compartiremos tus datos.</div>
                        </div>
                        <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password">
                        </div>

                        <button type="submit" class="btn btn-primary" id="loginButton">Log in</button>`;



let userName = document.getElementById("userName");
let password = document.getElementById("password");
let loginButton = document.getElementById("loginButton");
let sendButton="";
loginButton.onclick = () => {
    user = userName.value;
    pass = password.value;
    logged_in = CheckLogIn(user,pass);
    if (logged_in){
        LogIn();
        
    } else {
     
    }

}

// Prepara la pagina de usuario
function LogIn(){
    loginForm.innerHTML = "";
    mainTitle.innerHTML = "Bienvenido Sr. " + user;
    mainText.innerHTML = "Los fondos del sistema son los siguientes:";

    let posibleUsers = users.map(el => el.id);

    posibleUsers = posibleUsers.filter(el => el != activeUserId);

    let userForm = `<div class="py-2 form-group">
                    <label for="exampleFormControlSelect1">Seleccionar destinatario:</label>
                    <select class="form-control" id="destinatarioInputID">`;
    
    for (const key in posibleUsers) {
        userForm += `<option>${posibleUsers[key]}</option>`;
    }    
    userForm += `</select>
                      </div>
                <div class="py-2 form-group">
                    <label for="amount">Cantidad a enviar:</label>
                    <input type="text" class="form-control" id="amountID">
                    </div>
                <button type="button" class="py-1 btn btn-primary" id="sendButton">Enviar</button>`;
    sendForm.innerHTML = userForm;
    sendButton = document.getElementById("sendButton");
    sendButton.onclick = () => {
        let destinatarioInput = document.getElementById("destinatarioInputID");
        destinatario = destinatarioInput.value;
        let amountInput = document.getElementById("amountID");
        amount = parseFloat(amountInput.value);
        TransferFunds(destinatario, amount);
        PrintAllFunds();
    }
    PrintAllFunds();

}




// MAIN

while(logged_in){
    SeleccionAccion(prompt("Seleccione la opcion que desea realizar:\n 1.Ver sus fondos\n 2.Enviar fondos a otra dirección\n 3.Graficar fondos\n 4.Salir/Log Off"));
}

// FUNCTIONS



function CrearUsuario(_userName, _password, _initialFunds = 0){ //FUNCION PARA CREAR USUARIOS
    if (!users.includes(_userName)){
        users.push({id:users.length, userName: _userName, password: _password, funds: _initialFunds})
        weth.balances.push(0)
        return true
    } else {return false}
    
}

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
        alert("Ingreso denegado. El usuario "+ _user + " no existe");
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
            PrintAllFunds();
            break;
        case "4":
            logged_in = false;
            break;
        default: 
            logged_in = false;
    }
}     

function GetFunds(){ // obtiene valores de una API
    //estos valores se obtendran de apis en proximas entregas
        alert("Usted posee " + users[activeUserId].funds + "ETH y " + weth.balanceOf(activeUserId) + "WETH");       
}

function TransferFunds(_transferTo, _transferAmount){ // pide los datos para trasnferencia de fondos
    let posibleUsers = users.map(el => el.id);
    posibleUsers = posibleUsers.filter(el => el != activeUserId);
    
    if (posibleUsers.some(el => el == _transferTo)){
        
        if (_transferAmount <= users[activeUserId].funds){
            TransferTo(activeUserId, _transferTo, _transferAmount);
            
        } else {
            alert("El monto elegido supera al disponible");
        }
    } else {
        alert("El usuario elegido o su ID no existe");
    }
}

function TransferTo(_from, _to, _amount, _type = "ETH"){ //Funcion que transfiere fondos
    users[_from].funds -= _amount;
    users[_to].funds += _amount;
}

function InsertHtml(){ // DOM - inyecta graficos y datos en el HTML
    // se completará mas adelante en proximas entregas  
}

function PrintAllFunds(){ // DOM - lista los fondos de todos los usuarios en una lista
    let fundSection = document.getElementById("fundSection");
    fundSection.innerHTML = "";
    for (const user in users){
        let parrafo = document.createElement("li");
        parrafo.innerHTML = `${users[user].userName}: ${users[user].funds}`;
        fundSection.appendChild(parrafo);
    }
    // Creacion de grafico de linea. Por el momento estático, proximas entregas se añadiran valores reales de fondos y se agregaràn mas graficos (ahora comentados)
    //let chartElement = document.getElementById("myChart");
    //chartElement.className = "w-100";
    //drawFundsChart(["January", "February", "March", "April", "May", "June"], [0, 10, 5, 2, 20, 30, 45],"Grafico 1",canvas);
    // Creacion de grafico de torta. Por el momento estático, proximas entregas se añadirán valores reales de fondos
    chartSection = document.getElementById("chartSection");
    chartSection.innerHTML = `<canvas id="myChart"></canvas>`;
    myChart = document.getElementById("myChart"); 

    // Calculo de valores
    let referencia = users.map((el)=> el.userName);
    let valores = users.map((el)=> el.funds);
    let valorTotal = valores.reduce((acumulador,el)=> acumulador + el,0);
    valores = valores.map((el)=> el/valorTotal*100);

    drawDoughnutChart(referencia, valores ,"Grafico 2", myChart);
    logged_in = false; //Desloguea para poder hacer el grafico
}


function drawFundsChart(_labels, _data, _title = "My First dataset", _element) {// Funcion grafico de linea.
  //Definicion de datos
  const data = {
    labels: _labels,
    datasets: [
      {
        label: _title,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: _data,
      },
    ],
  };
  //Defincion de configuracion
  const config = {
    type: "line",
    data: data,
    options: {},
  };
  //Definicion de acciones
  const myChart1 = new Chart(_element, config);
  //myChart.destroy();
}

function drawDoughnutChart(_labels, _data, _title = "My First dataset", _element) {//Funcion grafico de donut. Necesaria las etiquetas, datos, titulo y elemento de HTML

    const data = {
    labels: _labels,
    datasets: [
      {
        label: _title,
        data: _data,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
    options: {
        scale: 0.5,
    },
  };

    return new Chart(_element, config);
  
  
}