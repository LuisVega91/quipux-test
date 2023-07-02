export interface Song {
    id: number,
    title: string,
    artist: string,
    album: string,
    year: string,
    genre: string
}

export class SongModel implements Song {
    id: number;
    title: string;
    artist: string;
    album: string;
    year: string;
    genre: string;

    constructor(song: Partial<Song>) {
        this.id = song.id ?? 0;
        this.title = song.title ?? '';
        this.artist = song.artist ?? '';
        this.album = song.album ?? '';
        this.year = song.year ?? '';
        this.genre = song.genre ?? '';
    }
}