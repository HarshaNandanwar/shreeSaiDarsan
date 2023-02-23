import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllApiServiceService } from '../../service/all-api-service.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{

  category: any = [];
  nature: any = [];
  internalTags: any = [];
  productData: any = [];
  searchData: any = {
    pno: 1,
    name: '',
    barcode: '',
    from_date: '',
    to_date: '',
    packing_type: '',
    categories: '',
    nature: '',
    limit: 50,
    inventory_status: '',
    get_all_deleted: '',
    internal_tag: '',
  }
  next_page: number = 1;
  prev_page: number = 0;
  last_page: number = 0;

  constructor( private router: Router, private _apiservice: AllApiServiceService) {
  }

  ngOnInit() {
    this.categoryList();
    this.natureList();
    this.internalTagList();
    this.productList();
  }

  categoryList() {
    this._apiservice.getCategoryList().subscribe(
      (d: any) => {
        this.category = d.data;
      }, (err: any) => console.log(err)
    );
  }

  natureList() {
    this._apiservice.getNatureLIst().subscribe(
      (d: any) => {
        this.nature = d.data;
      }, (err: any) => console.log(err)
    )
  }

  internalTagList() {
    this._apiservice.getinternalTagLIst().subscribe(
      (d: any) => {
        this.internalTags = d.data;
      }, (err: any) => console.log(err)
    )
  }

  productList() {
    this._apiservice.getProductList(this.searchData).subscribe((d: any) => {
      this.prev_page = d.data.current_page
      this.productData = d.data.data;
      this.last_page = d.data.last_page;
    },(err: any) => console.log(err))
  }

  searchProduct() {
    this.searchData.pno=this.prev_page;
    this.productList();
  }

  tabClick(e: any) {
    if (e.index == 0) {
      this.searchData.get_all_deleted = 'n';
      this.productList();
    }
    else {
      this.searchData.get_all_deleted = 'y'
      this.productList();
    }

  }

  previousPage(pp: any) {
    this.prev_page = --this.next_page;
    if (this.prev_page > 0) {
      this.searchData.pno = this.prev_page;
      this.productList();
    }
  }

  nextPage(np: any) {
    if (this.next_page < this.last_page) {
      this.searchData.pno = ++this.next_page;
      this.prev_page = ++this.prev_page;
      this.productList();
    }
  }

  viewProduct(id: number) {
    this.router.navigate([`/admin/view-product/${id}`]);
  }

  editProduct(id: number) {
    this.router.navigate([`/admin/edit-product/${id}`]);
  }

  deleteproduct(data: any) {
    console.log(data);
    this._apiservice.deleteProduct(data.id).subscribe((data: any) => {
    alert("deleted")
    this.productList();
    },(err: any) => console.log(err));
  }

  restoreProduct(data: any) {
    let formdata = new FormData();
    formdata.append("product_id", data.id);
    this._apiservice.restoreProduct(formdata).subscribe((data:any)=>{
      alert("restored")
    this.productList();
    },(err:any)=>{
      console.log(err);
    })
  }

  permanentlyDelete(data: any) {
    let formdata = new FormData();
    formdata.append("product_id", data.id);
    this._apiservice.deletePermanentlyProduct(formdata).subscribe((data: any) => {
      alert("permanently deleted")
      this.productList();
    },(err: any) => console.log(err));
  
  }
}
