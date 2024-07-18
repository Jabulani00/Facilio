import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserProfileService } from '../services/user-profile.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-report-issue-sp',
  templateUrl: './report-issue-sp.page.html',
  styleUrls: ['./report-issue-sp.page.scss'],
})
export class ReportIssueSpPage implements OnInit {

  buildingManagerEmail: string = ''; // Initialize property

  buildingManagers: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private userProfileService: UserProfileService,
    private afAuth: AngularFireAuth // Inject AngularFireAuth
  ) {}

  ngOnInit() {
    // Fetch building manager's email (assuming it's stored or obtained elsewhere)
    this.fetchBuildingManagerEmail();

    // Fetch building managers
    this.fetchBuildingManagers();
  }

  async fetchBuildingManagerEmail() {
    try {
      const user = await this.afAuth.currentUser;
      if (user && user.email) { // Ensure user and user.email are not null
        this.buildingManagerEmail = user.email;
      } else {
        console.error('No user logged in or user email is null');
        // Handle the case where no user is logged in or user email is null
      }
    } catch (error) {
      console.error('Error fetching user email:', error);
      // Handle error fetching user email
    }
  }

  async fetchBuildingManagers() {
    const loading = await this.loadingController.create({ message: 'Fetching building managers...' });
    await loading.present();

    this.firestore.collection('users', ref => ref.where('userType', '==', 'bm')).valueChanges().subscribe({
      next: async (users: any[]) => {
        this.buildingManagers = users;
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error fetching building managers', error);
        loading.dismiss();
      }
    });
  }

  async reportIssue(buildingManager: any) {
    const alert = await this.alertController.create({
      header: 'Report Issue',
      inputs: [
        {
          name: 'issue',
          type: 'text',
          placeholder: 'Describe the issue'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Report cancelled');
            return true;
          }
        },
        {
          text: 'Report',
          handler: async (data) => {
            if (data.issue) {
              try {
                await this.userProfileService.reportIssue(this.buildingManagerEmail, buildingManager.email, data.issue);
                const successAlert = await this.alertController.create({
                  header: 'Success',
                  message: 'Issue reported successfully.',
                  buttons: ['OK']
                });
                await successAlert.present();
              } catch (error) {
                console.error('Error reporting issue', error);
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: 'Failed to report the issue.',
                  buttons: ['OK']
                });
                await errorAlert.present();
              }
            } else {
              const errorAlert = await this.alertController.create({
                header: 'Error',
                message: 'Issue description cannot be empty.',
                buttons: ['OK']
              });
              await errorAlert.present();
              return false;
            }
            return true;
          }
        }
      ]
    });

    await alert.present();
  }
}
