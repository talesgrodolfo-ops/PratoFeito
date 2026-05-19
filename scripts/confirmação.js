let produtosSalvos = localStorage.getItem("produtos");
let produtosnoPrato = JSON.parse(localStorage.getItem("produtosnoPrato"));
let produtos = [];

if (produtosSalvos) {
    produtos = JSON.parse(produtosSalvos);
}
produtosnoPrato.forEach(produto => {
    if (!produtos.some(p => p.nome === produto.nome)) {
        produtos.push(produto);
    }
});
console.log(produtos);


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
            if (produto.peso > 10 && produto.peso <=990) {

                produto.peso -= 10;
                produto.valor_energetico -= (produto.valor_energetico / produto.peso) * 10;
                produto.proteinas -= (produto.proteinas / produto.peso) * 10;
                produto.carboidratos -= (produto.carboidratos / produto.peso) * 10;
                produto.gorduras -= (produto.gorduras / produto.peso) * 10;
                produto.fibras -= (produto.fibras / produto.peso) * 10;
                produto.sodio -= (produto.sodio / produto.peso) * 10;

                console.log(`Peso do produto ${produto.nome} diminuído para ${produto.peso}g`);
                pesoP.textContent = `${produto.peso}g`;
                localStorage.setItem('produtos', JSON.stringify(produtos));
            }else{
                confirmacao = confirm(`Deseja remover o produto ${produto.nome} do prato?`);
                if (!confirmacao) {
                    return;
                }else{
                    produtos.splice(produtos.indexOf(produto), 1);
                    localStorage.setItem('produtos', JSON.stringify(produtos));
                    console.log(`Produto ${produto.nome} removido do prato`);
                    alimentoDiv.remove();
                    window.location.reload();
                }
            }   
        }

        const pesoP = document.createElement('p');
        pesoP.textContent = `${produto.peso}g`;

        const botAumentar = document.createElement('button');
        botAumentar.textContent = "+";
        botAumentar.className = "botAumentar";
        botAumentar.onclick = function() {

            if (produto.peso >= 10 && produto.peso < 990) {
                produto.peso += 10;
                produto.valor_energetico += (produto.valor_energetico / produto.peso) * 10;
                produto.proteinas += (produto.proteinas / produto.peso) * 10;
                produto.carboidratos += (produto.carboidratos / produto.peso) * 10;
                produto.gorduras += (produto.gorduras / produto.peso) * 10;
                produto.fibras += (produto.fibras / produto.peso) * 10;
                produto.sodio += (produto.sodio / produto.peso) * 10;

                console.log(`Peso do produto ${produto.nome} aumentado para ${produto.peso}g`);
                pesoP.textContent = `${produto.peso}g`;
                localStorage.setItem('produtos', JSON.stringify(produtos));
                console.log(produtos);
            }
            else{
                
            }
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
