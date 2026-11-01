import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink} from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonText,
} from '@ionic/angular';

import { SupabaseService } from '../../service/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls:['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonText,RouterLink
  ]
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  errorMsg = '';
  infoMsg = '';       
  needsConfirm = false; 

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async login() {
    this.errorMsg = '';
    this.infoMsg = '';
    this.needsConfirm = false;
    this.loading = true;

    try {
      const { data, error } = await this.supabaseService.signIn(
        this.email,
        this.password
      );

      if (error) {
        if (error.message.includes('email not confirmed')) {
          this.needsConfirm = true;
          throw new Error('Please verify your email first');
        }
        throw error;
      }

      this.infoMsg = '✅ Login successful!';
      setTimeout(() => this.router.navigate(['/home']), 1000);
    } catch (err: any) {
      this.errorMsg = err.message || '❌ Login failed';
    } finally {
      this.loading = false;
    }
  }

  // ✅ Nandito na!
  async forgotPassword() {
    if (!this.email) {
      this.errorMsg = '⚠️ Enter your email first!';
      return;
    }

    try {
      const { error } = await this.supabaseService.supabase.auth.resetPasswordForEmail(
        this.email
      );
      if (error) throw error;
      this.infoMsg = '✅ Password reset link sent! Check your email.';
    } catch (err: any) {
      this.errorMsg = err.message || '❌ Failed to send reset link';
    }
  }

  // ✅ Nandito na!
  async resend() {
    if (!this.email) {
      this.errorMsg = '⚠️ Enter your email first!';
      return;
    }

    try {
      const { error } = await this.supabaseService.supabase.auth.resend({
        type: 'signup',
        email: this.email
      });
      if (error) throw error;
      this.infoMsg = '✅ Verification email resent!';
    } catch (err: any) {
      this.errorMsg = err.message || '❌ Failed to resend';
    }
  }
}