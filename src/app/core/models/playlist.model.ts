import { SongResponse as SongFromBackend, songAdapter } from "../model-adapters/songs.adapter";
import { Song } from "./song.model";

export type PlaylistForCreationType = {
    nombre: string,
    descripcion: string,
    canciones: {
        titulo: string,
        artista: string,
        album: string,
        anno: string,
        genero: string
    }[]
}

export type PlaylistBackendType = {
    id: number;
    nombreLista: string;
    descripcion: string;
    songs: any;
    location: string;
}


export type PlaylistBackendCollectionType = {
    listas: PlaylistBackendType[]
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
    songs: Song[];
    location: string;

    constructor(playlist: Partial<Playlist>) {
        this.id = playlist.id ?? 0;
        this.name = playlist.name ?? '';
        this.description = playlist.description ?? '';
        this.songs = playlist.songs ?? [];
        this.location = playlist.location ?? '';
    }

    static fromBackendTypeCollection(playlistBackendCollection: PlaylistBackendCollectionType): PlaylistModel[] {
        return playlistBackendCollection.listas.map(this.fromBackendType)
    }
    
    static fromBackendType(playlistBackendType: PlaylistBackendType){
        const playlist: Playlist = {
            id: playlistBackendType.id,
            name: playlistBackendType.nombreLista,
            description: playlistBackendType.descripcion,
            songs: playlistBackendType.songs.map((song: SongFromBackend) => songAdapter(song)),
            location: playlistBackendType.location
        }
        return new PlaylistModel(playlist);
    }

    toBakedTypeForPost(): PlaylistForCreationType {
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