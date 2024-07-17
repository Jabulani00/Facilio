import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sp-dash',
  templateUrl: './sp-dash.page.html',
  styleUrls: ['./sp-dash.page.scss'],
})
export class SpDashPage implements OnInit {

  menuItems = [
    {
      title: 'Updating Taken task',
      description: 'View and manage taken task from dashboard sp page',
      icon: 'information-circle',
      secondaryIcon: 'clipboard',
      route: '/task-status-update'
    },
    {
      title: 'Report Issue',
      description: 'Report and track building issues',
      icon: 'warning',
      secondaryIcon: 'megaphone',
      route: '/report-issue-sp'
    },
    {
      title: 'Maintenance Requests',
      description: 'Manage maintenance requests',
      icon: 'construct',
      secondaryIcon: 'hammer',
      route: '/maintenance-requests-sp'
    },
    {
      title: 'Dashboard',
      description: 'View building analytics and stats',
      icon: 'stats-chart',
      secondaryIcon: 'pie-chart',
      route: '/dashboard-sp'
    },
  

  ];

  constructor(
    private navCtrl: NavController,
    private animationCtrl: AnimationController,
    private authService: AuthenticationService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.animateCards();
  }

  navigateTo(route: string) {
    this.navCtrl.navigateForward(route);
  }

  animateCards() {
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach((card, index) => {
      const animation = this.animationCtrl
        .create()
        .addElement(card)
        .duration(300)
        .delay(index * 100)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(50px)', 'translateY(0)');
      
      animation.play();
    });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.authService.signOut()
              .then(() => {
                this.router.navigate(['/login-registration']);
              })
              .catch(error => {
                console.error('Logout error', error);
                this.showAlert('Logout Failed', 'An error occurred during logout. Please try again.');
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
