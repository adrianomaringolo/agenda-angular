import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private _baseModuleURL = 'http://localhost:5000/';

  constructor() { }
}
