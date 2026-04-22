function moverPonteiro(valor) {

    let pos;
    if (valor <= 0.3) {
        pos = (valor / 0.3) * 33.33;
    }
    else if (valor <= 0.4) {
        pos = 33.33 + ((valor - 0.3) / 0.1) * 33.33;
    }
    else if (valor <= 1) {
        pos = 66.66 + ((valor - 0.4) / 0.6) * 33.34;
    }
    else {
        pos = 98.5;
    }
    return pos;
}


function calcularnota(valor) {
    let nota = 0;
    if (valor <= 0.3) {
        nota = valor * 333.33;
    }
    else if (valor <= 0.4) {
        nota = 100;
    }
    else if (valor <= 1) {
        nota = (-166.67 * valor) + 166.67;
    } if (valor > 1) {
        nota = 0;
    }
    return nota;
}



function notageral() {
    let nota = 0;
    prodfinal = JSON.parse(localStorage.getItem("prodfinal"));
    nota += calcularnota(prodfinal.valor_energetico);
    console.log("Nota Calorias: " + calcularnota(prodfinal.valor_energetico));
    nota += calcularnota(prodfinal.proteinas)
    console.log("Nota Proteínas: " + calcularnota(prodfinal.proteinas));
    nota += calcularnota(prodfinal.carboidratos)
    console.log("Nota Carboidratos: " + calcularnota(prodfinal.carboidratos));
    nota += calcularnota(prodfinal.gorduras)
    console.log("Nota Gorduras: " + calcularnota(prodfinal.gorduras));
    nota += calcularnota(prodfinal.fibras)
    console.log("Nota Fibras: " + calcularnota(prodfinal.fibras));
    nota += calcularnota(prodfinal.sodio)
    console.log("Nota Sódio: " + calcularnota(prodfinal.sodio));
    nota = nota / 6
    return nota;
}


document.addEventListener("DOMContentLoaded", async () => {

    console.log("Nota geral: "+notageral());
    prodfinal = JSON.parse(localStorage.getItem("prodfinal"));
    console.log(prodfinal);


    console.log("Nota Geral: " + notageral());

    setacaloria = document.getElementById("ponteiroprocalorias");
    console.log("Posição Calorias: " + moverPonteiro(prodfinal.valor_energetico));

    setaproteina = document.getElementById("ponteiroprodteina");
    console.log("Posição Proteínas: " + moverPonteiro(prodfinal.proteinas));

    setacarboidrato = document.getElementById("ponteiroprocarboidrato");
    console.log("Posição Carboidratos: " + moverPonteiro(prodfinal.carboidratos));

    setagordura = document.getElementById("ponteiroprogorduras");
    console.log("Posição Gorduras: " + moverPonteiro(prodfinal.gorduras));

    setafibras = document.getElementById("ponteiroprofibras");
    console.log("Posição Fibras: " + moverPonteiro(prodfinal.fibras));

    setasodio = document.getElementById("ponteiroprosodio");
    console.log("Posição Sódio: " + moverPonteiro(prodfinal.sodio));


    let index = 0;
    for (let i = 0; i <= 100; i += 1) {
        const inteiro = 0;
        if (i <= moverPonteiro(prodfinal.valor_energetico)) {
            setacaloria.style.left = (i) + "%";
        }
        if (i <= moverPonteiro(prodfinal.proteinas)) {
            setaproteina.style.left = (i) + "%";
        }
        if (i <= moverPonteiro(prodfinal.carboidratos)) {
            setacarboidrato.style.left = (i) + "%";
        }
        if (i <= moverPonteiro(prodfinal.gorduras)) {
            setagordura.style.left = (i) + "%";
        }
        if (i <= moverPonteiro(prodfinal.fibras)) {
            setafibras.style.left = (i) + "%";
        }
        if (i <= moverPonteiro(prodfinal.sodio)) {
            setasodio.style.left = (i) + "%";
        }
        if (notageral() >= index && index >= i) {
            document.getElementById("suaNota").textContent = String(index);
            if (index >= 0 && index <= 40) {
                document.getElementById("suaNota").style.color = "red";
            }
            if (index >= 41 && index <= 60) {
                document.getElementById("suaNota").style.color = "orange";
            }
            if (index >= 61 && index <= 100) {
                document.getElementById("suaNota").style.color = "green";
            }
            if (index == 100) {
                document.getElementById("suaNota").style.fontSize = "3rem";
                document.getElementById("suaNota").style.textShadow = "#ffcc00 1px 0 10px";

            }
            index++;
        }

        await new Promise(resolve => setTimeout(resolve, 30));
    }

localStorage.removeItem("produtos");

});
