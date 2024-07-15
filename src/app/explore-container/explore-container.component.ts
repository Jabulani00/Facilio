import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MaintenanceRequestService } from '../services/maintenance-request.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  

  constructor(
    private modalController: ModalController,
    private maintenanceRequestService: MaintenanceRequestService
  ) {}

  ngOnInit() {
   
  }

  
}
