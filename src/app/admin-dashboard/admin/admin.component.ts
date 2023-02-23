import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AllApiServiceService } from '../service/all-api-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private local: LocalStorageService, private _apiservice: AllApiServiceService) {
  
  }
}
