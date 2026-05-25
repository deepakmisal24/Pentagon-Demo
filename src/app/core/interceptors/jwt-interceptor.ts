import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { TokenService } from '../services/token.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Inject the TokenService using Angular 17's functional injection
  const tokenService = inject(TokenService);

  // 2. Retrieve the current JWT token
  const token = tokenService.getToken();

  // 3. If a token exists, we must clone the request to modify its headers
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // 4. Pass the modified request forward
    return next(clonedReq);
  }

  // 5. If there is no token (e.g., user is not logged in), pass the original request
  return next(req);
};