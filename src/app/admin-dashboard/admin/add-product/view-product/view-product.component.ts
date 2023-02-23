import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllApiServiceService } from 'src/app/admin-dashboard/service/all-api-service.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent  implements OnInit {

  id!:any;
  view_product:any=[];

  constructor(private actRoute: ActivatedRoute,private _apiservice: AllApiServiceService, ){

  }
  
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this._apiservice.getProductById(this.id).subscribe((data:any)=>{
      this.view_product=data.data;
      console.log(data.data);
    })
    
  }
}
