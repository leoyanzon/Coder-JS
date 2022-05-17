// DOM
let loginForm = document.getElementById("loginFormID");
let mainTitle = document.getElementById("mainTitleID");
let mainText = document.getElementById("mainTextID");
let sendForm = document.getElementById("sendFormID");
let userName;
let password;
let loginButton;
let logOutButton;
let sendButton = "";


// FUNCION PARA GRAFICAR EL MENU LOG IN
function LogInView() {
  loginForm.innerHTML = `<div class="mb-3">
                            <label for="userName" class="form-label">Nombre de usuario</label>
                            <input type="text" class="form-control" id="userName" aria-describedby="userHelp">
                            <div id="userHelp" class="form-text">Nunca compartiremos tus datos.</div>
                            </div>
                            <div class="mb-3">
                            <label for="password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="password">
                            </div>

                            <button type="submit" class="btn btn-primary" onclick="LoginButton();">Log in</button>`;

  userName = document.getElementById("userName");
  password = document.getElementById("password");
  loginButton = document.getElementById("loginButton");
}


// FUNCION PARA GRAFICAR LOS FONDOS CUANDO EL LOG ES EXITOSO
function LoggedInView(fundsDistribution) {
  loginForm.innerHTML = "";
  mainTitle.innerHTML = "Bienvenido Sr. " + users[activeUserId].userName;
  mainText.innerHTML = "Los fondos del sistema son los siguientes:";
  let userForm = `<div class="py-2 form-group">
                    <label for="exampleFormControlSelect1">Seleccionar destinatario:</label>
                    <select class="form-control" id="destinatarioInputID">`;

  for (const key in fundsDistribution) {
    userForm += `<option>${fundsDistribution[key]}</option>`;
  }
  userForm += `</select>
                      </div>
                <div class="py-2 form-group">
                    <label for="amount">Cantidad a enviar:</label>
                    <input type="text" class="form-control" id="amountID">
                    </div>
                <button type="button" onclick="SendFunds();"class="py-1 btn btn-primary" id="sendButton">Enviar</button>`;
  sendForm.innerHTML = userForm;
  logOutButton = document.getElementById("logOutButton");
  logOutButton.innerHTML = `<button type="button" onclick="LogOut();" class="py-1 btn btn-primary" id="LogOutButton">LogOut</button>`;
}

// FUNCION PARA LOG OUT, BLANQUEA DOM
function LoggedOutView(){
	mainTitle.innerHTML = "CryptoJS";
	mainText.innerHTML = `Logearse con "admin" + "pass" para modo administrador`;
	sendForm.innerHTML = "";
	logOutButton.innerHTML = "";
	fundSection.innerHTML = "";
	chartSection.innerHTML = "";
}


//FUNCION PARA GRAFICAR FONDOS
function drawFundsChart(_labels, _data, _title = "My First dataset", _element) {
  // Funcion grafico de linea.
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

function drawDoughnutChart(
  _labels,
  _data,
  _title = "My First dataset",
  _element
) {
  //Funcion grafico de donut. Necesaria las etiquetas, datos, titulo y elemento de HTML

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
