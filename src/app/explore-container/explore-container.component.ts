import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MaintenanceRequestService } from '../services/maintenance-request.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() request: any;
  @Input() name?: string;

  constructor(
    private modalController: ModalController,
    private maintenanceRequestService: MaintenanceRequestService
  ) {}

  ngOnInit() {
    console.log('Modal opened with request:', this.request); // Debug log
  }

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
