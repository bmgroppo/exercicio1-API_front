import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Jogos{
  id?: number;
  nome: string;
  tipo: string
  ano: number
}

@Injectable({
  providedIn: 'root'
})

export class JogosService {
private apiURL = 'http://localhost:3000/jogos'

  constructor(private http: HttpClient) { }

  listar():Observable<Jogos[]>{
    return this.http.get<Jogos[]>(this.apiURL)
  }
  adicionar(jogos: Jogos): Observable<any>{
    return this.http.post(this.apiURL, jogos)
  }
  atualizar(id: number, jogos: Jogos): Observable<any>{
    return this.http.put(`${this.apiURL}/${id}`, jogos)
  }
  deletar(id: number): Observable<any>{
    return this.http.delete(`${this.apiURL}/${id}`)
  }
}