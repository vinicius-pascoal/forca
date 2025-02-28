
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

function escritorCodificado(secreto) {
  var ul = document.createElement('ul');
  ul.setAttribute('id','proList');
  ul.setAttribute('class' , 'listaUl')
  document.getElementById('listaDiv').appendChild(ul);
  for (let i = 0; i < secreto.length; i++) {
    var li = document.createElement('li');
    li.setAttribute('class','item');
    li.setAttribute('id', "item"+i );
    ul.appendChild(li);

    li.innerHTML=li.innerHTML + " _ ";
  }
}

function escritorVitoria() {
  for (let index = 0; index < palavra.length; index++) {
    document.getElementById("item"+index).innerHTML = palavra.charAt(index)
  }
}

function colocaLetra(letra) {
  var posicao = palavra.indexOf(letra);
  document.getElementById("item"+posicao).innerHTML = letra
  console.log(posicao);
}

function removerAcentos(palavra) {
  return palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function paraLowerCase(palavra) {
  return palavra.toLowerCase();
}

function acerto() {
  var inputValue = document.getElementById("chuteInput").value; 
  
  if(inputValue.length === 1) {
    if (palavra.includes(inputValue)) {
      colocaLetra(inputValue)
      console.log("possui");
    }else{
      console.log("errou");
    }
  }else{
    if (inputValue === palavra) {
      escritorVitoria()
      console.log("acertou");
    }else{
      console.log("errou");
    }
  }
}

var palavra = "";
fetchRandomWordPtbr().then((result) => {
  palavra = result
  console.log(palavra);
  escritorCodificado(palavra);
});
