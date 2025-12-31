import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStorageService } from '../../services/storage-service/StorageService';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (AuthStorageService.hasAccessToken()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
