// MAIN
logged_in = localStorage.getItem("logged_in");
activeUserId = localStorage.getItem("activeUserId");
users = JSON.parse(localStorage.getItem("users")); // Se traen los usuarios del localStorage
if (logged_in) {
  LogIn();
} else {
  LogInView();
}

// LOGIN BUTTON
function LoginButton() {
  user = userName.value;
  pass = password.value;
  logged_in = CheckLogIn(user, pass);
  if (logged_in) {
    localStorage.setItem("logged_in", logged_in);
    localStorage.setItem("activeUserId", activeUserId);
    LogIn();
  } else {
    LogInView();
  }
}

// Login ejecutado, muestra distribucion de fondos
function LogIn() {
  posibleUsers = users.map((el) => el.id);
  posibleUsers = posibleUsers.filter((el) => el != activeUserId);

  LoggedInView(posibleUsers);
  PrintAllFunds();
}

// Funcion para logout
function LogOut() {
  localStorage.removeItem("logged_in");
  localStorage.removeItem("activeUserId");
  logged_in = 0;
  LoggedOutView();
  LogInView();
}

// Envia fondos
function SendFunds() {
  let destinatarioInput = document.getElementById("destinatarioInputID");
  destinatario = destinatarioInput.value;
  let amountInput = document.getElementById("amountID");
  amount = parseFloat(amountInput.value);
  if (!isNaN(amount) && amount > 0){
    TransferFunds(destinatario, amount);
  } else {
    alert("El numero ingresado no es valido");
  }
  PrintAllFunds();
}


// Funcion de chequeo de user y password
function CheckLogIn(_user, _pass) {
  //LogIn requiere que el usuario se autentique para el ingreso
  users = JSON.parse(localStorage.getItem("users")); // Se traen los usuarios del localStorage
  const isUser = users.filter((el) => el.userName == _user);
  if (isUser.length > 0) {
    if (isUser[0].password == _pass) {
      alert("El ingreso ha sido exitoso Sr. " + _user);
      activeUserId = isUser[0].id;
      successfull = true;
    } else {
      alert("Ingreso denegado. El nombre de usuario o contraseña son erroneos");
      successfull = false;
    }
  } else {
    alert("Ingreso denegado. El usuario " + _user + " no existe");
    successfull = false;
  }
  return successfull;
}

// Funcion para transferir fondos
function TransferFunds(_transferTo, _transferAmount) {
  // pide los datos para trasnferencia de fondos

  if (posibleUsers.some((el) => el == _transferTo)) {
    if (_transferAmount <= users[activeUserId].funds) {
      TransferTo(activeUserId, _transferTo, _transferAmount);
      const usersJSON = JSON.stringify(users);
      localStorage.setItem("users", usersJSON); //guardo usuarios en localStorage
    } else {
      alert("El monto elegido supera al disponible");
    }
  } else {
    alert("El usuario elegido o su ID no existe");
  }
}

function TransferTo(_from, _to, _amount, _type = "ETH") {
  //Funcion que transfiere fondos
  users[_from].funds -= _amount;
  users[_to].funds += _amount;
}

function PrintAllFunds() {
  // DOM - lista los fondos de todos los usuarios en una lista
  let fundSection = document.getElementById("fundSection");
  fundSection.innerHTML = "";
  for (const user in users) {
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
  let referencia = users.map((el) => el.userName);
  let valores = users.map((el) => el.funds);
  let valorTotal = valores.reduce((acumulador, el) => acumulador + el, 0);
  valores = valores.map((el) => (el / valorTotal) * 100);

  drawDoughnutChart(referencia, valores, "Grafico 2", myChart);
  //  logged_in = false; //Desloguea para poder hacer el grafico
}
