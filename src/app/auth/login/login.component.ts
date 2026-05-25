import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { NotificationService } from '../../core/services/notification';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Inject dependencies using Angular 17 inject()
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  // Strongly typed reactive form
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isSubmitting = false;

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.notification.showSuccess('Welcome back! Login successful.');
        this.router.navigate(['/']); // Navigate to home/catalog
      },
      error: () => {
        // Error toast is already handled globally by our error.interceptor
        this.isSubmitting = false;
      }
    });
  }
}