let livros = [];

const endpoint = "https://guilhermeonrails.github.io/casadocodigo/livros.json";

getLivros();

async function getLivros() {
  const res = await fetch(endpoint);
  livros = await res.json();
  console.table(livros);
}
