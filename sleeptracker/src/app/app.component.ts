
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService, private navCtrl: NavController) {
   ;
  }
  async ngOnInit() {
    const isFirstTime = await this.userService.isFirstTimeUser();
    if (isFirstTime) {
      this.navCtrl.navigateRoot('/intro');
    } else {
      this.navCtrl.navigateRoot('/tabs/home');
    }
  }
}
