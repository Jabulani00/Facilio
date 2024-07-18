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
      const maintenanceData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as { priority?: number })
      }));
      
      const maintenanceCtx = document.getElementById('maintenanceChart') as HTMLCanvasElement;
      new Chart(maintenanceCtx, {
        type: 'bar',
        data: {
          labels: maintenanceData.map(request => request.id),
          datasets: [{
            label: 'Maintenance Requests',
            data: maintenanceData.map(request => request.priority || 1),
            backgroundColor: '#3498db'
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Priority'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Request ID'
              }
            }
          }
        }
      });
    });
  
    // User Chart
    this.firestore.collection('users', ref => ref.orderBy('count', 'desc').limit(5)).get().subscribe(snapshot => {
      const usersData = snapshot.docs.map(doc => doc.data() as { email: string; count: number });
      const labels = usersData.map(user => user.email);
      const data = usersData.map(user => user.count);
  
      const userCtx = document.getElementById('userChart') as HTMLCanvasElement;
      new Chart(userCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'User Count',
            data: data,
            backgroundColor: '#2ecc71'
          }, {
            label: 'Target',
            data: labels.map(() => 75), // Example target value
            type: 'line',
            borderColor: '#e74c3c',
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count'
              }
            },
            y: {
              title: {
                display: true,
                text: 'User Email'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    });
  
    // Issues Chart
    this.firestore.collection('issues').get().subscribe(snapshot => {
      const issuesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as { severity?: number; frequency?: number })
      }));
      
      const issuesCtx = document.getElementById('issuesChart') as HTMLCanvasElement;
      new Chart(issuesCtx, {
        type: 'bubble',
        data: {
          datasets: [{
            label: 'Issues',
            data: issuesData.map(issue => ({
              x: issue.id,
              y: issue.severity || 1,
              r: issue.frequency || 5
            })),
            backgroundColor: 'rgba(243, 156, 18, 0.6)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'category',
              position: 'bottom',
              title: {
                display: true,
                text: 'Issue ID'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Severity'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  const rawData = context.raw as { x: string; y: number; r: number };
                  return `Issue ${rawData.x}: Severity ${rawData.y}, Frequency ${rawData.r}`;
                }
              }
            }
          }
        }
      });
    });
  }
}
