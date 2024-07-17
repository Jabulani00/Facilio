import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

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