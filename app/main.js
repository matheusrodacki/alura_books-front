let livros = [];

const endpoint = "https://guilhermeonrails.github.io/casadocodigo/livros.json";

getLivros();

const sectionLivros = document.getElementById("livros");
const desconto = 0.3;

async function getLivros() {
  const res = await fetch(endpoint);
  livros = await res.json();
  showBooks(livros);
}

const btnFilterBooks = document.querySelectorAll(".btn");
btnFilterBooks.forEach((botao) => botao.addEventListener("click", filterBooks));

const btnOrderByPrice = document.getElementById("btnOrdenarPorPreco");
btnOrderByPrice.addEventListener("click", orderByPrice);

const elementPriceTotalAvailable = document.getElementById(
  "valor_total_livros_disponiveis"
);

function orderByPrice() {
  let booksOrdered = livros.sort((a, b) => a.preco - b.preco);
  showBooks(booksOrdered);
}

function filterBooks() {
  const elementoBtn = document.getElementById(this.id);
  const categoria = elementoBtn.value;
  let livrosFiltrados =
    categoria == "disponivel"
      ? filterByAvailability()
      : filterByCategory(categoria);
  sectionLivros.innerHTML = "";
  showBooks(livrosFiltrados);
  if (categoria == "disponivel") {
    showAvailablePrice(livrosFiltrados);
  }
}

function filterByCategory(categoria) {
  return livros.filter((livro) => livro.categoria == categoria);
}

function filterByAvailability() {
  return livros.filter((livro) => livro.quantidade > 0);
}

function showAvailablePrice(livros) {
  console.log(livros);
  const total = livros.reduce((acc, livro) => acc + livro.preco, 0).toFixed(2);
  elementPriceTotalAvailable.innerHTML = `
    <div class="livros__disponiveis">
      <p>
        Todos os livros disponíveis por R$
        <span id="valor">R$${total}</span>
      </p>
    </div>
`;
}

function showBooks(booksList) {
  elementPriceTotalAvailable.innerHTML = "";
  sectionLivros.innerHTML = "";
  // prettier-ignore
  booksList.forEach((book) => {
    sectionLivros.innerHTML += `<div class="livro">
    <img class="livro__imagens ${
      book.quantidade <= 0 ? "indisponivel" : ""
    }" src="${book.imagem}" alt="${book.alt}" />
    <h2 class="livro__titulo">
    ${book.titulo}
    </h2>
    <p class="livro__descricao">${book.autor}</p>
    <p class="livro__preco" id="preco">R$${(book.preco - (book.preco * desconto)).toFixed(2)}</p>
    <div class="tags">
      <span class="tag">${book.categoria}</span>
    </div>
  </div>`;
  });
}
