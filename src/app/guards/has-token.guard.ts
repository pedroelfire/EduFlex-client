import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { LocalService } from '../shared/storage.service';

interface JwtPayload {
  exp: number; // Expiration time in UNIX format
}

export const hasTokenGuard: CanActivateFn = (route, state) => {
  const localService = inject(LocalService);
  const router = inject(Router);

  const token = localService.getData('token'); 

  if (token) {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp > currentTime) {
        return true;
      } else {
        router.navigate(['auth/login']);
        return false;
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['auth/login']);
    return false;
  }
};
