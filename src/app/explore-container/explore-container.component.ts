import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class ExploreContainerComponent implements OnInit, OnDestroy {
  @Input() request: any;
  form!: FormGroup;
  
  userData: any = null;
  isUserDataLoaded: boolean = false;
  private userSubscription: Subscription | undefined;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    console.log('ExploreContainerComponent constructed');
  }

  ngOnInit() {
    console.log('ExploreContainerComponent initializing');
    this.initForm();
    this.subscribeToUserData();
  }

  ngOnDestroy() {
    console.log('ExploreContainerComponent destroying');
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      startDate: [null, Validators.required],
      specialRequest: [''],
      otherServices: [''],
    });
    console.log('Form initialized');
  }

  private subscribeToUserData() {
    console.log('Subscribing to user data');
    this.userSubscription = this.authService.user$.subscribe(
      user => {
        console.log('Received user data:', user);
        if (user) {
          this.userData = user;
          this.isUserDataLoaded = Boolean(
            user.email && user.name && user.phoneNumber && user.location
          );
        } else {
          this.userData = null;
          this.isUserDataLoaded = false;
        }
        console.log('User data loaded:', this.isUserDataLoaded);
        console.log('User data:', this.userData);
      },
      error => {
        console.error('Error in user subscription:', error);
        this.userData = null;
        this.isUserDataLoaded = false;
      }
    );
  }

  onSubmit() {
    console.log('onSubmit called');
    console.log('Form valid:', this.form.valid);
    console.log('User data loaded:', this.isUserDataLoaded);

    if (this.form.valid && this.isUserDataLoaded) {
      console.log('Form data:', this.form.value);
      console.log('User data:', this.userData);

      const formData = this.form.value;
      const serviceProvider = {
        email: this.userData.email,
        name: this.userData.name,
        surname: this.userData.surname,
        phoneNumber: this.userData.phoneNumber,
        location: this.userData.location,
        services: this.userData.services
      };

      const updatedRequest = {
        ...this.request,
        ...formData,
        progress: 'pendingOne',
        serviceProvider: serviceProvider
      };

      console.log('Updated request:', updatedRequest);

      this.modalController.dismiss(updatedRequest);
    } else {
      console.error('Form is invalid or user data is not fully loaded');
      if (!this.form.valid) {
        console.error('Form validation errors:', this.form.errors);
      }
      if (!this.isUserDataLoaded) {
        console.error('Missing user data');
      }
    }
  }

  cancel() {
    console.log('Cancel called');
    this.modalController.dismiss();
  }
}