import { Component, OnInit } from '@angular/core';

import { MaintenanceRequestService } from '../services/maintenance-request.service';

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
  selectedImage: string | null = null;

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

  constructor(private maintenanceRequestService: MaintenanceRequestService) {}

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
      return matchesType && matchesSearch;
    });
  }

  onFilterChange() {
    this.applyFilter();
  }

  openImageModal(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeImageModal() {
    this.selectedImage = null;
  }
}
