import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Replace this with your actual Authentication Service logic
  const token = localStorage.getItem('token'); 

  if (token) {
    // User is authenticated, allow access to the route
    return true;
  } else {
    // User is not authenticated, redirect to the login page
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};