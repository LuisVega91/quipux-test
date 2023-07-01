import { Component } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { Observable, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent {

  canShowButton$: Observable<boolean> = this.router.events.pipe(
    filter(resp => resp instanceof ResolveEnd),
    map((event) => !(event as ResolveEnd).url?.includes('form'))
  )

  constructor(private router: Router) {

  }
}
