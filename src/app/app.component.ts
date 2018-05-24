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

  private deleteTurma(turma): void {
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
