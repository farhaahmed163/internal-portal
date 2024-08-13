import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
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
        localStorage.setItem('BusniessName', res.data.business_name);
        localStorage.setItem('BusniessId', res.data.id);
        this.ToastService.showSuccess('Welcome To GeekyAir Portal ');
      },
      error: (err) => {
        console.log(err);
        this.ToastService.showError(err.error.message);
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription && this.loginSubscription.closed) {
      this.loginSubscription.unsubscribe();
    }
    // if (this.upworkAuthSubscription && this.upworkAuthSubscription.closed) {
    //   this.upworkAuthSubscription.unsubscribe();
    // }
  }
}
