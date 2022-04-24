//Declaraciones
const USER = "admin"; //hardcodeados hasta tener base de datos con variables
const PASS = "pass"; //hardcodeados hasta tener base de datos con variables
let logged_in = false;
let network;
let ticker;
let user_funds;

// INTRO
welcome();
let user = prompt("Ingrese su nombre de usuario");
let pass = prompt("Ingrese su contraseña para el ingreso");

logged_in = check_log_in(user, pass);

// MAIN
while(logged_in){
    network = seleccion_red(prompt("Seleccionar tipo de red:\n 1.Ethereum\n 2.Polygon\n 3.BSC"));
    ticker = seleccion_ticker(network); 
    user_funds = get_funds(network);
    insert_html();
    break;
}



// FUNCTIONS

function welcome(){
    alert("Bienvenidos!!!");
}

// LogIn requiere que el usuario se autentique para el ingreso
function check_log_in(_user, _pass){
        if (_user === USER && _pass === PASS){
            alert("El ingreso ha sido exitoso Sr. " + user);
            successfull = true;
        } else{
            alert("Ingreso denegado. Nombre de usuario o contraseña incorrecta");
            successfull = false;
        }
    return successfull
}

// seleccionRed permite la seleccion de la red a la que se quiere conectar
function seleccion_red(_seleccion){
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

// seleccionRed permite la seleccion del tipo de ticker dependiendo de la red
function seleccion_ticker(_seleccion){
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

// obtiene valores de una API
function get_funds(_network){
    //estos valores se obtendran de apis en proximas entregas
    switch (_network){
        case "Ethereum":
            return 1.5
        case "Polygon":
            return 10
        case "BSC":
            return 0
    }
}


// DOM - inyecta graficos y datos en el HTML
function insert_html(){
    // se completará mas adelante en proximas entregas
    console.log("Usted tiene " + user_funds + ticker + " en la red " + network );
}