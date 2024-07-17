import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.page.html',
  styleUrls: ['./admin-dash.page.scss'],
})
export class AdminDashPage implements OnInit {

  menuItems = [
    {
      title: 'Manage System Users',
      description: 'View and manage service details',
      icon: 'information-circle',
      secondaryIcon: 'clipboard',
      route: '/admin-panel'
    },
    {
      title: 'Reported Issues',
      description: 'Reports and tracking of issues',
      icon: 'warning',
      secondaryIcon: 'megaphone',
      route: '/messaging'
    },
    {
      title: 'System Statistsics',
      description: 'See statistics',
      icon: 'construct',
      secondaryIcon: 'hammer',
      route: '/admin-stats'
    },
    

  ];

  constructor(
    private navCtrl: NavController,
    private animationCtrl: AnimationController
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

}
