

function mostrarExercicio(id) {

    const exercicios = document.querySelectorAll('.container');
    exercicios.forEach(ex => ex.style.display = 'none');


    const selecionado = document.getElementById(id);
    if (selecionado) {
        selecionado.style.display = 'block';
    }
}


const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputPeso = event.target.querySelector('#peso');
    const inputAltura = event.target.querySelector('#altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    if (!peso) {
        setResultado('Peso invalido', false, 'resultado-imc');
        return;
    }

    if (!altura) {
        setResultado('Altura invalida', false, 'resultado-imc');
        return;
    }

    const imc = getImc(peso, altura);
    const nivelImc = getNivelImc(imc);

    const mensagem = `Seu IMC é ${imc} (${nivelImc}).`;

    setResultado(mensagem, true, 'resultado-imc');
});

function getNivelImc(imc) {
    const nivel = ['Abaixo peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1',
        'Obesidade grau 2', 'Obesidade grau 3'
    ];

    if (imc >= 39.9) {
        return nivel[5];
    } else if (imc >= 34.9) {
        return nivel[4];
    } else if (imc >= 29.9) {
        return nivel[3];
    } else if (imc >= 24.9) {
        return nivel[2];
    } else if (imc >= 18.5) {
        return nivel[1];
    } else if (imc < 18.5) {
        return nivel[0];
    }

}

function getImc(peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}


// verificador de numero positivo ou negativo 


const verificador = document.querySelector('#numerico');

verificador.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputEntrada = event.target.querySelector('#entrada');

    const numeroEntrada = Number(inputEntrada.value);


    if (isNaN(numeroEntrada)) {
        setResultado('Entrada invalida', false, 'resultado-verificador');
        return;
    }


    const resultadoFinal = getResultado(numeroEntrada);

    const mensagem = `Seu numero é  ${resultadoFinal}.`;

    setResultado(mensagem, true, 'resultado-verificador');
});

function getResultado(num) {
    const nivel = ['positivo', 'negativo', 'zero'];

    if (num > 0) {
        return nivel[0];
    } else if (num < 0) {
        return nivel[1];
    } else if (num === 0) {
        return nivel[2];
    }

}


function criaP() {
    const p = document.createElement('p');
    return p;
}

function setResultado(mensagem, isValid, resultadoId) {
    const resultado = document.querySelector(`#${resultadoId}`);
    resultado.innerHTML = '';

    const p = criaP();

    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = mensagem;
    resultado.appendChild(p);
}

// Tabuada 


const tabuada = document.querySelector('#tabuada');

tabuada.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputTabuada = event.target.querySelector('#entradaTabuada');

    const numeroTabuada = Number(inputTabuada.value);


    if (isNaN(numeroTabuada) || numeroTabuada < 0) {
        setResultado('Entrada invalida', false, 'resultado-tabuada');
        return;
    }


    const resultadoTabuada = getTabuada(numeroTabuada);

    const mensagem = ` ${resultadoTabuada}`;

    setResultado(mensagem, true, 'resultado-tabuada');
});

function getTabuada(numeroTabuada) {
    let tabuada = '<ul>';
    for (let i = 1; i <= 10; i++) {
        tabuada += `<li>${numeroTabuada} x ${i} = ${numeroTabuada * i}</li>`;
    }
    tabuada += '</ul>';
    return tabuada;
}


// MEDIA DA NOTA ALUNO SE FOI APROVADO OU NAO



const media = document.querySelector('#mediaAluno');

media.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputProvaUm = event.target.querySelector('#provaUm');
    const provaUm = Number(inputProvaUm.value);

    const inputProvaDois = event.target.querySelector('#provaDois');
    const provaDois = Number(inputProvaDois.value);

    const inputProvaTres = event.target.querySelector('#provaTres');
    const provaTres = Number(inputProvaTres.value);


    if (isNaN(provaUm)) {
        setResultado('Entrada invalida', false, 'resultado-aluno');
        return;
    }
    if (isNaN(provaDois)) {
        setResultado('Entrada invalida', false, 'resultado-aluno');
        return;
    }
    if (isNaN(provaTres)) {
        setResultado('Entrada invalida', false, 'resultado-aluno');
        return;
    }

    const resultadoMedia = getMedia(provaUm, provaDois, provaTres);
    const resultadoAluno = getAluno(resultadoMedia);

    const mensagem = ` nota do aluno: ${resultadoMedia}.  ${resultadoAluno}`;

    setResultado(mensagem, true, 'resultado-aluno');
});

