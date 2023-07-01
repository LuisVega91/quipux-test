import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isCollapsed = false;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {

  }

  singOutClickHandler() {
    this.sessionService.cleanCurrentSession()
    this.router.navigate(['/'])
  }
}
