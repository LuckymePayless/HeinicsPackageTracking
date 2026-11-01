import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  public supabase: SupabaseClient; 
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async signUp(email: string, password: string, fullName: string) {
    return this.supabase.auth.signUp({
      email,
      password,
      options: { data: { fullName } }
    });
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }

  async getCurrentUser() {
  const { data: { user } } = await this.supabase.auth.getUser();
  return user;
}
//   getCurrentUserName(){

//     const user = await this.getCurrentUser();

//     if(!user) return null;
//      return (
//     user.user_metadata?.['fullName'] ||
//     user.user_metadata?.fullName ||
//     user.email?.split('@')[0] ||
//     'User'
//   );
//   }
    async getCurrentUserName(): Promise<string | null> {
      const user = await this.getCurrentUser();

      if (!user) return null;

      return (
        user.user_metadata?.['fullName'] ||
        user.email?.split('@')[0] ||
        'User'
      );
    }
}