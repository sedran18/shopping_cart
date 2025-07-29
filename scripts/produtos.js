//ARQUIVO OBSOLETO

const fs = require('fs');

const produtos = [];

produtos.push({
    id: 0,
    price: 89.90,
    img: 'images/image0.png',
    description: `<p>Perca-se nas ruas iluminadas de uma metrópole que nunca dorme.
     A camiseta "Neon Tóquio" te transporta para o coração de uma noite vibrante no Japão, com a energia pulsante das luzes de neon e a promessa de uma nova descoberta a cada esquina.
    A peça perfeita para quem carrega a alma urbana e o espírito explorador.</p>
    <ul>
    <li>Malha: 100% algodão premium, fio 30.1 penteado.</li>
    <li>Estampa: Impressão digital (DTG) para capturar todos os detalhes luminosos.</li>
    <li>Modelagem: Oversized, com o caimento perfeito para um look street.</li>
    <li>Cor: Preto.</li> 
    </ul>`
});

produtos.push({
    id: 1,
    price: 89.90,
    img: 'images/image1.png',
    description: `
    <p>
        Pegue a estrada para um pôr do sol que nunca termina. A camiseta "Sunset Retrowave" é uma viagem nostálgica aos anos 80, com a estética clássica de grids neon e um sol digital que derrete no horizonte. Perfeita para quem tem uma playlist synthwave na cabeça e um pé no futuro que já passou. Vista essa peça e sinta a brisa de uma noite de verão de 1988.
    </p>
    <ul>
        <li>Malha: 100% algodão premium, fio 30.1 penteado.</li>
        <li>Estampa:  Silkscreen de alta definição e durabilidade.</li>
        <li>Modelagem: Oversized, com o caimento perfeito para um look street.</li>
        <li>Cor: Cinza Mescla.</li> 
    </ul>`
});

produtos.push({
    id: 2,
    price: 99.90,
    img: 'images/image2.png',
    description: `
    <p>
        Por que olhar para as estrelas quando você pode vestir o cosmos? A camiseta "Nébula" captura a beleza estonteante de uma galáxia distante em cores vibrantes e detalhes impressionantes. Uma peça para os sonhadores, os exploradores e todos que sabem que somos feitos de poeira estelar. Deixe seu estilo transcender a atmosfera.
    </p>
    <ul>
        <li>Malha: 100% algodão premium, fio 30.1 penteado.</li>
        <li>Estampa: Impressão digital (DTG) de alta qualidade para máxima fidelidade de cores.</li>
        <li>Modelagem: Oversized, com o caimento perfeito para um look street.</li>
        <li>Cor: Cinza Mescla.</li> 
    </ul>`
});

produtos.push({
    id: 3,
    price: 99.90,
    img: 'images/image3.png',
    description: `
    <p>
        O clássico encontra o tropical, e o surrealismo observa tudo. A camiseta "Colagem Surreal" é uma obra de arte vestível que mistura a perfeição das estátuas greco-romanas com a exuberância da natureza e um olhar enigmático que questiona a realidade. Uma peça para quem tem a mente aberta, um estilo ousado e não tem medo de ser o centro das atenções. Vista o inesperado.
    </p>
    <ul>
        <li>Malha: 100% algodão premium, fio 30.1 penteado.</li>
        <li>Estampa: Impressão digital (DTG) de alta definição, capturando cada detalhe da colagem.</li>
        <li>Modelagem: Oversized, com o caimento perfeito para um look street.</li>
        <li>Cor: Branco</li> 
    </ul>`
});


produtos.push({
    id: 4,
    price: 89.90,
    img: 'images/image4.png',
    description: `
    <p>
        Transforme o básico em uma obra de arte. Inspirada no movimento que revolucionou o mundo, a camiseta "Retrato Pop Art" é uma explosão de cores e atitude. Uma peça para quem não tem medo de se destacar e entende que a moda é uma forma de expressão. Seja a sua própria galeria de arte ambulante.
    </p>
    <ul>
        <li>Malha: 100% algodão premium, fio 30.1 penteado.</li>
        <li>Estampa:  Silkscreen com cores vibrantes e contornos definidos.</li>
        <li>Modelagem: Oversized, com o caimento perfeito para um look street.</li>
        <li>Cor: Off-White.</li> 
    </ul>`
});

produtos.push({
    id: 5,
    price: 89.90,
    img: 'images/image5.png',
    description: `
    <p>
        Das cinzas, a lenda ressurge. A camiseta "Fênix Lendária" captura o poder e a beleza do pássaro mítico em um design impressionante e cheio de detalhes. Simbolizando força, renovação e a imortalidade do estilo, esta peça é para quem enfrenta desafios e renasce ainda mais forte. Vista o poder da lenda.
    </p>
    <ul>
        <li>Malha: 100% algodão premium, fio 30.1 penteado.</li>
        <li>Estampa: Impressão digital (DTG) para capturar a riqueza das cores quentes.</li>
        <li>Modelagem: Oversized, com o caimento perfeito para um look street.</li>
        <li>Cor: Branco</li> 
    </ul>`
});



produtos.push({
    id: 6,
    price: 99.90,
    img: 'images/image6.png',
    description: `
    <p>
        Os detalhes importam. A camiseta "Blueprint Sci-Fi" é para quem aprecia a complexidade e a engenharia por trás das grandes naves espaciais da ficção científica. Com um esquema técnico detalhado e um design arrojado, esta peça não é apenas uma roupa, é uma declaração de amor à cultura geek e ao design futurista. Assuma o comando do seu estilo.
    </p>
    <ul>
        <li>Malha: 100% algodão premium, fio 30.1 penteado.</li>
        <li>Estampa: Silkscreen de alta definição com toques de cor. </li>
        <li>Modelagem: Oversized, com o caimento perfeito para um look street.</li>
        <li>Cor: Azul Marinho</li> 
    </ul>`
});

produtos.push({
    id: 7,
    price: 99.90,
    img: 'images/image7.png',
    description: `
    <p>
        A beleza está na falha. A camiseta "Glitch Clássico" desconstrói uma obra de arte renascentista com a estética caótica e colorida da arte digital corrompida. É um remix visual que celebra o encontro do passado analógico com o presente digital. Perfeita para quem entende que até mesmo os erros podem criar algo novo e fascinante. Uma peça que é um bug no sistema, no melhor sentido da palavra.
    </p>
    <ul>
        <li>Malha: 100% algodão premium, fio 30.1 penteado.</li>
        <li>Estampa: Impressão digital (DTG) de alta resolução para garantir a nitidez da arte e dos pixels.</li>
        <li>Modelagem: Oversized, com o caimento perfeito para um look street.</li>
        <li>Cor: Branco</li> 
    </ul>`
});

produtos.push({
    id: 8,
    price: 99.90,
    img: 'images/image8.png',
    description: `
    <p>
        Nem toda magia está nos livros. A camiseta "Floresta Mágica" revela um segredo noturno da natureza: cogumelos bioluminescentes que brilham com luz própria. Um design místico e envolvente que te convida a explorar o extraordinário no mundo ao nosso redor. Vista o encanto e ilumine seu caminho.
    </p>
    <ul>
        <li>Malha: 100% algodão premium, fio 30.1 penteado.</li>
        <li>Estampa: Impressão digital (DTG) de alta qualidade.. </li>
        <li>Modelagem: Oversized, com o caimento perfeito para um look street.</li>
        <li>Cor: Cinza Chumbo</li> 
    </ul>`
});

const produtosJSON = JSON.stringify(produtos, null, 2);
fs.writeFileSync('produtos.json', produtosJSON);
