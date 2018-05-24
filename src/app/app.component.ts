import { Component } from '@angular/core';
import { AgendaService } from './agenda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _agendaService: AgendaService) {

  }
}
