import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

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
