let number = 8;

let adivinanza = parseInt(prompt("Un caracol se cayó en un pozo de 11 metros, cada día sube 3 metros y al dormirse baja 2 ¿En cuántos días saldrá el caracol del pozo?"));
while (number != adivinanza){
    if (adivinanza > number){
        alert("Nooo, te pasaste, el número es mas chico!");
    } else {
        alert("Lamentablemente no, el número es mas grande");
    }

    adivinanza = parseInt(prompt("Por favor elegir un numero nuevamente"));
    
}
alert("Bien!!, el numero elegido es el correcto");
