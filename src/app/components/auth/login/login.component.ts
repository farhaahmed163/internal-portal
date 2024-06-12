import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  loginSubscription!: Subscription;
  loading: boolean = false;

  constructor(
    private AuthService: AuthService,
    private Router: Router,
    private ToastService: ToastService
  ) {}

  ngOnInit(): void {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    const userData = { ...this.loginForm.value };
    console.log(userData);
    this.loading = true;
    this.loginSubscription = this.AuthService.login(
      userData.email,
      userData.password
    ).subscribe({
      next: (res) => {
        this.loading = false;
        console.log(res);
        this.Router.navigate(['/home']);
        localStorage.setItem('userToken', res.data.token);
        this.ToastService.showSuccess('Welcome To GeekyAir Portal ');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription && this.loginSubscription.closed) {
      this.loginSubscription.unsubscribe();
    }
  }
}
