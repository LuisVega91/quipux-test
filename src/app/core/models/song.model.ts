export interface SongBackendPostType {
    titulo: string,
    artista: string,
    album: string,
    anno: string,
    genero: string,
    idListaDeReproduccion: number
}

export interface SongBackendType {
    id: number,
    titulo: string,
    artista: string,
    album: string,
    anno: string,
    genero: string
}


export interface Song {
    id: number,
    title: string,
    artist: string,
    album: string,
    year: string,
    genre: string,
    playlistId: number,
}

export class SongModel implements Song {
    id: number;
    title: string;
    artist: string;
    album: string;
    year: string;
    genre: string;
    playlistId: number;

    constructor(song: Partial<Song>) {
        this.id = song.id ?? 0;
        this.title = song.title ?? '';
        this.artist = song.artist ?? '';
        this.album = song.album ?? '';
        this.year = song.year ?? '';
        this.genre = song.genre ?? '';
        this.playlistId = song.playlistId ?? 0;
    }

    get isValid() {
        if (!this.title) { return false }
        if (!this.artist) { return false }
        if (!this.album) { return false }
        if (!this.year) { return false }
        if (!this.genre) { return false }
        if (!this.playlistId) { return false }

        return true;
    }

    get isInvalid(){
        return !this.isValid
    }

    static fromBackendType(song: SongBackendType, playlistId: number): Song {
        return {
            id: song.id,
            title: song.titulo,
            artist: song.artista,
            album: song.album,
            year: song.anno,
            genre: song.genero,
            playlistId: playlistId
        }
    }

    toBakedTypeForPost(): SongBackendPostType{
        return {
            titulo: this.title,
            artista: this.artist,
            album: this.album,
            anno: this.year,
            genero: this.genre,
            idListaDeReproduccion: this.playlistId,
        }
    }
}