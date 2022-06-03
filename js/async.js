
const GetPrice = async (url = "") =>{
    url = "https://api.coingeco.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd%2Cars"
    const resp = await fetch(url)
    const data = await resp.json()
    price_usd = data.ethereum.usd;
    price_ars = data.ethereum.ars;  
}


const GetPrice1 = async (url = "") => {
    url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd%2Cars";
    const response = await fetch(url)
    .catch(error => {
        const message = "Falla de red";
        throw new Error(message);
    });

    if(!response.ok){
        const message = "Falla de API";
        throw new Error(message);
    } else {
        const data = await response.json();
        price_usd = data.ethereum.usd;
        price_ars = data.ethereum.ars;
        return data;
    }
}

const writePrice = async()=>{
    await GetPrice1()
    .then(response => { return response})
    .catch(error => {console.log(error)});
    UpdatePrice();
}

const UpdatePrice = () =>{
    activeSession.logged_in == true && PrintAllFunds(users,activeSession);
}

setInterval(()=> {
    writePrice();
},3000);