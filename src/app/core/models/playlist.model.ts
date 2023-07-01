import { Song } from './song.model';

export interface Playlists {
    lists: Playlist[]
}

export interface Playlist {
    id: number,
    name: string,
    description: string,
    songs: Song[],
    location: string
}

export class PlaylistModel {
    id: number;
    name: string;
    description: string;
    songs: Song[];
    location: string;

    constructor(playlist: Playlist) {
        this.id = playlist.id;
        this.name = playlist.name;
        this.description = playlist.description;
        this.songs = playlist.songs;
        this.location = playlist.location;
    }
}