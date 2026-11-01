import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../service/supabase.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const { data: { user } } = await supabase.supabase.auth.getUser();
  
  if (user) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};