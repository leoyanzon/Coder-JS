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
  loginForm.innerHTML = `<p>Logearse con "admin" + "pass" para modo administrador</p>
                          <div class="mb-3 innerForm">
                            <label for="userName" class="form-label">Nombre de usuario</label>
                            <input type="text" class="form-control" id="userName" aria-describedby="userHelp">
                            <div id="userHelp" class="form-text">Nunca compartiremos tus datos.</div>
                            </div>
                          <div class="mb-3 innerForm">
                            <label for="password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="password">
                            </div>

                            <button type="button" class="btn btn-primary" onclick="LoginButton();">Log in</button>`;

  userName = document.getElementById("userName");
  password = document.getElementById("password");
  loginButton = document.getElementById("loginButton");
}


// FUNCION PARA GRAFICAR LOS FONDOS CUANDO EL LOG ES EXITOSO
function LoggedInView(fundsDistribution) {
  loginForm.innerHTML = "";
  mainTitle.innerHTML = "Bienvenido Sr. " + users[activeSession.activeUserId].userName;
  mainText.innerHTML = "Los fondos del sistema son los siguientes:";
  let userForm = `<div class="py-2 form-group">
                    <label for="exampleFormControlSelect1">Seleccionar destinatario:</label>
                    <select class="form-control" id="destinatarioInputID">`;

  for (const key in fundsDistribution) {
    userForm += `<option>${fundsDistribution[key].userName}</option>`;
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
  logOutButton.innerHTML = `<button type="submit" onclick="LogOut();" class="py-1 btn btn-primary" id="LogOutButton">LogOut</button>`;
}

// FUNCION PARA LOG OUT, BLANQUEA DOM
function LoggedOutView(){
	mainTitle.innerHTML = "CryptoJS";
	mainText.innerHTML = "";
	sendForm.innerHTML = "";
	logOutButton.innerHTML = "";
	fundSection.innerHTML = "";
	chartSection.innerHTML = "";
  document.getElementById("plot").innerHTML = "";
}

function PrintAllFunds(_users, _activeSession) {
  // DOM - lista los fondos de todos los usuarios en una lista
  let fundSection = document.getElementById("fundSection");
  fundSection.innerHTML = "";
  for (const user in _users) {
    let parrafo = document.createElement("li");
    parrafo.innerHTML = `${_users[user].userName}: ${_users[user].funds} ETH`;
    parrafo.className = _activeSession.activeUserId == user ? "list-group-item active" : "list-group-item";    
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
  let referencia = _users.map((el) => el.userName);
  let valores = _users.map((el) => el.funds);
  let valorTotal = valores.reduce((acumulador, el) => acumulador + el, 0);
  valores = valores.map((el) => (el / valorTotal) * 100);

  drawDoughnutChart(referencia, valores, "Grafico 2", myChart);
  TransactionsDraw(transactions);
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

function SweetAlert(_texto = "default", _icon = "success"){
  Swal.fire({
    icon: _icon,
    title: _texto,
    allowOutsideClick: false,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

function TransactionsDraw(_transactions){
  
  const tx = _transactions.map((el) => [el.date, el.amount, el.to]);
  tx.length > 0 ? TransactionsPlot(tx) : false;
}

function TransactionsPlot(_transactions){
  google.charts.load('current', {'packages':['annotationchart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Amount');
        data.addColumn('number', 'To user');
        // data.addRows([
        //   [new Date(2314, 2, 15), 12400, "admin"],
        //   [new Date(2314, 2, 16), 24045, 'Lalibertines'],
        //   [new Date(2314, 2, 17), 35022, 'Lalibertines'],
        //   [new Date(2314, 2, 20), 0, 'Lalibertines']
        // ]);
        data.addRows(_transactions);
        var chart = new google.visualization.AnnotationChart(document.getElementById('plot'));

        var options = {
          displayAnnotations: true,
          displayLegendDots: true,
          displayLegendValues: true,
          annotationsWidth: 10
        };

        chart.draw(data, options);
      }
    
}