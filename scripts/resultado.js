
document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem('prodfinal');
});

function telafinal() {
    localStorage.removeItem('prodfinal');

    prodfinal = {
        peso: 0,
        valor_energetico: 0,
        proteinas: 0,
        carboidratos: 0,
        gorduras: 0,
        fibras: 0,
        sodio: 0
    };
    console.log(prodfinal);

    const produtoescaneados = JSON.parse(localStorage.getItem("produtos"));
    produtoescaneados.forEach(produto => {
        console.log("Valor energético: " + produto.valor_energetico);
        prodfinal.peso += produto.peso;
        prodfinal.valor_energetico += produto.valor_energetico;
        prodfinal.proteinas += produto.proteinas;
        prodfinal.carboidratos+= produto.carboidratos;
        prodfinal.gorduras += produto.gorduras;
        prodfinal.fibras += produto.fibras;
        prodfinal.sodio += produto.sodio;
    });

    console.log(prodfinal);

    if (prodfinal.valor_energetico > 0) {
        prodfinal.valor_energetico = (prodfinal.valor_energetico/2000).toFixed(2);
    }
    if (prodfinal.proteinas > 0) {
        prodfinal.proteinas = (prodfinal.proteinas/300).toFixed(2);
    }
    if (prodfinal.carboidratos > 0) {
        prodfinal.carboidratos = (prodfinal.carboidratos/300).toFixed(2);
    }
    if (prodfinal.gorduras > 0) {
        prodfinal.gorduras = (prodfinal.gorduras/55).toFixed(2);
    }
    if (prodfinal.fibras > 0) {
        prodfinal.fibras = (prodfinal.fibras/25).toFixed(2);
    }
    if (prodfinal.sodio > 0) {
        prodfinal.sodio = (prodfinal.sodio/2400).toFixed(2);
    }   
    console.log(prodfinal);

    localStorage.setItem("prodfinal", JSON.stringify(prodfinal));
    window.location.href = "resultado.html";
    localStorage.removeItem("produtos");
}