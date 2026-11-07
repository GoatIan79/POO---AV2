class Aluno {
  #notas;

  constructor(nome, nota1, nota2, nota3) {
      this.nome = nome;
      this.#notas = [nota1, nota2, nota3];
  }

  getNotas() {
      return this.#notas;
  }

  setNotas(nota1, nota2, nota3) {
      this.#notas = [nota1, nota2, nota3];
  }

  calculaMedia() {
      let soma = 0;
      for (let i = 0; i < 3; i++) {
          soma += this.#notas[i];
      }
      return soma / 3;
  }

  mostraSituacao() {
      let media = this.calculaMedia();
      if (media >= 7) {
          return "Aprovado";
      } else if (media >= 3) {
          return "Recuperação";
      } else {
          return "Reprovado";
      }
  }
}


class Turma {
  constructor(professor, curso) {
      this.professor = professor;
      this.curso = curso;
      this.alunos = [];
  }

  cadastraAluno(aluno) {
      this.alunos.push(aluno);
  }
}

let turmas = [];
let alunos = [];


function cadastraTurma() {
  let professor = document.getElementById("professor").value;
  let curso = document.getElementById("curso").value;

  if (professor == "" || curso == "") {
      alert("Preencha todos os campos!");
      return;
  }

  let turma = new Turma(professor, curso);
  turmas.push(turma);

  atualizarSelectTurmas();

  document.getElementById("form-turma").reset();
  alert("Turma cadastrada com sucesso!");
}


// ATUALIZAR SELECT DE TURMAS
function atualizarSelectTurmas() {
  let select = document.getElementById("turma-aluno");

  select.innerHTML = "";
  select.disabled = false;

  for (let i = 0; i < turmas.length; i++) {
      let opcao = document.createElement("option");
      opcao.value = i;
      opcao.textContent = turmas[i].curso + " (Prof. " + turmas[i].professor + ")";
      select.appendChild(opcao);
  }
}


// CADASTRO DE ALUNOS
function cadastraAluno() {
  if (turmas.length == 0) {
      alert("Cadastre uma turma primeiro!");
      return;
  }

  let nome = document.getElementById("nome-aluno").value;
  let indice = document.getElementById("turma-aluno").value;

  if (nome == "" || indice === "") {
      alert("Preencha todos os campos e selecione uma turma!");
      return;
  }

  let nota1 = Number(document.getElementById("nota1").value);
  let nota2 = Number(document.getElementById("nota2").value);
  let nota3 = Number(document.getElementById("nota3").value);

  let aluno = new Aluno(nome, nota1, nota2, nota3);
  alunos.push(aluno);

  turmas[indice].cadastraAluno(aluno);
  mostraAlunos();

  document.getElementById("form-aluno").reset();
  alert("Aluno cadastrado com sucesso!");
}


// EXIBIÇÃO DOS ALUNOS
function mostraAlunos() {
  let tabela = document.getElementById("lista-alunos");
  tabela.innerHTML = "";

  for (let i = 0; i < alunos.length; i++) {
      let aluno = alunos[i];

      let notas = aluno.getNotas();
      let media = aluno.calculaMedia();
      let situacao = aluno.mostraSituacao();

      tabela.innerHTML += `
          <tr>
              <td>${aluno.nome}</td>
              <td>${notas[0]}</td>
              <td>${notas[1]}</td>
              <td>${notas[2]}</td>
              <td>${media.toFixed(2)}</td>
              <td>${situacao}</td>
              <td>
                  <button onclick="editaNotas(${i})">
                      Editar
                  </button>
              </td>
          </tr>
      `;
  }
}


// EDIÇÃO DAS NOTAS
function editaNotas(indice) {
  let aluno = alunos[indice];
  let notas = aluno.getNotas();

  let nota1 = prompt("Digite a primeira nota:", notas[0]);
  if (nota1 == null) return;

  let nota2 = prompt("Digite a segunda nota:", notas[1]);
  if (nota2 == null) return;

  let nota3 = prompt("Digite a terceira nota:", notas[2]);
  if (nota3 == null) return;

  aluno.setNotas(
      Number(nota1),
      Number(nota2),
      Number(nota3)
  );

  mostraAlunos();
  alert("Notas atualizadas com sucesso!");
}