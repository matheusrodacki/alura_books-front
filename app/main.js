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

function filterBooks() {
  const elementoBtn = document.getElementById(this.id);
  const categoria = elementoBtn.value;
  let livrosFiltrados = livros.filter((livro) => livro.categoria == categoria);
  sectionLivros.innerHTML = "";
  showBooks(livrosFiltrados);
}

function showBooks(booksList) {
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