function getMedia(provaUm, provaDois, provaTres) {
    const nota = (provaUm + provaDois + provaTres) / 3;
    return nota.toFixed(2);
}


function getAluno(resultadoAluno) {
    const nivel = ['aprovado', 'reprovado'];

    if (resultadoAluno > 6) {
        return nivel[0];
    } else {
        return nivel[1];
    }
}


//  COMBUSTIVEL MAIS VANTAJOSO

const combustivel = document.querySelector('#fuelForm');

combustivel.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputGasolina = event.target.querySelector('#precoGasolina');
    const valorGasolina = Number(inputGasolina.value);

    const inputAlcool = event.target.querySelector('#precoAlcool');
    const valorAlcool = Number(inputAlcool.value);

    if (!valorGasolina || valorGasolina < 0) {
        setResultado(false);
        return;
    }
    if (!valorAlcool || valorAlcool < 0) {
        setResultado(false);
        return;
    }

    const calculoCombustivel = getCombustivel(valorAlcool, valorGasolina);

    trocarImagem(calculoCombustivel);
});


function getCombustivel(valorAlcool, valorGasolina) {
    const porcentagem = valorAlcool / valorGasolina;
    return porcentagem <= 0.7 ? 'etanol' : 'gasolina';
}

function trocarImagem(combustivel) {
    const img = document.getElementById('imgCombustivel');

    const caminho = {
        'etanol': 'assets/img/etanol.png',
        'gasolina': 'assets/img/gasolina.png',
        'neutro': 'assets/img/neutro.png',
    }
    img.src = caminho[combustivel] || caminho.neutro;
}


btnLimpar.addEventListener('click', function () {
    combustivel.reset();
    trocarImagem('neutro');
});


// JOGO DO DADOS


const jogoDados = document.querySelector('#formDado');

jogoDados.addEventListener('submit', function (event) {
    event.preventDefault();

    const calculoDado = getDado();
    trocarImagemDado(calculoDado);
});

function getDado(event) {
    return Math.floor(Math.random() * 6 + 1);
}


function trocarImagemDado(dado) {
    const img = document.getElementById('imgDado');

    switch (dado) {
        case 0:
            img.src = 'assets/img/face1.png';
            break;
        case 1:
            img.src = 'assets/img/face2.png';
            break;
        case 2:
            img.src = 'assets/img/face3.png';
            break;
        case 3:
            img.src = 'assets/img/face4.png';
            break;
        case 4:
            img.src = 'assets/img/face5.png';
            break;
        case 5:
            img.src = 'assets/img/face6.png';
            break;
        default:
            img.src = 'assets/img/face1.png';
    }
}

// CADASTRO SIMPLES


const cadastroSimples = document.querySelector('#cadastroSimplesPessoa');

cadastroSimples.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputNome = event.target.querySelector('#nomeCadastro');
    const nomeCadastro = inputNome.value.trim();

    const inputEmail = event.target.querySelector('#emailCadastro');
    const emailCadastro = String(inputEmail.value);

    const inputCpf = event.target.querySelector('#cpfCadastro');
    const cpfCadastro = Number(inputCpf.value);

    const inputIdade = event.target.querySelector('#idadeCadastro');
    const idadeCadastro = Number(inputIdade.value);


    if (nomeCadastro === '' || !/^[a-zA-ZÀ-ÿ\s]+$/.test(nomeCadastro)) {
        setResultado('Nome inválido', false, 'resultado-cadastro'); 
        return;
    }

    if (emailCadastro === '' || !emailCadastro.includes('@')) {
        setResultado('Email inválido', false, 'resultado-cadastro');
        return;
    }

    if (isNaN(cpfCadastro) || cpfCadastro < 0) {
        setResultado('Entrada invalida cpf', false, 'resultado-cadastro');
        return;
    }

    if (isNaN(idadeCadastro) || idadeCadastro < 0) {
        setResultado('Entrada invalida idade', false, 'resultado-cadastro');
        return;
    }    

    const mensagem = ` Nome: ${nomeCadastro}.<br>
    Email: ${emailCadastro}.<br>
    CPF: ${cpfCadastro}.<br>
    Idade: ${idadeCadastro}. 
    `;

    setResultado(mensagem, true, 'resultado-cadastro');
});


