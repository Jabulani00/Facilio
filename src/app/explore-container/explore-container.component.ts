import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule]
})
export class ExploreContainerComponent implements OnInit {
  @Input() request: any;
  form!: FormGroup; // Add the definite assignment assertion operator here

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      specialRequest: [''],
      otherServices: [''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const updatedRequest = {
        ...this.request,
        ...formData,
        progress: 'pendingOne'
      };
      this.modalController.dismiss(updatedRequest);
    }
  }

  cancel() {
    this.modalController.dismiss();
  }
}