import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStorageService } from '../../services/storage-service/StorageService';

export const permitGuard: CanActivateFn = () => {
  const router = inject(Router);

  // لو المستخدم مسجل دخول → امنعه من صفحات الضيف
  if (AuthStorageService.hasAccessToken()) {
    return router.createUrlTree(['/intro']);
  }

  return true;
};
