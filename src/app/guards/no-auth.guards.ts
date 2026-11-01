import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../service/supabase.service';

export const noAuthGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const { data: { user } } = await supabase.supabase.auth.getUser();
  
  if (user) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};