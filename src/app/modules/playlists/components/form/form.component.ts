import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { PlaylistsService } from '../../services/playlists.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(
    private fb: UntypedFormBuilder,
    private playlistsService: PlaylistsService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: new FormControl<string>('', { validators: [Validators.required] }),
      description: new FormControl<string>('', { validators: [Validators.required] }),
      songs: new FormControl<string>('', { validators: [Validators.required] }),
    });
  }

  save() {
    // this.playlistsService
  }
}