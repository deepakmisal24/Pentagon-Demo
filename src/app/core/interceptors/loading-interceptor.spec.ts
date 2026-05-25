import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
// import { inject } from '@angular/core';
// import { LoadingService } from '../services/loading.service'; 

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // const loadingService = inject(LoadingService);
  
  // Turn on the loading spinner
  // loadingService.show();
  console.log('Show loading spinner...');

  return next(req).pipe(
    finalize(() => {
      // Turn off the loading spinner once the request completes or fails
      // loadingService.hide();
      console.log('...Hide loading spinner');
    })
  );
};