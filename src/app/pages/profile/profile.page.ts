import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar ,IonTabs,IonTabBar,IonTabButton, IonButton} from '@ionic/angular';
import { Router } from '@angular/router';
import { SupabaseService } from '../../service/supabase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonTabs,IonTabBar,IonTabButton,IonButton],
})
export class ProfilePage {
  constructor(private route:Router, private supabaseService:SupabaseService) {}
  goToHome(){
    this.route.navigate(["/home"]);
  }
  async logOut(){
    await this.supabaseService.supabase.auth.signOut();
    this.route.navigate(["/login"]);
  }
}
