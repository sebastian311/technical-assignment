import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from '../../data-access/services/authentication.service';
import * as AuthActions from '../actions/auth-actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.user.username, action.user.password).pipe(
          map((response) => {
            if (response.token) {
              return AuthActions.loginSuccess({
                user: action.user,
                token: response.token,
              });
            } else {
              return AuthActions.loginFail({
                errorMessage: 'No token received',
              });
            }
          }),
          catchError((error) =>
            of(AuthActions.loginFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) =>
        this.authService
          .register(action.user.username, action.user.password)
          .pipe(
            map((response) => {
              if (response.token) {
                return AuthActions.registerSuccess({
                  user: action.user,
                  token: response.token,
                });
              } else {
                return AuthActions.registerFail({
                  errorMessage: 'No token received',
                });
              }
            }),
            catchError((error) =>
              of(AuthActions.registerFail({ errorMessage: error.message }))
            )
          )
      )
    )
  );
}