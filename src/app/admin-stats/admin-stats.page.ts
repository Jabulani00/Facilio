import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.page.html',
  styleUrls: ['./admin-stats.page.scss'],
})
export class AdminStatsPage implements OnInit {
  approvedCount: number = 0;
  pendingCount: number = 0;
  suspendedCount: number = 0;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.fetchUserStats();
    this.fetchChartsData();
  }

  fetchUserStats() {
    this.firestore.collection('users', ref => ref.where('status', '==', 'approved')).get().subscribe(snapshot => {
      this.approvedCount = snapshot.size;
    });

    this.firestore.collection('users', ref => ref.where('status', '==', 'pending')).get().subscribe(snapshot => {
      this.pendingCount = snapshot.size;
    });

    this.firestore.collection('users', ref => ref.where('status', '==', 'suspended')).get().subscribe(snapshot => {
      this.suspendedCount = snapshot.size;
    });
  }

  fetchChartsData() {
    // Maintenance Chart
    this.firestore.collection('maintenanceRequests').get().subscribe(snapshot => {
      const maintenanceCount = snapshot.size;
      const ctx = document.getElementById('maintenanceChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Maintenance Requests'],
          datasets: [{
            label: 'Number of Maintenance Requests',
            data: [maintenanceCount],
            backgroundColor: '#3498db'
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    // User Chart
    this.firestore.collection('users', ref => ref.orderBy('count', 'desc').limit(5)).get().subscribe(snapshot => {
      const usersData = snapshot.docs.map(doc => doc.data());
      const labels = usersData.map((user: any) => user.email);
      const data = usersData.map((user: any) => user.count);

      const ctx = document.getElementById('userChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Top 5 Users by Count',
            data: data,
            backgroundColor: '#2ecc71'
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    // Issues Chart
    this.firestore.collection('issues').get().subscribe(snapshot => {
      const issuesCount = snapshot.size;
      const ctx = document.getElementById('issuesChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Issues'],
          datasets: [{
            label: 'Number of Issues',
            data: [issuesCount],
            backgroundColor: ['#f39c12']
          }]
        },
        options: {
          responsive: true
        }
      });
    });
  }
}
