function proximap() {
    document.documentElement.requestFullscreen();
    const container = document.getElementById("container");
    container.style.display = "none";
    const bloco = document.getElementById("trocarblock");
    bloco.style.display = "flex";
    bloco.style.position = "absolute";
    bloco.style.width = "100vw";
    bloco.style.height = "100vh";
    bloco.style.zIndex = "10";
}

if (document.getElementById("tutorial")) {
    document.getElementById("tutorial").addEventListener("click", () => {
        window.location.replace("./resources/regras.html");
    });
}

if (document.getElementById("voltar")) {
    document.getElementById("voltar").addEventListener("click", () => {
        window.location.replace("../index.html");
    });
}

function finalizar() {
    
    localStorage.removeItem("produtos");
    localStorage.removeItem("produtosnoPrato");
    window.location.replace("../index.html?fs=1");
}

function retornarPrato() {
    window.location.replace("../index.html?fs=1");
}