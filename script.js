
//score saver
if (!localStorage.score) {
  localStorage.clickcount = 0;
} 

//score increment
function scoreUp() {
  localStorage.score = Number(localStorage.score)+1;
  console.log(localStorage.score)
}

//reset score
function scoreReset() {
  localStorage.score = Number(0);
}

async function fetchRandomWordsPtbr() {
  while (true) {
      try {
          const resposta = await fetch("https://api.dicionario-aberto.net/random");
          if (!resposta.ok) throw new Error("Erro ao buscar a palavra");

          const dados = await resposta.json();
          const palavra = dados.word;

          const possuiAcento = /[áàâãéèêíïóòôõúüç]/i.test(palavra);

          if (!possuiAcento) {
              console.log("Palavra encontrada:", palavra);
              break;
          } else {
              console.log("Palavra possui acento, tentando novamente:", palavra);
          }
      } catch (erro) {
          console.error("Erro:", erro.message);
      }
  }
}

fetchRandomWordsPtbr();
