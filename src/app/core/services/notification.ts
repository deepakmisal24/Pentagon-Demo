import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  showSuccess(message: string): void {
    console.log('SUCCESS:', message);
    // Integrate with a Toast or Snackbar library here
  }

  showError(message: string): void {
    console.error('ERROR:', message);
    // Integrate with a Toast or Snackbar library here
  }
}