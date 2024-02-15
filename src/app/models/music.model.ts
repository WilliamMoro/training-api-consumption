export type Music = {
    id: number;
    author: string;
    name: string;
}

export type MusicCadastrar = Omit<Music, 'id'>;