
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
    console.log(i);
    var li = document.createElement('li');
    li.setAttribute('class','item');
    ul.appendChild(li);

    li.innerHTML=li.innerHTML + " _ ";
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
  console.log(palavra);
  console.log(inputValue.length);
  
  if(inputValue.length === 1) {
    if (palavra.includes(inputValue)) {
      console.log("possui");
    }
  }else{
    if (inputValue === palavra) {
      console.log("acertou");
    }
  }
}

var palavra = "";
fetchRandomWordPtbr().then((result) => {
  palavra = result
  console.log(palavra);
  escritorCodificado(palavra);
});
