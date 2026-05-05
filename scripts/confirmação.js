
const produtosSalvos = localStorage.getItem("produtos");
const produtos = JSON.parse(produtosSalvos);

if (produtos.length <= 0) {
    const alimentoDiv = document.createElement('div');
    alimentoDiv.className = 'alimento'; 

    const bloc1Div = document.createElement('div');
    bloc1Div.className = 'bloc1'; 

    const img = document.createElement('img');
    img.className = 'imgAlimento';
    img.src = "../img/interrogacao.png"; 
    img.alt = "Nenhum item";

    const infDiv = document.createElement('div');
    infDiv.className = 'infAlimento';

    const h3 = document.createElement('h3');
    h3.textContent = "Nenhum alimento";

    const h4 = document.createElement('h4');
    h4.textContent = "Escaneie retorne, escaneie um alimento para criar seu prato";

    const pesoP = document.createElement('p');
    pesoP.textContent = "--";

    infDiv.appendChild(h3);
    infDiv.appendChild(h4);

    bloc1Div.appendChild(img);
    bloc1Div.appendChild(infDiv);

    alimentoDiv.appendChild(bloc1Div);
    alimentoDiv.appendChild(pesoP);

    container.appendChild(alimentoDiv);

} else {
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

        const botDiminuir = document.createElement('button');
        botDiminuir.textContent = "-";
        botDiminuir.className = "botaoDiminuir";
        botDiminuir.onclick = function() {
            if (produto.peso > 0) {
                produto.peso -= 10;
                console.log(`Peso do produto ${produto.nome} diminuído para ${produto.peso}g`);
                pesoP.textContent = `${produto.peso}g`;
                localStorage.setItem('produtos', JSON.stringify(produtos));
            }
        }

        const pesoP = document.createElement('p');
        pesoP.textContent = `${produto.peso}g`;

        const botAumentar = document.createElement('button');
        botAumentar.textContent = "+";
        botAumentar.className = "botAumentar";
        botAumentar.onclick = function() {
            produto.peso += 10;
            console.log(`Peso do produto ${produto.nome} aumentado para ${produto.peso}g`);
            pesoP.textContent = `${produto.peso}g`;
            localStorage.setItem('produtos', JSON.stringify(produtos));
        }

        infDiv.appendChild(h3);
        infDiv.appendChild(h4);


        bloc1Div.appendChild(img);
        bloc1Div.appendChild(infDiv);

        alimentoDiv.appendChild(bloc1Div);
        alimentoDiv.appendChild(blocPesos);

        blocPesos.appendChild(botDiminuir);
        blocPesos.appendChild(pesoP);
        blocPesos.appendChild(botAumentar);

        container.appendChild(alimentoDiv);

    });
}