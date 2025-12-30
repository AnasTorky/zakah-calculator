import { inject, Injector } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {ToastService} from '../../shared/toast/toast-service/toast-service';

const PASS_THROUGH_CODES = [
  'ACCOUNT_NOT_VERIFIED'
];

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);
  const toast = injector.get(ToastService);
  const router = injector.get(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const backendError = error.error;
      const code: string | undefined = backendError?.code;

      // ================= PASS THROUGH =================
      if (code && PASS_THROUGH_CODES.includes(code)) {
        return throwError(() => error);
      }

      // ================= AUTH / SECURITY =================
      switch (code) {
        case 'BAD_CREDENTIALS':
          toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
          return throwError(() => error);

        case 'JWT_NOT_VALID':
        case 'ERR_USER_DISABLED':
          router.navigate(['/login']);
          return throwError(() => error);
      }

      // ================= VALIDATION ERRORS =================
      if (backendError?.validationErrors?.length) {
        const messages = backendError.validationErrors.map((ve: any) => ve.message || 'خطأ في الإدخال.');
        toast.error(messages.join(' | '));
        return throwError(() => error);
      }

      // ================= BUSINESS ERRORS =================
      if (code && backendError?.message) {
        toast.error(backendError.message);
        return throwError(() => error);
      }

      // ================= FALLBACK =================
      toast.error('حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.');
      console.error('HTTP Error Details:', {
        code,
        status: error.status,
        url: req.url,
        method: req.method,
        error: backendError,
      });

      return throwError(() => error);
    })
  );
};
