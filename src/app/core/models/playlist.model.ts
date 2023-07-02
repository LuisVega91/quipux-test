
import { Song, SongBackendType, SongModel } from "./song.model";

export type PlaylistBackendPostType = {
    nombre: string,
    descripcion: string,
    canciones: Omit<SongBackendType, 'id'>[]
}

export type PlaylistBackendType = {
    id: number;
    nombreLista: string;
    descripcion: string;
    songs: SongBackendType[];
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
    songs: SongModel[];
    location: string;

    constructor(playlist: Partial<Playlist>) {
        this.id = playlist.id ?? 0;
        this.name = playlist.name ?? '';
        this.description = playlist.description ?? '';
        this.songs = playlist.songs?.map(song => new SongModel(song)) ?? [];
        this.location = playlist.location ?? '';
    }

    static fromBackendTypeCollection(playlistBackendCollection: PlaylistBackendCollectionType): PlaylistModel[] {
        return playlistBackendCollection.listas.map(this.fromBackendType)
    }
    
    static fromBackendType(playlistBackendType: PlaylistBackendType): PlaylistModel{
        const playlist: Playlist = {
            id: playlistBackendType.id,
            name: playlistBackendType.nombreLista,
            description: playlistBackendType.descripcion,
            songs: playlistBackendType.songs.map((song: SongBackendType) => SongModel.fromBackendType(song, playlistBackendType.id)),
            location: playlistBackendType.location
        }
        return new PlaylistModel(playlist);
    }

    toBakedPostType(): PlaylistBackendPostType {
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