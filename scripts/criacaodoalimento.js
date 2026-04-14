const produtosSalvos = [
  {
    "id": 0,
    "nome": "Tomate",
    "modelo": "https://raw.githubusercontent.com/maLu70/RepositorioModel-PratoFeito/refs/heads/main/tomato/scene.gltf",
    "foto": "https://raw.githubusercontent.com/maLu70/RepositorioModel-PratoFeito/main/img/tomate.webp",
    "peso": 0,
    "categoria": "Fibra",
    "valor_energetico": 15,
    "proteinas": 1.1,
    "carboidratos": 3.1,
    "gorduras": 0.2,
    "fibras": 1.2,
    "sodio": 1,
    "escala": { "x": 0.20, "y": 0.20, "z": 0.20 }
  },
  {
    "id": 6,
    "nome": "Arroz",
    "modelo": "https://raw.githubusercontent.com/maLu70/RepositorioModel-PratoFeito/refs/heads/main/rice/scene.gltf",
    "foto": "https://raw.githubusercontent.com/maLu70/RepositorioModel-PratoFeito/main/img/arroz.jpg",
    "peso": 0,
    "categoria": "Carboidrato",
    "valor_energetico": 128.3,
    "proteinas": 2.5,
    "carboidratos": 28.1,
    "gorduras": 0.2,
    "fibras": 1.6,
    "sodio": 1,
    "escala": { "x": 0.15, "y": 0.15, "z": 0.15 }
  }
];


const produtos = produtosSalvos;

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

    alimentosPrato.appendChild(alimentoDiv);



} else {
    produtos.forEach(produto => {
        console.log(produto);

        const alimentoDiv = document.createElement('div');
        alimentoDiv.className = 'alimento';

        const bloc1Div = document.createElement('div');
        bloc1Div.className = 'bloc1';

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

        const pesoP = document.createElement('p');
        pesoP.textContent = `${produto.peso}g`;

        infDiv.appendChild(h3);
        infDiv.appendChild(h4);

        bloc1Div.appendChild(img);
        bloc1Div.appendChild(infDiv);

        alimentoDiv.appendChild(bloc1Div);
        alimentoDiv.appendChild(pesoP);

        container.appendChild(alimentoDiv);

    });
}