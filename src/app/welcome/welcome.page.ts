import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  features = [
    { icon: 'business', title: 'Building Management', description: 'Easily manage maintenance requests' },
    { icon: 'construct', title: 'Service Providers', description: 'Connect with qualified professionals' },
    { icon: 'star', title: 'Ratings & Reviews', description: 'Ensure quality service' },
    { icon: 'chatbubbles', title: 'In-app Messaging', description: 'Seamless communication' },
  ];

  constructor(
    private router: Router,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.animateFeatures();
  }

  navigateToLogin() {
    this.router.navigate(['/login-registration']);
  }
  ngAfterViewInit() {
    this.animateFeatures();
  }

  private animateFeatures() {
    this.features.forEach((feature, index) => {
      const element = document.querySelector(`.feature-${index}`);
      if (element) {
        const animation = this.animationCtrl.create()
          .addElement(element)
          .duration(1000)
          .delay(index * 200)
          .fromTo('opacity', '0', '1')
          .fromTo('transform', 'translateY(50px)', 'translateY(0)');
  
        animation.play();
      }
    });
  }

}
