import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsComponent } from './playlists.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SongsFormComponent } from './components/songs-form/songs-form.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { PipesModule } from 'src/app/core/pipes/pipes.module';


@NgModule({
  declarations: [
    PlaylistsComponent,
    ListComponent,
    FormComponent,
    SongsFormComponent
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    ReactiveFormsModule,
    NzMessageModule,
    FormsModule,
    NzPopoverModule,
    NzTypographyModule,
    NzPopconfirmModule,
    NzFormModule,
    NzInputModule,
    PipesModule
  ]
})
export class PlaylistsModule { }
