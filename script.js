async function fetchRamdonWordsPtbr() {
  try {
      const resposta = await fetch("https://api.dicionario-aberto.net/random");
      if (!resposta.ok) throw new Error("Erro ao buscar a palavra");

      const dados = await resposta.json();
      console.log("Palavra:", dados.word);
  } catch (erro) {
      console.error("Erro:", erro.message);
  }
}
fetchRamdonWordsPtbr();
