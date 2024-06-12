import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  loginSubscription!: Subscription;

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.loginSubscription = this.AuthService.login().subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription && this.loginSubscription.closed) {
      this.loginSubscription.unsubscribe();
    }
  }
}
