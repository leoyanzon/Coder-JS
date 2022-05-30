
const GetPrice = async () =>{
    url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd%2Cars"
    const resp = await fetch(url);
    const data = await resp.json();
    price_usd = data.ethereum.usd;
    price_ars = data.ethereum.ars;
    PrintAllFunds(users,activeSession);
}