import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JogosService, Jogos } from '../service/jogos.service';

@Component({
  selector: 'app-jogos',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.scss',
})
export class JogosComponent implements OnInit {
  jogos: Jogos[] = [];
  novoJogo: Jogos = { nome: '', tipo: '', ano: 0 };
  jogoEditando = false;
  idEdicao = 0;

  constructor(private jogosService: JogosService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.jogosService.listar().subscribe(
      (data) => {
        this.jogos = data;
      },
      (error) => {
        console.error('Erro ao listar jogos:', error);
      }
    );
  }

  adicionar(): void {
    if (this.jogoEditando) {
      this.jogosService
        .atualizar(this.idEdicao, this.novoJogo)
        .subscribe(() => {
          this.jogoEditando = false;
          this.novoJogo = { nome: '', tipo: '', ano: 0 };
          this.listar();
        });
    } else {
      this.jogosService.adicionar(this.novoJogo).subscribe(() => {
        this.novoJogo = { nome: '', tipo: '', ano: 0 };
        this.listar();
      });
    }
  }

  editar(jogo: Jogos): void {
    this.novoJogo = { ...jogo };
    this.jogoEditando = true;
    this.idEdicao = jogo.id || 0;
  }

  deletar(id: number): void {
    this.jogosService.deletar(id).subscribe(() => {
      this.listar();
    });
  }
}

export default JogosComponent;