// ANALISE DE VETORES


const formAnalise = document.querySelector('#formAnalise');
const listaNumeros = document.querySelector('#listaNumeros');
const resultadoDiv = document.querySelector('#resultado-analise');
const vetor = []; 

formAnalise.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputNumero = event.target.querySelector('#numeroEntrada');
    const numeroCadastrado = Number(inputNumero.value);

    if (isNaN(numeroCadastrado)) {
        setResultado('Entrada inválida. Digite um número.', false, 'resultado-analise');
        return;
    }

    if (vetor.length < 10) {
        vetor.push(numeroCadastrado);

        const item = document.createElement('li');
        item.textContent = `Número ${vetor.length}: ${numeroCadastrado}`;
        listaNumeros.appendChild(item);

        inputNumero.value = '';
        inputNumero.focus();
    }

    if (vetor.length === 10) {
        const resultadoAnalise = analisarVetor(vetor);

        const mensagem = `
            <strong>Análise Final:</strong><br>
            Total de Positivos: ${resultadoAnalise.positivos}<br>
            Total de Negativos: ${resultadoAnalise.negativos}<br>
            Total de Pares: ${resultadoAnalise.pares}<br>
            Total de Ímpares: ${resultadoAnalise.impares}<br>
            Ordem Inversa: ${resultadoAnalise.inverso.join(', ')}
        `;

        setResultado(mensagem, true, 'resultado-analise');
        inputNumero.disabled = true; 
        event.target.querySelector('button').disabled = true;
    }
});

function analisarVetor(vetor) {
    let positivos = 0;
    let negativos = 0;
    let pares = 0;
    let impares = 0;

    for (const numero of vetor) {
        if (numero >= 0) positivos++;
        else negativos++;

        if (numero % 2 === 0) pares++;
        else impares++;
    }

    const inverso = [...vetor].reverse();

    return { positivos, negativos, pares, impares, inverso };
}


const reiniciarBtn = document.querySelector('#reiniciarBtn');

reiniciarBtn.addEventListener('click', function () {
    vetor.length = 0; 
    listaNumeros.innerHTML = '';
    resultadoDiv.innerHTML = '';
    document.querySelector('#numeroEntrada').value = '';
    document.querySelector('#numeroEntrada').disabled = false;
    formAnalise.querySelector('button[type="submit"]').disabled = false;
    document.querySelector('#numeroEntrada').focus();
});


// cadastro vetor pessoas


const nomes = [];
const cidades = [];
const idades = [];
const sexos = [];

const formCadastroPessoas = document.querySelector('#formCadastroPessoas');
const resultadoCadastroPessoas = document.querySelector('#resultado-cadastro-pessoas');

formCadastroPessoas.addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.querySelector('#nomePessoa').value.trim();
  const cidade = document.querySelector('#cidadePessoa').value.trim();
  const idade = parseInt(document.querySelector('#idadePessoa').value, 10);
  const sexo = document.querySelector('#sexoPessoa').value;


  if (!nome || !cidade || isNaN(idade) || !sexo) {
    setResultado('Por favor, preencha todos os campos corretamente.', false, 'resultado-cadastro-pessoas');
    return;
  }


  nomes.push(nome);
  cidades.push(cidade);
  idades.push(idade);
  sexos.push(sexo);


  formCadastroPessoas.reset();

  if (nomes.length === 10) {
    exibirResultados();

    formCadastroPessoas.querySelectorAll('input, select, button[type="submit"]').forEach(el => el.disabled = true);
  } else {
    setResultado(`Pessoa cadastrada com sucesso! Total cadastrados: ${nomes.length}/10`, true, 'resultado-cadastro-pessoas');
  }
});


