import { Playlist, Playlists } from "src/app/core/models/playlist.model"
import { SongResponse, songAdapter } from "./songs.adapter"


export interface PlaylistSourceEntity {
    id: number,
    nombreLista: string,
    descripcion: string,
    songs: SongResponse[],
    location: string
}

export interface PlaylistSourceResponse {
    listas: PlaylistSourceEntity[]
}

export const playlistResponseAdapter = (playlistsResponse : PlaylistSourceResponse): Playlists  => {
    return {
        lists: playlistsResponse.listas.map<Playlist>((playlists)=> playlistAdapter(playlists))
    }
}


export const playlistAdapter = (playLIst: PlaylistSourceEntity): Playlist => {
    return {
        id: playLIst.id,
        name: playLIst.nombreLista,
        description: playLIst.descripcion,
        songs: playLIst.songs.map((song) => songAdapter(song)),
        location: playLIst.location
    }
}





