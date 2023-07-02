import { Song } from "../models/song.model"

export interface SongResponse {
    id: number,
    titulo: string,
    artista: string,
    album: string,
    anno: string,
    genero: string
}


export const songAdapter = (song: SongResponse, playlistId: number): Song => {
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