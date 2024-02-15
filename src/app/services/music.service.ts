import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Music, MusicCadastrar } from "../models/music.model";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})

export class MusicService {

    private Url = environment.api
      
    constructor(private httpClient: HttpClient) {}
    
    obterMusicas() {
        return this.httpClient.get<Music[]>(this.Url)
    }

    cadastrarMusica(musica: MusicCadastrar) {
        return this.httpClient.post<Music>(this.Url, musica)
    }

    editarMusica(musica: Music) {
        return this.httpClient.put<Music>(`${this.Url}/${musica.id}`, musica)
    }

    remover(id: number) {
        return this.httpClient.delete<void>(`${this.Url}/${id}`);
    }

}