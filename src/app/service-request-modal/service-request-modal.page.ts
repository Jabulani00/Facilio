import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-service-request-modal',
  templateUrl: './service-request-modal.page.html',
  styleUrls: ['./service-request-modal.page.scss'],
})
export class ServiceRequestModalPage implements OnInit {
  @Input() serviceProvider: any;
  service: string = '';
  description: string = '';
  dateTime: string = '';
  locationAddress: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async submitServiceRequest() {
    const request = {
      serviceProviderId: this.serviceProvider.id,
      serviceProviderName: `${this.serviceProvider.name} ${this.serviceProvider.surname}`,
      serviceProviderEmail: this.serviceProvider.email,
      serviceProviderPhoneNumber: this.serviceProvider.phoneNumber,
      service: this.service,
      description: this.description,
      dateTime: this.dateTime,
      locationAddress: this.locationAddress,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.modalController.dismiss(request);
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}
