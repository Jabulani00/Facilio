import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, AlertController } from '@ionic/angular';
import { UserProfileService } from '../services/user-profile.service';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  reportedIssues: any[] = [];
  unresolvedIssues: any[] = [];
  resolvedIssues: any[] = [];
  selectedSegment: string = 'unresolved';

  constructor(
    private firestore: AngularFirestore,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.fetchReportedIssues();
  }

  async fetchReportedIssues() {
    const loading = await this.loadingController.create({ message: 'Fetching reported issues...' });
    await loading.present();

    this.firestore.collection('issues').valueChanges({ idField: 'issueId' }).subscribe({
      next: (issues: any[]) => {
        this.reportedIssues = issues;
        this.unresolvedIssues = issues.filter(issue => issue.status !== 'resolved');
        this.resolvedIssues = issues.filter(issue => issue.status === 'resolved');
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error fetching reported issues', error);
        loading.dismiss();
      }
    });
  }

  async suspendAccount(userId: string) {
    try {
      await this.userProfileService.suspendAccount(userId);
      const alert = await this.alertController.create({
        header: 'Account Suspended',
        message: 'The account has been suspended successfully.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      console.error('Error suspending account:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to suspend the account.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async resolveIssue(issueId: string, adminEmail: string) {
    const alert = await this.alertController.create({
      header: 'Resolve Issue',
      inputs: [
        {
          name: 'resolutionMessage',
          type: 'text',
          placeholder: 'Enter resolution message'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Resolve issue cancelled');
          }
        },
        {
          text: 'Resolve',
          handler: async (data) => {
            if (data.resolutionMessage) {
              try {
                // Check if issueId exists in reportedIssues array
                const resolvedIssue = this.reportedIssues.find(issue => issue.issueId === issueId);
  
                if (!resolvedIssue) {
                  throw new Error('Issue not found in reported issues.');
                }
  
                // Update issue status in Firestore
                await this.userProfileService.updateIssueStatusById(issueId, 'resolved', data.resolutionMessage);
  
                const successAlert = await this.alertController.create({
                  header: 'Issue Resolved',
                  message: 'The issue has been resolved successfully.',
                  buttons: ['OK']
                });
  
                // Update reportedIssues array if necessary (optional)
                this.fetchReportedIssues();
  
                // Prepare and send email using EmailJS
                const emailParams = {
                  name: issueId,
                  email_to: resolvedIssue.buildingManagerEmail,
                  from_email: 'Facilio',
                  subject: 'Facilio Account',
                  message: `This email is to inform you that your issue (${issueId}) has been resolved: ${data.resolutionMessage}`
                };
  
                await emailjs.send('service_8ept2vs', 'template_315hlk4', emailParams, '14hVEtErTwfVvDBtn');
  
                await successAlert.present();
              } catch (error) {
                console.error('Error resolving issue and sending email:', error);
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: 'Failed to resolve the issue or send email.',
                  buttons: ['OK']
                });
                await errorAlert.present();
              }
            } else {
              const errorAlert = await this.alertController.create({
                header: 'Error',
                message: 'Resolution message cannot be empty.',
                buttons: ['OK']
              });
              await errorAlert.present();
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  
}
