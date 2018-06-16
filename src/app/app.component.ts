import { Component } from '@angular/core';
import { AgendaService } from './agenda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tituloApp = 'Agenda Angular';

  turmas: any[];
  professores: any[];
  cursos: any[];

  novaTurma: any = {};
  cardTitle = 'Nova turma';

  constructor(private _agendaService: AgendaService) {
    this.findTurmas();
    this.findCursos();
    this.findProfessores();
  }

  private findTurmas(): void {
    this._agendaService.getTurmas().subscribe(
      res => {
        this.turmas = res;
      }
    );
  }

  public onSubmit(form): void {

    // o form está sendo recebido como parâmetro para demonstrar como é possível obter os valores do formulário
    // também dessa forma, mas aqui vamos usar o atributo local novaTurma
    console.log(form.value);

    // se já existe um id significa que é uma edição de item
    if (!this.novaTurma.id) {
      this._agendaService.addTurma(form.value).subscribe(
        res => {
          alert(`Turma "${form.value.nome}" adicionada com sucesso`);
          this.novaTurma = {};
          this.findTurmas();
        }
      );
    } else {
      this._agendaService.updateTurma(this.novaTurma).subscribe(
        res => {
          alert(`Turma "${form.value.nome}" alterada com sucesso`);
          this.novaTurma = {};
          this.findTurmas();
        }
      );
    }
    this.cardTitle = 'Nova turma';

  }

  public deleteTurma(turma): void {
    this._agendaService.deleteTurma(turma).subscribe(
      res => {
        alert(`Turma "${turma.nome}" removida com sucesso`);
        this.findTurmas();
      }
    );
  }

  public cancelOperation(): void {
    this.novaTurma = {};
    this.cardTitle = 'Nova turma';
  }

  public editTurma(turma): void {
    // não podemos fazer a atribuição direta this.novaTurma = turma pois no js os parâmetros são sempre por referência
    // dessa forma, se atribuir diretamente, ao modificar o valor no formulário, o valor da lista também vai mudar.
    // Faça o teste!

    this.novaTurma = {
      id: turma.id,
      nome: turma.nome,
      dataInicio: new Date(turma.dataInicio).toISOString().substring(0, 10), // o input date deve receber uma string com o formato YYYY-MM-DD
      local: turma.local,
      cursoId: turma.cursoId,
      professorId: turma.professorId
    };
    this.cardTitle = 'Editar Turma - ' + turma.nome;
  }

  private findProfessores(): void {
    this._agendaService.getProfessores().subscribe(
      res => {
        this.professores = res;
      }
    );
  }

  private findCursos(): void {
    this._agendaService.getCursos().subscribe(
      res => {
        this.cursos = res;
      }
    );
  }
}
