import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ServiceRequestModalPage } from '../service-request-modal/service-request-modal.page';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
  serviceProviders: any[] = [];
  selectedServiceProvider: any;
  service: string = '';
  description: string = '';
  dateTime: string = '';
  locationAddress: string = '';

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.fetchServiceProviders();
  }

  fetchServiceProviders() {
    this.firestore
      .collection('users', (ref) => ref.where('userType', '==', 'sp'))
      .valueChanges()
      .subscribe(
        (data: any[]) => {
          this.serviceProviders = data;
        },
        (error) => {
          console.error('Error fetching service providers:', error);
        }
      );
  }

  async openServiceRequestModal(serviceProvider: any) {
    this.selectedServiceProvider = serviceProvider;
    const modal = await this.modalController.create({
      component: ServiceRequestModalPage,
      componentProps: { serviceProvider: this.selectedServiceProvider }
    });
    await modal.present();
  }

  async submitServiceRequest(serviceProvider: any) {
    const loading = await this.loadingController.create({
      message: 'Submitting Request...',
    });
    await loading.present();

    try {
      const request = {
        serviceProviderId: serviceProvider.id,
        serviceProviderName: `${serviceProvider.name} ${serviceProvider.surname}`,
        serviceProviderEmail: serviceProvider.email,
        serviceProviderPhoneNumber: serviceProvider.phoneNumber,
        service: this.service,
        description: this.description,
        dateTime: this.dateTime,
        locationAddress: this.locationAddress,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await this.firestore.collection('serviceRequests').add(request);

      this.showAlert('Request Submitted', 'Your service request has been submitted.');

      this.service = '';
      this.description = '';
      this.dateTime = '';
      this.locationAddress = '';

      await this.modalController.dismiss();
    } catch (error) {
      console.error('Error submitting service request:', error);
      this.showAlert('Request Submission Failed', 'An error occurred while submitting your request.');
    } finally {
      await loading.dismiss();
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}
