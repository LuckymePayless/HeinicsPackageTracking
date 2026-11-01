import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar ,IonTabs,IonTabBar,IonTabButton, IonButton,IonIcon} from '@ionic/angular';
import { Router } from '@angular/router';
import { SupabaseService } from '../../service/supabase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonTabs,IonTabBar,IonTabButton,IonButton,IonIcon],
})
export class ProfilePage implements OnInit {

  curentUserName: string | null = null;
  currentEmail: string | null = null;


  emailPlaceholde:string = '';
  userNamePlaceholder: string = '';

  constructor(private route:Router, private supabaseService:SupabaseService) {}
  async ngOnInit() {
    this.curentUserName = await this.supabaseService.getCurrentUserName();
    this.currentEmail = await this.supabaseService.getCurrentUserEmail();
    this.emailPlaceholde = this.currentEmail || 'Email not found';
    this.userNamePlaceholder = this.curentUserName ? this.curentUserName.charAt(0).toUpperCase() + this.curentUserName.slice(1) : 'Name not found';
  }

  goToHome(){
    this.route.navigate(["/home"]);
  }
  async logOut(){
    await this.supabaseService.supabase.auth.signOut();
    this.route.navigate(["/login"]);
  }
}
