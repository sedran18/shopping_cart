import {calcularDistanciaEntreCeps} from './freteApi.js';
let valorTotal = 0;
let total = document.getElementById('total');
let desconto = false;
let forneceuCep = false;
let produtosComprados = [];

const adicionarALista = (obj) => {
    const index = produtosComprados.findIndex(item => item.id === obj.id);
    if (index !== -1) {
        produtosComprados[index].quantidade++;
    } else {
        produtosComprados.push({ ...obj, quantidade: 1 });
    }
};

const removerDaLista = (obj) =>  {
    const index = produtosComprados.findIndex(item => item.id === obj.id);
    if (index !== -1) {
        if (produtosComprados[index].quantidade > 1) {
            produtosComprados[index].quantidade -= 1;
        } else {
            produtosComprados.splice(index, 1);
        }
    }
};

function atualizarValorTotal() {
    const totalProdutos = produtosComprados.reduce((acc, item) => {
        return acc + (item.price * item.quantidade);
    }, 0);

    valorTotal = totalProdutos; 
    total.textContent = valorTotal.toFixed(2).replace('.', ',');
}



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
            preco.innerHTML = `R$${String(produtos[i].price.toFixed(2)).replace('.', ',')}`;

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
                adicionarALista(objAtual);
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
                atualizarValorTotal(objAtual.price);

                aComprar.appendChild(divCarrinho);

                document.getElementById(`mais${idDoObjeto}`).addEventListener('click', (e) => {
                    quantos++;
                    atualizarCarrinho();
                    atualizarValorTotal(objAtual.price);
                    adicionarALista(objAtual);
                });

                const btDeMenos = document.getElementById(`menos${idDoObjeto}`).addEventListener('click', (e) => {
                    e.stopPropagation();
                    quantos--;
                    if (quantos  === 0) {
                        removerDoCarrinho();
                        atualizarValorTotal(-objAtual.price);
                        removerDaLista(objAtual);

                    } else {
                        atualizarCarrinho();
                        atualizarValorTotal(-objAtual.price);
                        removerDaLista(objAtual);
                    }
                });

                divCarrinho.querySelector('.remover').addEventListener('click', (e) => {
                    e.stopPropagation();
                    removerDoCarrinho();
                    atualizarValorTotal(-objAtual.price);
                    removerDaLista(objAtual);
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
    if (!forneceuCep) {
        const cepDigitado = inputCep.value;
        const cepValidado = validarCep(cepDigitado);
        if (!cepValidado) return;

        const distSpan = document.getElementById('dist');

        const distancia = await calcularDistanciaEntreCeps('46575-000', cepDigitado);
        distSpan.textContent =  distancia;

        const valorDoFrete = document.getElementById('valor');
        valorDoFrete.textContent = (distancia * 0.02).toFixed(2).replace('.', ',');
        atualizarValorTotal(distancia * 0.02)
        //Aparecer tudo

        const divDoFrete = document.getElementById('frete');
        divDoFrete.style.display = 'block';
        forneceuCep = true;
    }
    
})

//Calcular cupom de desconto
const cupons = ['SEDRAN', 'GABRIEL', 'NARDES']


const enviarCupom = document.querySelector('#botaoLupa');

enviarCupom.addEventListener('click', (e) => {
    if (valorTotal === 0)  {
        alert('Escolha o produto primeiro');
        return;
    } 
    if (!desconto) {
        const inputCupom = document.querySelector('#cupom');
        const valorCupom = inputCupom.value.toUpperCase();
        if (!valorCupom) return;
        if(cupons.includes(valorCupom)) {
            desconto = true;
            document.querySelector('.showCupom').style.display = 'flex';
            const nomeDoCupom = document.getElementById('nomeDoCupom');
            nomeDoCupom.textContent = valorCupom;
        } else {
            alert('Cupom Inválido')
        }
}
});


//Calcular o valor total
//Quando clicar no bt de confirmar
const confirmar = document.getElementById('confirmar');
confirmar.addEventListener('click', (e) => {
    if (forneceuCep) {
        if (produtosComprados.length === 0) {
            alert('Compre algum produto');
        } else {
            if (desconto) {
                valorTotal *= 0.8;    
            }
            const qntDeProdutos = produtosComprados.reduce((total, item) => total + item.quantidade, 0);
            alert(`Você comprou ${qntDeProdutos} produtos, total de R$${valorTotal.toFixed(2).replace('.',',')}`);
            location.href='comprou.html'
        }
    } else {
        alert('Forneça o CEP')
    }
    
})