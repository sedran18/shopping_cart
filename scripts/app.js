const menu = document.getElementById('menu');

fetch ('produtos.json') 
    .then(response => {
        if (!response.ok) throw new Error('Erro ao carregar o JSON');
        return response.json()
    })
    .then(produtos => {
        for (let i =0; i < produtos.length; i++) {
            const produto  = document.createElement('div');
            produto.setAttribute('id', `produto${i}`);
            produto.classList.add('bloco');

            const img = document.createElement('img');
            img.setAttribute('src', produtos[i].img);
            
            produto.appendChild(img);
            menu.appendChild(produto);
        };
        })
