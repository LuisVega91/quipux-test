import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Credentials } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {
  singInForm!: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  submitForm(): void {
    if (this.singInForm.valid) {
      this.authService.singIn(this.singInForm.value as Credentials).subscribe((response) => {
        this.sessionService.setCurrentSession(response)
        this.router.navigate(['dashboard', 'playlists'])
      })
    } else {
      Object.values(this.singInForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.singInForm = this.fb.group({
      username: new FormControl('luisevegam.91@gmail.com', { validators: [Validators.required], nonNullable: true }),
      password: new FormControl('1q2w3e4r5t', { validators: [Validators.required], nonNullable: true }),
    });
  }
}
