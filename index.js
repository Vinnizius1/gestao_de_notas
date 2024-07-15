const prompt = require("prompt-sync")({ sigint: true });

// Armazena todas as matérias
const materias = [];

/* FUNÇÕES */
function calculaMedia(notas) {
  const soma = notas.reduce(
    (acumulador, notaAtual) => acumulador + notaAtual,
    0
  );
  return soma / notas.length;
}

function criaMateria(ordemDaMateria) {
  console.log("");
  const nome = prompt(`Digite o nome da ${ordemDaMateria + 1}ª matéria: `);
  const notas = [
    prompt("Nota 1: "),
    prompt("Nota 2: "),
    prompt("Nota 3: "),
  ].map(nota => parseFloat(nota));
  const faltas = prompt("Número de faltas: ");

  const media = calculaMedia(notas);

  // Propriedades
  return {
    nome,
    notas,
    faltas,
    media,
  };
}

function capturaMaterias() {
  let numMaterias = +prompt(
    "Quantas matérias você deseja cadastrar (limite de '3')? Pode digitar: "
  );
  console.log("");

  if (numMaterias > 3 || isNaN(numMaterias) || numMaterias <= 0) {
    return console.log("\nNúmero de matérias inválido! Encerrando o programa.");
  }

  for (let i = 0; i < numMaterias; i++) {
    materias.push(criaMateria(i));
  }

  // Verificação para exibir a função "telaFinal()" e ENCERRAR o programa
  if (materias.length === numMaterias) {
    telaFinal();
  }
}

function telaFinal() {
  console.log("\nDados das matérias cadastradas:");
  for (const materia of materias) {
    console.log(`\nMatéria: ${materia.nome}`);
    console.log(`Notas: ${materia.notas.join(", ")}`);
    console.log(`Média: ${materia.media.toFixed(2)}`);
    console.log(`Faltas: ${materia.faltas}`);

    // Verifica se foi APROVADO ou REPROVADO, neste caso mostra o(s) motivo(s) de ser sido REPROVADO
    if (materia.faltas > 5 && materia.media < 6) {
      console.log(
        `Aluno REPROVADO em ${materia.nome} pelo motivo do número de faltas maior que 5 e média inferior a 6`
      );
    } else if (materia.faltas > 5 || materia.media < 6) {
      console.log(
        `Aluno REPROVADO em ${materia.nome} pelo motivo ${
          materia.faltas > 5
            ? `do número de faltas maior que 5.`
            : `da média inferior a 6.`
        }`
      );
    } else {
      console.log(
        `Aluno APROVADO em ${materia.nome} com número de faltas= ${
          materia.faltas
        } e média= ${materia.media.toFixed(2)}`
      );
      console.log("Parabéns!!!");
    }
  }
}

// 1ª função
capturaMaterias();
