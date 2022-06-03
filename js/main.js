// MAIN
activeSession.logged_in ? LogIn(activeSession.activeUserName) : LogInView();

// LOGIN BUTTON
function LoginButton() {
  user = userName.value;
  pass = password.value;
  UserExist(user, pass) ? LogIn(user) : SweetAlert("El usuario no existe", "error");
}

// Chequea si el usuario existe
function UserExist(_user, _pass){
  userExist = users.find((el) => (el.userName == _user && el.password == _pass));
  return userExist;
}

// Funcion LogIn con parametro de entrada: Nombre del usuario
function LogIn(_userName){
  SweetAlert("Log in exitoso!", "success");
  activeSession = {
    logged_in: true, 
    activeUserId: GetID(_userName),
    activeUserName: _userName
  };
  SaveSession(activeSession);
  posibleUsers = users.filter((el) => el.id != activeSession.activeUserId);
  LoggedInView(posibleUsers);
  PrintAllFunds(users,activeSession);
  PrintCharts(users,activeSession);
} 

// Funcion para obtener el ID del usuario segun el nombre
function GetID(_userName){
  return users.find((el)=> el.userName == _userName).id;
}

// Funcion para logout
function LogOut() {
  localStorage.removeItem("activeSession");
  activeSession = {
    logged_in: false
  };
  LoggedOutView();
  LogInView();
}

// Envia fondos
function SendFunds() {
  let destinatario = document.getElementById("destinatarioInputID").value;
  let amount = parseFloat(document.getElementById("amountID").value) || 0;
  amount > 0 ? TransferFunds(GetID(destinatario), amount) : SweetAlert("El monto ingresado no es valido", "error");
}

// Funcion para transferir fondos
function TransferFunds(_transferTo, _transferAmount) {
  if (_transferAmount <= users[activeSession.activeUserId].funds) {
    TransferTo(activeSession.activeUserId, _transferTo, _transferAmount);
    SweetAlert("La transacción ha sido exitosa", "success");
    PrintAllFunds(users, activeSession);
    PrintCharts(users,activeSession);
    const usersJSON = JSON.stringify(users);
    localStorage.setItem("users", usersJSON); //guardo usuarios en localStorage
    document.getElementById("amountID").value = ""
  } else {
      SweetAlert("El monto elegido supera al disponible", "error");
  }
}

function TransferTo(_from, _to, _amount, _type = "ETH") {
  //Funcion que transfiere fondos
  users[_from].funds -= _amount;
  users[_to].funds += _amount;
  LogTx(_from, _to, _amount, _type);
}

function LogTx(_from, _to, _amount, _type){
  let _date = new Date(); 
  transactions.push({
    date: _date, 
    from: _from, 
    to: _to, 
    amount: _amount, 
    type:_type
  });
  SaveTx(transactions);
  TransactionsDraw(transactions);
}