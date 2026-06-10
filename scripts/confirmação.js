let produtos = [];

const produtosSalvos = localStorage.getItem("produtos");
const produtosnoPratoSalvos = localStorage.getItem("produtosnoPrato");

if (produtosSalvos) {
    produtos = JSON.parse(produtosSalvos);
}

if (produtosnoPratoSalvos) {
    JSON.parse(produtosnoPratoSalvos).forEach(produto => {
        if (!produtos.some(p => p.id === produto.id)) {
            produtos.push(produto);
        }
    });
}

function salvarPrato() {
    const dados = JSON.stringify(produtos);
    localStorage.setItem("produtos", dados);
    localStorage.setItem("produtosnoPrato", dados);
}

function atualizarPesoProduto(produto, pesoAdicionado) {
    const pesoOriginal = produto.peso;
    if (pesoOriginal === 0) return;

    const multiplicador = (pesoOriginal + pesoAdicionado) / pesoOriginal;

    produto.peso = parseFloat((produto.peso * multiplicador).toFixed(0));
    produto.valor_energetico = parseFloat((produto.valor_energetico * multiplicador).toFixed(0));
    produto.proteinas = parseFloat((produto.proteinas * multiplicador).toFixed(0));
    produto.carboidratos = parseFloat((produto.carboidratos * multiplicador).toFixed(0));
    produto.gorduras = parseFloat((produto.gorduras * multiplicador).toFixed(0));
    produto.fibras = parseFloat((produto.fibras * multiplicador).toFixed(0));
    produto.sodio = parseFloat((produto.sodio * multiplicador).toFixed(0));
}

salvarPrato();

addEventListener("DOMContentLoaded", () => {
    if (produtos.length == 0) {
        const confirmar = document.getElementById("confirmar");
        confirmar.style.backgroundColor = "gray";
        confirmar.onclick = null;
        confirmar.style.cursor = "not-allowed";
    }
});

produtos.forEach(produto => {
    console.log(produto);

    const alimentoDiv = document.createElement('div');
    alimentoDiv.className = 'alimento';

    const bloc1Div = document.createElement('div');
    bloc1Div.className = 'bloc1';

    const blocPesos = document.createElement('div');
    blocPesos.className = 'blocPesos';

    const img = document.createElement('img');
    img.src = produto.foto;
    img.alt = produto.nome;
    img.className = 'imgAlimento';

    const infDiv = document.createElement('div');
    infDiv.className = 'infAlimento';

    const h3 = document.createElement('h3');
    h3.textContent = produto.nome;

    const h4 = document.createElement('h4');
    h4.textContent = produto.categoria;

    const botAumentar = document.createElement('button');
    botAumentar.textContent = "+";
    botAumentar.className = "botAumentar";

    const pesoP = document.createElement('p');
    pesoP.textContent = `${produto.peso}g`;

    const botDiminuir = document.createElement('button');
    botDiminuir.textContent = "-";
    botDiminuir.className = "botaoDiminuir";

    const botremover = document.createElement('button');
    botremover.innerHTML = `<i class="fas fa-trash"></i>`;
    botremover.className = "botaoRemover";

    botremover.onclick = function () {
        console.log(produtos.length);
        console.log(localStorage.getItem("produtosnoPrato"));
        if (produtos.length == 1) {
            alert("Você não pode remover o último produto do prato.");
        } else {
            confirmacao = confirm(`Deseja remover o produto ${produto.nome} do prato?`);
            if (!confirmacao) {
                return;
            } else {
                produtos.splice(produtos.indexOf(produto), 1);
                salvarPrato();
                console.log(`Produto ${produto.nome} removido do prato`);
                alimentoDiv.remove();
                window.location.reload();
            }
        }
    }

    botDiminuir.onclick = function () {
        if (produto.peso > 10 && produto.peso <= 990) {
            atualizarPesoProduto(produto, -10);
            console.log(`Peso do produto ${produto.nome} diminuído para ${produto.peso}g`);
            pesoP.textContent = `${produto.peso}g`;
            salvarPrato();
        } else {
            if (produtos.length == 1) {
                alert("Você não pode remover o último produto do prato.");
            } else {
                confirmacao = confirm(`Deseja remover o produto ${produto.nome} do prato?`);
                if (!confirmacao) {
                    return;
                } else {
                    produtos.splice(produtos.indexOf(produto), 1);
                    salvarPrato();
                    console.log(`Produto ${produto.nome} removido do prato`);
                    alimentoDiv.remove();
                    window.location.reload();
                }
            }
        }
    }

    botAumentar.onclick = function () {

        if (produto.peso >= 10 && produto.peso < 990) {
            atualizarPesoProduto(produto, 10);
            console.log(`Peso do produto ${produto.nome} aumentado para ${produto.peso}g`);
            pesoP.textContent = `${produto.peso}g`;
            salvarPrato();
            console.log(produtos);
        }
        else {
            alert("O peso do produto não pode ser maior que 990g.");
        }
    }

    infDiv.appendChild(h3);
    infDiv.appendChild(h4);


    bloc1Div.appendChild(img);
    bloc1Div.appendChild(infDiv);

    alimentoDiv.appendChild(bloc1Div);
    alimentoDiv.appendChild(blocPesos);


    blocPesos.appendChild(botAumentar);
    blocPesos.appendChild(pesoP);
    blocPesos.appendChild(botDiminuir);
    blocPesos.appendChild(botremover);


    container.appendChild(alimentoDiv);

    console.log(produtos.length);

});
