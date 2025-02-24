
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

async function fetchRandomWordPtbr() {
  try {
      const resposta = await fetch("https://api.dicionario-aberto.net/random");
      if (!resposta.ok) throw new Error("Erro ao buscar a palavra");

      const dados = await resposta.json();
      return dados.word;
  } catch (erro) {
      console.error("Erro ao buscar a palavra:", erro.message);
      return null;
  }
}


function removerAcentos(palavra) {
  return palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function paraLowerCase(palavra) {
  return palavra.toLowerCase();
}

function acerto() {
  var inputValue = document.getElementById("chuteInput").value;
  console.log(inputValue);
  
}

fetchRandomWordPtbr();
