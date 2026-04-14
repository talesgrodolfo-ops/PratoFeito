
let modeloAtivo = null;
let produtoAtivo = null;
let produtos = [];
let modelosAtivos = [];
let modelosDetectados = [];

try {
    let produtosanteriores = localStorage.getItem("produtos");

    if (produtosanteriores) {
        modelosDetectados = JSON.parse(produtosanteriores);
    }
} catch (e) {
    console.log("erro " + e + " ao procurar produto anterior.");
}



async function carregarProdutos() {
    try {
        const resposta = await fetch('./produtos.json');
        const dados = await resposta.json();
        produtos = dados.produtos;

        const scene = document.querySelector("a-scene");
        const assets = document.getElementById("assets");

        produtos.forEach(produto => {
            const asset = document.createElement("a-asset-item");
            asset.setAttribute("id", `model_${produto.id}`);
            asset.setAttribute("src", produto.modelo);
            assets.appendChild(asset);

            const entity = document.createElement("a-entity");
            entity.setAttribute("mindar-image-target", `targetIndex: ${produto.id}`);
            entity.setAttribute("id", `target_${produto.id}`);

            const model = document.createElement("a-gltf-model");
            model.setAttribute("id", `model3d_${produto.id}`);
            model.setAttribute("rotation", "90 0 0");
            model.setAttribute("position", "0 0 0.1");
            model.setAttribute("scale", `${produto.escala.x} ${produto.escala.y} ${produto.escala.z}`);
            model.setAttribute("src", `#model_${produto.id}`);

            entity.appendChild(model);
            scene.appendChild(entity);
        });

        document.querySelectorAll("a-entity[mindar-image-target]").forEach(entity => {
            entity.addEventListener("targetFound", () => {
                const id = parseInt(entity.id.split("_")[1]);
                const modelo = entity.querySelector("a-gltf-model");

                let produtoDetectado = modelosDetectados.find(p => p.id === id);

                if (!produtoDetectado) {
                    const produtoBase = produtos.find(p => p.id === id);
                    produtoDetectado = JSON.parse(JSON.stringify(produtoBase));
                    modelosDetectados.push(produtoDetectado);
                }

                let produtoAtivoExistente = modelosAtivos.find(p => p.id === id);

                if (!produtoAtivoExistente) {
                    const produtoCopia = JSON.parse(JSON.stringify(produtoDetectado));
                    modelosAtivos.push(produtoCopia);
                    produtoAtivo = produtoCopia;
                } else {
                    produtoAtivo = produtoAtivoExistente;
                }

                modeloAtivo = modelo;
                modelo.setAttribute("scale",
                    `${produtoAtivo.escala.x} ${produtoAtivo.escala.y} ${produtoAtivo.escala.z}`);
                atualizarPainel();
            });

            entity.addEventListener("targetLost", () => {
                const id = parseInt(entity.id.split("_")[1]);

                if (produtoAtivo && produtoAtivo.id === id) {
                    modeloAtivo = null;
                    produtoAtivo = null;
                    document.getElementById("nome").style.display = "none";
                    document.getElementById("peso").style.display = "none";
                }

                modelosAtivos = modelosAtivos.filter(p => p.id !== id);
            });
        });

    } catch (erro) {
        console.error("Erro ao carregar JSON:", erro);
    }
}

function atualizarPainel() {
    if (!produtoAtivo || !modeloAtivo) return;

    document.getElementById("nome").textContent = produtoAtivo.nome;
    document.getElementById("peso").textContent = produtoAtivo.peso + "g";
    document.getElementById("nome").style.display = "block";
    document.getElementById("peso").style.display = "block";
}

