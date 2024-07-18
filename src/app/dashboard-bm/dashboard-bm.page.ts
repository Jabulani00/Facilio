import { Component, OnInit } from '@angular/core';
import { MaintenanceRequestService } from '../services/maintenance-request.service';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-bm',
  templateUrl: './dashboard-bm.page.html',
  styleUrls: ['./dashboard-bm.page.scss'],
})
export class DashboardBmPage implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  filter: string = 'all';

  constructor(private maintenanceRequestService: MaintenanceRequestService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.maintenanceRequestService.getRequests().subscribe(requests => {
      this.requests = requests;
      this.applyFilter();
    });
  }

  segmentChanged(event: any) {
    this.filter = event.detail.value;
    this.applyFilter();
  }

  applyFilter() {
    if (this.filter === 'all') {
      this.filteredRequests = this.requests;
    } else {
      this.filteredRequests = this.requests.filter(request => request.status === this.filter);
    }
  }

  async openModal(request: any) {
    const modal = await this.modalController.create({
      component: RequestModalComponent,
      componentProps: {
        request
      }
    });

    return await modal.present();
  }
}
