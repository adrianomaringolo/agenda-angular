import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private _restApiURL = 'http://localhost:5000/api/';

  constructor(private _httpClient: HttpClient) { }

  public getTurmas(): Observable<any> {
    return this._httpClient.get(this._restApiURL + 'Turmas');
  }

  public postTurma(item: any): Observable<any> {
    return this._httpClient.post(this._restApiURL + 'Turmas', item);
  }

  public deleteTurma(item: any): Observable<any> {
    return this._httpClient.delete(`${this._restApiURL}Turmas/${item.id}?id=${item.id}`);
  }

  public getProfessores(): Observable<any> {
    return this._httpClient.get(this._restApiURL + 'professores');
  }

  public getCursos(): Observable<any> {
    return this._httpClient.get(this._restApiURL + 'cursos');
  }

}
