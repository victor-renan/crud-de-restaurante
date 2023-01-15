document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/cardapio")
    .then(response => response.json())
    .then(cardapio => {
        console.log(cardapio)
        cardapio.forEach(elemento => {
            //Gera um prato individual
            let prato = document.createElement("div");
            prato.className = "prato"

            //Carrega os dados da API
            let imagem = document.createElement("img");
            imagem.src = elemento.imagem;
            imagem.className = "prato__imagem";

            let text = document.createElement("div");
            text.className = "prato__text"

            let nome = document.createElement("h1");
            nome.className = "prato__nome";
            nome.innerHTML = elemento.nome;

            let descricao = document.createElement("p");
            descricao.className = "prato__descricao";
            descricao.innerHTML = elemento.descricao;

            let preco = document.createElement("b");
            preco.className = "prato__preco";
            preco.innerHTML = "R$" + elemento.preco;

            let btn = document.createElement("button");
            btn.innerHTML = "Comprar";
            btn.className = "prato__btn";

            let button = document.createElement("but");
            button.innerHTML = "Deletar";
            button.className = "prato__delete";
            
            document.querySelector(".prato__delete");
            addEventListener("click", () => {
                res.redirect("deletar/{{id}}")
            });

            let title = document.createElement("h2");
            title.innerHTML = "titulo";
            title.className = "prato_title";

            text.append(nome, descricao, preco,);
            prato.append(imagem, text, btn, button,);
            document.querySelector("#products-view").append(prato);
        })
    })
})
