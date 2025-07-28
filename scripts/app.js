import {calcularDistanciaEntreCeps} from './freteApi.js'


const menu = document.getElementById('menu');

fetch('./scripts/produtos.json')
    .then(response => {
        if (!response.ok) throw new Error('Erro ao carregar o JSON');
        return response.json();
    })
    .then(produtos => {
        for (let i = 0; i < produtos.length; i++) {
            
            const produto = document.createElement('div');
            produto.setAttribute('id', `produto${i}`);
            produto.classList.add('bloco');

            const img = document.createElement('img');
            img.setAttribute('src', produtos[i].img);

            const preco = document.createElement('div');
            preco.classList.add('preco');
            preco.innerHTML = `R$${produtos[i].price.toFixed(2).replace('.', ',')}`;

            const comprar = document.createElement('div');
            comprar.classList.add('comprar');
            comprar.setAttribute('id', 'p' + i);
            comprar.innerHTML = '<i class="fa-solid fa-cart-arrow-down"></i>ADICIONAR AO CARRINHO';

            produto.appendChild(img);
            produto.appendChild(preco);
            produto.appendChild(comprar);
            menu.appendChild(produto);
        }

        const comprar = document.getElementsByClassName('comprar');
        const aComprar = document.getElementById('aComprar');
        const carrinhoIds = new Set();

        for (let item of comprar) {
            item.addEventListener('click', () => {
                const itemId = item.parentNode.id;
                const idDoObjeto = itemId.replace('produto', '');

                if (carrinhoIds.has(idDoObjeto)) return;

                carrinhoIds.add(idDoObjeto);
                const objAtual = produtos[idDoObjeto];
                let quantos = 1;

                item.classList.replace('comprar', 'quantidade');
                item.innerHTML = `
                    <span class="mm" id="menos${idDoObjeto}">-</span> 
                    <span id="num${item.id}">${quantos}</span>
                    <span class="mm" id="mais${idDoObjeto}">+</span>`;

                const divCarrinho = document.createElement('div');
                divCarrinho.classList.add('almost');
                divCarrinho.setAttribute('id', 'carrinho' + idDoObjeto);
                divCarrinho.innerHTML = `
                    <img src="${objAtual.img}" alt="Imagem da roupa">
                    <span class="qtd">${quantos}</span>
                    <span class="preco">R$${(quantos * objAtual.price).toFixed(2).replace('.', ',')}</span>
                    <span class="remover" title="remover produto"><i class="fa-solid fa-trash"></i></span>`;

                aComprar.appendChild(divCarrinho);

                document.getElementById(`mais${idDoObjeto}`).addEventListener('click', (e) => {
                    quantos++;
                    atualizarCarrinho();
                });

                const btDeMenos = document.getElementById(`menos${idDoObjeto}`).addEventListener('click', (e) => {
                    e.stopPropagation();
                    quantos--;
                    if (quantos  === 0) {
                        removerDoCarrinho();

                    } else {
                        atualizarCarrinho();
                    }
                });

                divCarrinho.querySelector('.remover').addEventListener('click', (e) => {
                    e.stopPropagation();
                    removerDoCarrinho();
                });

                function atualizarCarrinho() {
                    divCarrinho.querySelector('.qtd').textContent = quantos;
                    divCarrinho.querySelector('.preco').textContent = `R$${(quantos * objAtual.price).toFixed(2).replace('.', ',')}`;
                    document.getElementById(`num${item.id}`).textContent = quantos;
                };

                function removerDoCarrinho() {
                    divCarrinho.remove();
                    item.classList.replace('quantidade', 'comprar');
                    item.innerHTML = '<i class="fa-solid fa-cart-arrow-down"></i>ADICIONAR AO CARRINHO';
                    carrinhoIds.delete(idDoObjeto);
                }
            });
        }
    });


//Frete
const inputCep = document.getElementById('cep');
const verificarCEP = document.getElementById('verificarLocal')

inputCep.addEventListener('keydown', () => verificarCEP.style.display = 'block');

function removerBtDeVerificarCep() {
    verificarCEP.style.display = 'none';
}


function validarCep(cep) {
    if (/^\d{5}-\d{3}$/.test(cep))  {
        return cep;
    } else if (/^\d{8}$/.test(cep)) {
        const outraStr = cep.slice(0, 5) + '-' + cep.slice(5);
        return outraStr;
    } else {
        alert('Digite um CEP válido!')
    }
}


verificarCEP.addEventListener('click', async () => {
    const cepDigitado = inputCep.value;
    const cepValidado = validarCep(cepDigitado);
    if (!cepValidado) return;

    const distSpan = document.getElementById('dist');

    const distancia = await calcularDistanciaEntreCeps('46575-000', cepDigitado);
    distSpan.textContent =  distancia;

    const valorDoFrete = document.getElementById('valor');
    valorDoFrete.textContent = (distancia * 0.02).toFixed(2).replace('.', ',');

    //Aparecer tudo

    const divDoFrete = document.getElementById('frete');
    divDoFrete.style.display = 'block';
})


