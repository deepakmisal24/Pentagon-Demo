import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Auto-logout if 401 response returned from api
        localStorage.removeItem('token');
        router.navigate(['/login']);
      } else if (error.status === 403) {
        console.error('Access Denied (403)');
      } else {
        // Handle other global errors (e.g., show a toast notification)
        console.error('An HTTP error occurred:', error.message);
      }
      
      return throwError(() => error);
    })
  );
};