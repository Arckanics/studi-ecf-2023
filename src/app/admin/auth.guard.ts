import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const ls = window.localStorage
  if (ls.getItem('user_token')) {
    return true
  }
  return false
};
