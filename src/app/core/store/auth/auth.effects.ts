import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.http.post<{ user: any; token: string }>(`${environment.apiUrl}/auth/login`, credentials).pipe(
          map((res) => AuthActions.loginSuccess({ user: res.user, token: res.token })),
          catchError((err) => of(AuthActions.loginFailure({ error: err?.error?.message || err.message || 'Login failed' })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ payload }) =>
        this.http.post<{ user: any; token: string }>(`${environment.apiUrl}/auth/register`, payload).pipe(
          map((res) => AuthActions.registerSuccess({ user: res.user, token: res.token })),
          catchError((err) => of(AuthActions.registerFailure({ error: err?.error?.message || err.message || 'Registration failed' })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(({ token }) => {
          localStorage.setItem('auth_token', token);
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('auth_token');
          this.router.navigateByUrl('/auth/login');
        })
      ),
    { dispatch: false }
  );
}
