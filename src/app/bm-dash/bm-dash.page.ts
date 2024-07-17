import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bm-dash',
  templateUrl: './bm-dash.page.html',
  styleUrls: ['./bm-dash.page.scss'],
})
export class BmDashPage implements OnInit {
  menuItems = [
    {
      title: 'Service Details',
      description: 'View and manage service details',
      icon: 'information-circle',
      secondaryIcon: 'clipboard',
      route: '/service-details'
    },
    {
      title: 'Report Issue',
      description: 'Report and track building issues',
      icon: 'warning',
      secondaryIcon: 'megaphone',
      route: '/report-issue-bm'
    },
    {
      title: 'Maintenance Requests',
      description: 'Manage maintenance requests',
      icon: 'construct',
      secondaryIcon: 'hammer',
      route: '/maintenance-requests-bm'
    },
    {
      title: 'Dashboard',
      description: 'View building analytics and stats',
      icon: 'stats-chart',
      secondaryIcon: 'pie-chart',
      route: '/dashboard-bm'
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