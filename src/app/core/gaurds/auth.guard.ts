import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  // its just an example we can change this logic as per roles of the user present in db.
  if (user?.role === 'sales representative' || user?.role === 'manager') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
