
import { Song, SongBackendType, SongModel } from "./song.model";

export type PlaylistPostRequestType = {
    nombre: string,
    descripcion: string,
    canciones: Omit<SongBackendType, 'id'>[]
}

export type PlaylistPostResponseType = {
    id: number;
    nombreLista: string;
    descripcion: string;
    songs: SongBackendType[];
    location: string;
}


export type PlaylistGetResponseType = {
    listas: PlaylistPostResponseType[]
}

export interface Playlist {
    id: number,
    name: string,
    description: string,
    songs: Song[],
    location: string
}

export class PlaylistModel implements Playlist {
    id: number;
    name: string;
    description: string;
    songs: SongModel[];
    location: string;

    constructor(playlist: Partial<Playlist>) {
        this.id = playlist.id ?? 0;
        this.name = playlist.name ?? '';
        this.description = playlist.description ?? '';
        this.songs = playlist.songs?.map(song => new SongModel(song)) ?? [];
        this.location = playlist.location ?? '';
    }

    static fromPlaylistGetResponseType(playlistGetResponseType: PlaylistGetResponseType): PlaylistModel[] {
        return playlistGetResponseType.listas.map(this.fromPlaylistPostResponseType)
    }
    
    static fromPlaylistPostResponseType(playlistPostResponseType: PlaylistPostResponseType): PlaylistModel{
        const playlist: Playlist = {
            id: playlistPostResponseType.id,
            name: playlistPostResponseType.nombreLista,
            description: playlistPostResponseType.descripcion,
            songs: playlistPostResponseType.songs.map((song: SongBackendType) => SongModel.fromBackendType(song, playlistPostResponseType.id)),
            location: playlistPostResponseType.location
        }
        return new PlaylistModel(playlist);
    }

    toPostRequestType(): PlaylistPostRequestType {
        return {
            nombre: this.name,
            descripcion: this.description,
            canciones: this.songs.map(song => ({
                titulo: song.title,
                artista: song.artist,
                album: song.album,
                anno: song.year,
                genero: song.genre
            }))
        }
    }
}