function atualizarProduto(produto, pesoAdicionado) {
    const pesoOriginal = produto.peso;

    if (pesoOriginal === 0) {
        console.error("Erro: peso original não pode ser zero.");
        return;
    }

    const multiplicador = (pesoOriginal + pesoAdicionado) / pesoOriginal;

    produto.peso = parseFloat((produto.peso * multiplicador).toFixed(0));
    produto.valor_energetico = parseFloat((produto.valor_energetico * multiplicador).toFixed(0));
    produto.proteinas = parseFloat((produto.proteinas * multiplicador).toFixed(0));
    produto.carboidratos = parseFloat((produto.carboidratos * multiplicador).toFixed(0));
    produto.gorduras = parseFloat((produto.gorduras * multiplicador).toFixed(0));
    produto.fibras = parseFloat((produto.fibras * multiplicador).toFixed(0));
    produto.sodio = parseFloat((produto.sodio * multiplicador).toFixed(0));

    if (produto.escala) {
        produto.escala.x *= multiplicador;
        produto.escala.y *= multiplicador;
        produto.escala.z *= multiplicador;
    }

    const produtoDetectado = modelosDetectados.find(p => p.id === produto.id);
    if (produtoDetectado) {
        produtoDetectado.peso = produto.peso;
        produtoDetectado.valor_energetico = produto.valor_energetico;
        produtoDetectado.proteinas = produto.proteinas;
        produtoDetectado.carboidratos = produto.carboidratos;
        produtoDetectado.gorduras = produto.gorduras;
        produtoDetectado.fibras = produto.fibras;
        produtoDetectado.sodio = produto.sodio;
        produtoDetectado.escala = { ...produto.escala };
    }

    return produto;
}

function mais() {
    if (modeloAtivo && produtoAtivo) {
        atualizarProduto(produtoAtivo, 10);
        const scale = modeloAtivo.getAttribute("scale");
        const newScale = {
            x: scale.x * 1.1,
            y: scale.y * 1.1,
            z: scale.z * 1.1
        };

        modeloAtivo.setAttribute("scale", newScale);
        produtoAtivo.escala = newScale;

        atualizarPainel();
    }
}

function menos() {
    if (modeloAtivo && produtoAtivo) {
        atualizarProduto(produtoAtivo, -10);

        const scale = modeloAtivo.getAttribute("scale");
        const newScale = {
            x: scale.x * 0.9,
            y: scale.y * 0.9,
            z: scale.z * 0.9
        };

        modeloAtivo.setAttribute("scale", newScale);
        produtoAtivo.escala = newScale;

        atualizarPainel();
    }
}

function resetarProduto(id) {
    const produtoBase = produtos.find(p => p.id === id);

    if (produtoBase) {
        const produtoDetectado = modelosDetectados.find(p => p.id === id);
        if (produtoDetectado) {
            Object.assign(produtoDetectado, JSON.parse(JSON.stringify(produtoBase)));
        }

        const produtoAtivoEncontrado = modelosAtivos.find(p => p.id === id);
        if (produtoAtivoEncontrado) {
            Object.assign(produtoAtivoEncontrado, JSON.parse(JSON.stringify(produtoBase)));
        }

        if (produtoAtivo && produtoAtivo.id === id) {
            Object.assign(produtoAtivo, JSON.parse(JSON.stringify(produtoBase)));
            const modelo = document.querySelector(`#model3d_${id}`);
            if (modelo) {
                modelo.setAttribute("scale",
                    `${produtoAtivo.escala.x} ${produtoAtivo.escala.y} ${produtoAtivo.escala.z}`);
                atualizarPainel();
            }
        }
    }
}

function removerProdutoDetectado(id) {
    modelosDetectados = modelosDetectados.filter(p => p.id !== id);
    modelosAtivos = modelosAtivos.filter(p => p.id !== id);

    if (produtoAtivo && produtoAtivo.id === id) {
        produtoAtivo = null;
        modeloAtivo = null;
        document.getElementById("nome").style.display = "none";
        document.getElementById("peso").style.display = "none";
    }
}

function obterModelosAtivos() {
    console.log(modelosAtivos);
    return modelosAtivos;
}

function obterModelosDetectados() {
    console.log(modelosDetectados);
    return modelosDetectados;
}

function calcularTotalNutricional() {
    const total = {
        peso: 0,
        valor_energetico: 0,
        proteinas: 0,
        carboidratos: 0,
        gorduras: 0,
        fibras: 0,
        sodio: 0
    };

    modelosAtivos.forEach(produto => {
        total.peso += produto.peso;
        total.valor_energetico += produto.valor_energetico;
        total.proteinas += produto.proteinas;
        total.carboidratos += produto.carboidratos;
        total.gorduras += produto.gorduras;
        total.fibras += produto.fibras;
        total.sodio += produto.sodio;
    });

    return total;
}


function salvar() {

    const dados = JSON.stringify(modelosAtivos);
    console.log(dados);

    localStorage.setItem("produtos", dados);
    window.location.replace("./resources/confirmacao.html");


}
document.querySelector("a-scene").addEventListener("loaded", carregarProdutos);