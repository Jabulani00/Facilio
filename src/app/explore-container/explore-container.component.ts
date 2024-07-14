import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MaintenanceRequestService } from '../services/maintenance-request.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {

  @Input() name?: string;
  @Input() request: any;
  constructor(
    private modalController: ModalController,
    private maintenanceRequestService: MaintenanceRequestService
  ) {}

  approveRequest() {
    this.maintenanceRequestService.updateRequest(this.request.id, { status: 'approved' })
      .then(() => this.modalController.dismiss());
  }

  declineRequest() {
    this.maintenanceRequestService.updateRequest(this.request.id, { status: 'declined' })
      .then(() => this.modalController.dismiss());
  }

  close() {
    this.modalController.dismiss();
  }
}