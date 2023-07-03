import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserModel } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {
  singInForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  singIn(): void {
    if (this.singInForm.valid) {
      const userModel: UserModel = new UserModel(this.singInForm.value)
      this.authService.singIn(userModel).subscribe((response) => {
        this.sessionService.setCurrentSession(response)
        this.router.navigate(['dashboard', 'playlists', 'list'])
      })
    } else {
      this.markAllAsDirty()
    }
  }

  markAllAsDirty(){
    Object.values(this.singInForm.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.singInForm = this.fb.group({
      email: new FormControl('luisevegam.91@gmail.com', { validators: [Validators.required, Validators.email], nonNullable: true }),
      password: new FormControl('1q2w3e4r5t', { validators: [Validators.required], nonNullable: true }),
    });
  }
}
