import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthStorageService } from '../../services/storage-service/StorageService';
import { UserType } from '../../models/enums/UserType';

export const RoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return false;

  const userType = AuthStorageService.getUserType();

  console.log('RoleGuard check:', { userType, url: state.url });

  if (!userType) {
    router.navigate(['/login']);
    return false;
  }

  const url = state.url;

  if (url.startsWith('/individual') && userType !== UserType.ROLE_INDIVIDUAL) {
    router.navigate(['/not-found']);
    return false;
  }

  if (url.startsWith('/company') && userType !== UserType.ROLE_COMPANY) {
    router.navigate(['/not-found']);
    return false;
  }

  return true;
};
