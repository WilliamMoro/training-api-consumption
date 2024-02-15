import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MusicService } from './services/music.service';
import { Music } from './models/music.model';
import { CommonModule, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  //musicas: Music[] = []
  musicas$ = new Observable<Music[]>();

  id = '';
  musica = '';
  autor = '';

constructor(private musicService: MusicService){
  this.obterMusicasCadastradas();
}

  obterMusicasCadastradas() {
    // this.musicService.obterMusicas()
    //   .subscribe(musicas =>  this.musicas = musicas)

    this.musicas$ = this.musicService.obterMusicas();
  }

  buttonClick(){
    if(!this.musica || !this.autor) {
      return;
    }

    if(this.id) {
      this.atualziar()
      return;
    }

    this.musicService.cadastrarMusica({author: this.autor, name: this.musica})
      .subscribe(_ => this.obterMusicasCadastradas())
  }

  preencherCampos(musica: Music) {
    this.id = musica.id!.toString();
    this.musica = musica.name;
    this.autor = musica.author;
  }

  atualziar() {
    this.musicService.editarMusica({ id: parseInt(this.id), author: this.autor, name: this.musica})
      .subscribe(_ => this.obterMusicasCadastradas())
  }

  remover(id: number) {
    this.musicService.remover(id)
      .subscribe(_ => this.obterMusicasCadastradas());
  }

}
