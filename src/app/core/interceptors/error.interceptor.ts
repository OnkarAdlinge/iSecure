import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const injector = inject(Injector);

  // Skip refresh-token requests
  if (req.url.includes('/refresh-token')) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized. Please log in to continue';
          router.navigate(['/login']);
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later';
          break;
      }

      // Lazy Toastr injection
      const toastr = injector.get(ToastrService);
      toastr.error(errorMessage);

      return throwError(() => ({
        message: errorMessage,
        status: error.status,
        originalError: error
      }));
    })
  );
};
