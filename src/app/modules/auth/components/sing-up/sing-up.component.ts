import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';
import { URL_PATTERN } from 'src/app/core/constants/patterns';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  singUpForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    photo: FormControl<string>;
    firstName: FormControl<string>;
    lastName: FormControl<string>;
  }>;
  canShowForm: boolean = false;

  singUp(): void {
    if (this.singUpForm.valid) {
      const userModel: UserModel = new UserModel(this.singUpForm.value);
      this.authService.singUp(userModel).subscribe((response) => {
        this.sessionService.setCurrentSession(response);
        this.router.navigate(['dashboard', 'playlists', 'list']);
      });
    } else {
      this.markAllAsDirty();
    }
  }

  markAllAsDirty() {
    Object.values(this.singUpForm.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  initForm() {
    this.singUpForm = this.fb.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      photo: new FormControl('', {
        validators: [Validators.required, Validators.pattern(URL_PATTERN)],
        nonNullable: true,
      }),
      firstName: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
    this.canShowForm = true;
  }

  ngOnInit() {
    this.initForm();
  }
}
