import { Component, OnInit } from '@angular/core';
import { MaintenanceRequestService } from '../services/maintenance-request.service';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-dashboard-sp',
  templateUrl: './dashboard-sp.page.html',
  styleUrls: ['./dashboard-sp.page.scss'],
})
export class DashboardSpPage implements OnInit {
  maintenanceRequests: any[] = [];
  filteredRequests: any[] = [];
  selectedFilter: string = 'All';
  searchTerm: string = '';

  maintenanceTypes = [
    'All',
    'Plumbing Issues',
    'Electrical Issues',
    'HVAC Issues',
    'Structural Issues',
    'Appliance Issues',
    'Safety Issues',
    'General Maintenance',
    'Water Damage'
  ];

  constructor(
    private maintenanceRequestService: MaintenanceRequestService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.fetchMaintenanceRequests();
  }

  fetchMaintenanceRequests() {
    this.maintenanceRequestService.getRequests().subscribe((requests: any[]) => {
      this.maintenanceRequests = requests;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredRequests = this.maintenanceRequests.filter(request => {
      const matchesType = this.selectedFilter === 'All' || request.type === this.selectedFilter;
      const matchesSearch = !this.searchTerm || request.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const isNotPendingOne = request.progress !== 'pendingOne';
      return matchesType && matchesSearch && isNotPendingOne;
    });
  }

  onFilterChange() {
    this.applyFilter();
  }

  getIconForType(type: string): string {
    const iconMap: { [key: string]: string } = {
      'Plumbing Issues': 'water-outline',
      'Electrical Issues': 'flash-outline',
      'HVAC Issues': 'thermometer-outline',
      'Structural Issues': 'build-outline',
      'Appliance Issues': 'hardware-chip-outline',
      'Safety Issues': 'shield-checkmark-outline',
      'General Maintenance': 'construct-outline',
      'Water Damage': 'water-outline'
    };
    return (type in iconMap) ? iconMap[type] : 'construct-outline';
  }

  async openGallery(images: string[]) {
    if (images && images.length > 0) {
      await Browser.open({ url: images[0] });
    }
  }

  async takeIssue(request: any) {
    const modal = await this.modalController.create({
      component: ExploreContainerComponent,
      componentProps: {
        request: request
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // Update the request with the new data
        this.updateRequest(request.id, result.data);
      }
    });

    return await modal.present();
  }

  updateRequest(requestId: string, newData: any) {
    console.log('Updating request:', requestId);
    console.log('New data:', newData);
  
    // Remove any undefined values from newData
    Object.keys(newData).forEach(key => {
      if (newData[key] === undefined) {
        console.log(`Removing undefined value for key: ${key}`);
        delete newData[key];
      }
    });
  
    // If newData.serviceProvider exists, also remove undefined values from it
    if (newData.serviceProvider) {
      Object.keys(newData.serviceProvider).forEach(key => {
        if (newData.serviceProvider[key] === undefined) {
          console.log(`Removing undefined value from serviceProvider for key: ${key}`);
          delete newData.serviceProvider[key];
        }
      });
    }
  
    console.log('Cleaned new data:', newData);
  
    this.maintenanceRequestService.updateRequest(requestId, newData)
      .then(() => {
        console.log('Request updated successfully');
        // Update local data if needed
      })
      .catch((error: any) => {
        console.error('Error updating request:', error);
      });
  }

  updateStatus(request: any) {
    this.updateRequest(request.id, { status: request.status });
  }
  
  addComment(requestId: string, comment: string) {
    const request = this.filteredRequests.find(r => r.id === requestId);
    if (request) {
      const updatedComments = [...(request.comments || []), { text: comment, date: new Date() }];
      this.updateRequest(requestId, { comments: updatedComments });
      request.newComment = '';
    }
  }
}