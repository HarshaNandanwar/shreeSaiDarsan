import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AllApiServiceService } from 'src/app/admin-dashboard/service/all-api-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  categorylist: any = [];
  naturelist: any = [];
  brandlist: any = [];
  internalTags: any = [];
  subCategorylist: any = [];
  categoryFilter: any = {
    category: ''
  };
  selectedItems: any = [];
  images: any = [];
  fileForUpload: any = [];
  carrybagProduct: boolean = false;
  freeProduct: boolean = false;
  brand: any;
  category: any;
  subCategory: any;
  nature: any;
  showCarryBag: boolean = true
  dropdownSettings!: IDropdownSettings;
  createProduct = new FormGroup({
    product_name: new FormControl('', Validators.required),
    packing_type: new FormControl('', Validators.required),
    print_name: new FormControl(''),
    brand_name: new FormControl(''),
    category: new FormControl(''),
    sub_category: new FormControl(''),
    nature: new FormControl(''),
    file_type: new FormControl(''),
    describtion: new FormControl(''),
    hsn: new FormControl(''),
    free_product: new FormControl('')
  });

  constructor(private router: Router, private _apiservice: AllApiServiceService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.categoryList();
    this.natureList();
    this.getBrandDetail();
    this.internalTagList();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
    }
  }

  categoryList() {
    this._apiservice.getCategoryList().subscribe(
      (d: any) => {
        console.log("category-- ", d.data);
        this.categorylist = d.data;
      }, (err: any) => console.log(err)
    );
  }

  subCategoryList() {
    this._apiservice.getSubCategory(this.categoryFilter).subscribe(
      (data: any) => {
        console.log("sub category--", data.data.data);
        this.subCategorylist = data.data.data;
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  natureList() {
    this._apiservice.getNatureLIst().subscribe(
      (d: any) => {
        console.log("nature-- ", d.data);
        this.naturelist = d.data;
      }, (err: any) => console.log(err)
    )
  }


  getBrandDetail() {
    let data: any = {
      pno: '',
      name: ''
    }
    this._apiservice.getBrandList(data).subscribe(
      (data: any) => {
        console.log(" brand-- ", data.data);
        this.brandlist = data.data;
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  internalTagList() {
    this._apiservice.getinternalTagLIst().subscribe(
      (d: any) => {
        console.log("internattag--", d.data);
        this.internalTags = d.data;
      }, (err: any) => console.log(err)
    )
  }

  deleteImg(index: number) {
    this.images.splice(index, 1)
    this.fileForUpload = Array.from(this.fileForUpload).filter(
      item => {
        return item != this.fileForUpload[index]
      }, (err: any) => console.log(err))
  }

  imgURL(e: any) {
    this.fileForUpload = e.target.files;
    let selectedFile = e.target.files[0];
    let img = { url: '', name: selectedFile.name };
    var reader = new FileReader();
    reader.onload = (event: any) => {
      img.url = event.target.result
    }
    this.images.push(img);
    reader.readAsDataURL(e.target.files[0]);
  }

  getProductType(e: any) {
    console.log(e.value);
    e.value == 'p' ? this.showCarryBag = true : this.showCarryBag = false
  }

  onCategoryChange(e: any) {
    this.category = e.value
    console.log(e.value);
    this.categoryFilter.category = e.value;
    this.subCategoryList();
  }

  onSubCategoryChange(e: any) {
    this.subCategory = e.value
    console.log(e.value);
  }

  onBrandChange(e: any) {
    this.brand = e.value;
  }

  onNatureChange(e: any) {
    this.nature = e.value;
  }

  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems.push(item.id)
    console.log(this.selectedItems);
  }

  onFreeChange(e: any) {
    console.log(e);
    this.freeProduct = e.checked;
  }

  onCarryBagChange(e: any) {
    this.carrybagProduct = e.checked;
  }

  addProduct() {
    let formValue = this.createProduct.value;
    let logindetail = new FormData();
    logindetail.append("packing_type", formValue.packing_type!);
    logindetail.append("describtion", formValue.describtion!);
    logindetail.append("product_name", formValue.product_name!);
    logindetail.append("print_name", formValue.print_name!);
    logindetail.append("brand_id", this.brand ? this.brand : '');
    logindetail.append("category", this.category ? this.category : '');
    logindetail.append("nature", formValue.nature!);
    logindetail.append("hsn", formValue.hsn!);
    logindetail.append("sub_category", formValue.sub_category!);
    logindetail.append("free_product", this.freeProduct == true ? 'y' : 'n');
    logindetail.append("is_carry_bag", this.carrybagProduct == true ? '1' : '0');
    logindetail.append("file_type", "i");
    logindetail.append("file[]", this.fileForUpload[0]);
    if (formValue.packing_type == 'l') {
      logindetail.append('unit', 'kg');
    }
    for (let i = 0; i < this.selectedItems.length; i++) {
      logindetail.append("internal_tags[]", this.selectedItems[i]);
    }
    this._apiservice.addProduct(logindetail).subscribe((d: any) => {
      console.log("created--", d);
      this.router.navigate([`/admin/view-product/${d.data.id}`]);
    }
      , (err: any) => {
        console.log(err);
      })
  }
}