function exibirResultados() {
  let resultado = '<h3>Resultados do Cadastro:</h3>';


  resultado += '<p><strong>1. Nomes e Idades:</strong></p><ul>';
  for (let i = 0; i < nomes.length; i++) {
    resultado += `<li>${nomes[i]} - ${idades[i]} anos</li>`;
  }
  resultado += '</ul>';

  resultado += '<p><strong>2. Pessoas que moram em Santos:</strong></p><ul>';
  for (let i = 0; i < cidades.length; i++) {
    if (cidades[i].toLowerCase() === 'santos') {
      resultado += `<li>${nomes[i]}</li>`;
    }
  }
  resultado += '</ul>';

  resultado += '<p><strong>3. Pessoas com mais de 18 anos:</strong></p><ul>';
  for (let i = 0; i < idades.length; i++) {
    if (idades[i] > 18) {
      resultado += `<li>${nomes[i]}</li>`;
    }
  }
  resultado += '</ul>';


  const qtdMasculinos = sexos.filter(sexo => sexo === 'masculino').length;
  resultado += `<p><strong>4. Quantidade de pessoas do sexo masculino:</strong> ${qtdMasculinos}</p>`;

  setResultado(resultado, true, 'resultado-cadastro-pessoas');
}


const reiniciarCadastroBtn = document.querySelector('#reiniciarCadastro');
reiniciarCadastroBtn.addEventListener('click', function () {

  nomes.length = 0;
  cidades.length = 0;
  idades.length = 0;
  sexos.length = 0;

  formCadastroPessoas.reset();
  resultadoCadastroPessoas.innerHTML = '';

  formCadastroPessoas.querySelectorAll('input, select, button[type="submit"]').forEach(el => el.disabled = false);
});


// GERAR O FIBONACCI

const btnFibonacci = document.querySelector('#btnFibonacci');

btnFibonacci.addEventListener('click', function () {
  const ul = document.querySelector('#resultado-fibonacci');
  ul.innerHTML = ''; 

  let a = 0, b = 1;

  for (let i = 0; i < 150; i++) {
    const li = document.createElement('li');
    li.textContent = a;
    ul.appendChild(li);

    const temp = a + b;
    a = b;
    b = temp;
  }
});


//NUMERO PRIMOS

document.querySelector('#formPrimo').addEventListener('submit', function (e) {
    e.preventDefault();
    const numero = parseInt(document.querySelector('#inputPrimo').value);
    const saida = document.querySelector('#resultado-primo');
  
    if (numero < 2) {
      saida.innerText = "Não é primo.";
      return;
    }
  
    for (let i = 2; i <= Math.sqrt(numero); i++) {
      if (numero % i === 0) {
        saida.innerText = "Não é primo.";
        return;
      }
    }
    saida.innerText = "É primo!";
  });

  
  // MES POR NUMERO

  document.querySelector('#formMes').addEventListener('submit', function (e) {
    e.preventDefault();
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const numero = parseInt(document.querySelector('#inputMes').value);
    const resultado = document.querySelector('#resultado-mes');
  
    if (numero >= 1 && numero <= 12) {
      resultado.innerText = `Mês: ${meses[numero - 1]}`;
    } else {
      resultado.innerText = 'Não existe mês com este número.';
    }
  });


  //DATA POR EXTENSO

  document.querySelector('#formData').addEventListener('submit', function (e) {
    e.preventDefault();
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
                   'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  
    const data = document.querySelector('#inputData').value;
    const [dia, mes, ano] = data.split('/');
    const resultado = document.querySelector('#resultado-data');
  
    if (dia && mes && ano && !isNaN(dia) && !isNaN(mes) && !isNaN(ano)) {
      const mesNome = meses[parseInt(mes) - 1];
      if (mesNome) {
        resultado.innerText = `${parseInt(dia)} de ${mesNome} de ${ano}`;
      } else {
        resultado.innerText = 'Mês inválido.';
      }
    } else {
      resultado.innerText = 'Formato inválido.';
    }
  });
  
// CONTADOR DE CLIQUES

let contador = 0;
const spanContador = document.querySelector('#contador');

document.querySelector('#btnClique').addEventListener('click', () => {
  contador++;
  spanContador.innerText = contador;
});

document.querySelector('#btnResetar').addEventListener('click', () => {
  contador = 0;
  spanContador.innerText = contador;
});


//LISTA DE TAREFAS

document.querySelector('#formTarefa').addEventListener('submit', function (e) {
    e.preventDefault();
    const texto = document.querySelector('#inputTarefa').value.trim();
    const ul = document.querySelector('#lista-tarefas');
  
    if (texto) {
      const li = document.createElement('li');
      li.innerText = texto;
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        li.style.textDecoration = li.style.textDecoration === 'line-through' ? '' : 'line-through';
      });
      ul.appendChild(li);
      document.querySelector('#inputTarefa').value = '';
    }
  });
  