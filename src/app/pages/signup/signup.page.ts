import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { 
  IonContent, IonInput, IonButton, IonCheckbox, 
  IonText
} from '@ionic/angular';
import { SupabaseService } from '../../service/supabase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonInput,
    IonButton, 
    IonCheckbox,
    IonText,
    RouterLink
  ]
})
export class SignupPage {
  fullName = '';
  email = '';
  password = '';
  confirm = '';
  agreeTerms = false;
  
  loading = false;
  errorMsg = '';
  infoMsg = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async register() {
    this.errorMsg = '';
    this.infoMsg = '';

    // Check passwords match
    if (this.password !== this.confirm) {
      this.errorMsg = '⚠️ Passwords do not match!';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMsg = '⚠️ Please agree to terms first!';
      return;
    }

    this.loading = true;

    try {
      const { data, error } = await this.supabaseService.signUp(
        this.email,
        this.password,
        this.fullName
      );

      if (error) throw error;

      this.infoMsg = '✅ Account created! Check your email to verify.';
      
      // Reset form
      this.fullName = '';
      this.email = '';
      this.password = '';
      this.confirm = '';
      this.agreeTerms = false;

      // Redirect to login after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

    } catch (err: any) {
      this.errorMsg = err.message || '❌ Something went wrong';
    } finally {
      this.loading = false;
    }
  }
}