import { Component,OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonTabs,IonTabBar,IonTabButton, IonList, IonIcon } from '@ionic/angular';
import { Router } from '@angular/router';
import { SupabaseService } from '../service/supabase.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonTabs,IonTabBar,IonTabButton,IonList,IonIcon],
})

export class HomePage implements OnInit{

  timeCategory: string = '';
  usernamePlaceholder: string = '';
  userName: string | null = null;

  constructor(private rout:Router, private supabaseService:SupabaseService) {}

  goToProfile(){
    this.rout.navigate(["/profile"]);
  }

  async ngOnInit() {
    this.userName = await this.supabaseService.getCurrentUserName();

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      this.timeCategory = 'Good morning, ';
    } else if (hour === 12) {
      this.timeCategory = 'Good noon, ';
    } else if (hour >= 13 && hour < 18) {
      this.timeCategory = 'Good afternoon, ';
    } else {
      this.timeCategory = 'Good evening, ';
    }

    const name = this.userName ?? '';
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    this.usernamePlaceholder = this.timeCategory + capitalized;
  }

}
