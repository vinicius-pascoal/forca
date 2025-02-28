document.getElementById("pontuacao").innerHTML = localStorage.score
//score saver
if (!localStorage.score) {
  localStorage.score = 0;
} 

//score increment
function scoreUp() {
  localStorage.score = Number(localStorage.score)+1;
  document.getElementById("pontuacao").innerHTML = localStorage.score
  console.log(localStorage.score)
}

//reset score
function scoreReset() {
  localStorage.score = Number(0);
}

function rotacionar(minhaDiv) {
  var div = document.getElementById(minhaDiv);
  div.style.transform = "rotate(360deg)"; // Rotaciona 360 graus
}

async function fetchRandomWordPtbr() {
  try {
      const resposta = await fetch("https://api.dicionario-aberto.net/random");
      if (!resposta.ok) throw new Error("Erro ao buscar a palavra");

      const dados = await resposta.json();
      if (dados.word.length > 6) {
        return fetchRandomWordPtbr()
      }else{
        return dados.word;
      }

  } catch (erro) {
      console.error("Erro ao buscar a palavra:", erro.message);
      return null;
  }
}

function escritorCodificado(secreto) {
  let ul = document.createElement('ul');
  ul.setAttribute('id','proList');
  ul.setAttribute('class' , 'listaUl')
  document.getElementById('listaDiv').appendChild(ul);
  for (let i = 0; i < secreto.length; i++) {
    let li = document.createElement('li');
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
  for (let index = 0; index < palavra.length; index++) {
    if (letra === palavraNASS.charAt(index)) {
      rotacionar("item"+index)
      document.getElementById("item"+index).innerHTML = palavra.charAt(index)
    }
  }
}

function removerAcentos(palavra) {
  return palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function paraLowerCase(palavra) {
  return palavra.toLowerCase();
}

let erros = 0
function contadorErro() {
  if (erros < 6) {
    erros += 1
    desenharForca(erros)
  }else{
    alert("infelizmente perdeu");
    escritorVitoria()
  }
}

function acerto() {
  let inputValue = document.getElementById("chuteInput").value; 
  let inputmini = paraLowerCase(inputValue)
  let inputTratado = removerAcentos(inputmini)
  
  if(inputTratado.length === 1) {
    if (palavra.includes(inputTratado)) {
      colocaLetra(inputTratado)
    }else{
      contadorErro()
      console.log("errou");
    }
  }else{
    if (inputTratado === palavraNASS) {
      escritorVitoria()
      scoreUp()
      alert("acertou");
    }else{
      alert("errou");
    }
  }
}

let input = document.getElementById("chuteInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("chute").click();
  }
});

function desenharForca(tentativa) {
  // Esconde todas as partes
  document.getElementById('cabeça').style.display = 'none';
  document.getElementById('torso').style.display = 'none';
  document.getElementById('braçoEsquerdo').style.display = 'none';
  document.getElementById('braçoDireito').style.display = 'none';
  document.getElementById('pernaDireita').style.display = 'none';
  document.getElementById('pernaEsquerda').style.display = 'none';
  
  // Mostra as partes conforme a tentativa
  if (tentativa >= 1) document.getElementById('cabeça').style.display = 'block';
  if (tentativa >= 2) document.getElementById('torso').style.display = 'block';
  if (tentativa >= 3) document.getElementById('braçoEsquerdo').style.display = 'block';
  if (tentativa >= 4) document.getElementById('braçoDireito').style.display = 'block';
  if (tentativa >= 5) document.getElementById('pernaDireita').style.display = 'block';
  if (tentativa >= 6) document.getElementById('pernaEsquerda').style.display = 'block';
}

let palavra = "";
let palavraNASS = "";
fetchRandomWordPtbr().then((result) => {
  palavra = result
  palavraNASS = removerAcentos(result)
  escritorCodificado(palavra);
});
