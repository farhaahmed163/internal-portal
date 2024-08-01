import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  loading: boolean = false;
  signUpform: FormGroup = new FormGroup({
    business_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    full_address: new FormControl('', [Validators.required]),
  });
  constructor(
    private AuthService: AuthService,
    private ToastService: ToastService,
    private Router: Router
  ) {}

  signUp() {
    const signUpData = { ...this.signUpform.value };
    console.log(signUpData);
    this.loading = true;
    this.AuthService.signUp(signUpData).subscribe({
      next: (res) => {
        this.loading = false;
        console.log(res);
        this.ToastService.showSuccess(res.message);
        this.Router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.ToastService.showError(err.error.message);
        console.log(err);
      },
    });
  }
}
