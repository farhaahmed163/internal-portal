import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('userToken');
  const router = inject(Router);
  const toast = inject(ToastService);
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    toast.showWarn('please, Login First !');
    return false;
  }
};
