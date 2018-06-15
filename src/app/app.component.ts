import { Component } from '@angular/core';
import { AgendaService } from './agenda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  turmas: any[];
  professores: any[];
  cursos: any[];

  novaTurma: any = {};

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
    console.log(this.novaTurma);

    this._agendaService.addTurma(form.value).subscribe(
      res => {
        alert(`Turma "${form.value.nome}" adicionada com sucesso`);
        this.novaTurma = {};
        this.findTurmas();
      }
    );
  }

  public deleteTurma(turma): void {
    this._agendaService.deleteTurma(turma).subscribe(
      res => {
        alert(`Turma "${turma.nome}" removida com sucesso`);
        this.findTurmas();
      }
    );
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
