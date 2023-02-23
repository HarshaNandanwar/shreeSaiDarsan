import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AllApiServiceService } from 'src/app/admin-dashboard/service/all-api-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  i: number = 0
  categorylist: any = [];
  nature: any = [];
  brandList: any = [];
  internalTags: any = [];
  subCategorylist: any = [];
  images: any = [];
  fileForUpload: any = [];
  id!: any;
  brand: any;
  edit: Boolean = false;
  isChecked: Boolean = false;
  view_product: any = [];
  selected: any = [];
  selectedItems: any = [];
  productDetail: any = [];
  categoryFilter: any = {
    category: ''
  }
  category: any;
  subCategory: any;
  dropdownSettings!: IDropdownSettings;
  updateProduct = new FormGroup({
    product_name: new FormControl('', Validators.required),
    packing_type: new FormControl('', Validators.required),
    print_name: new FormControl(''),
    brand_id: new FormControl(''),
    category: new FormControl(''),
    sub_category: new FormControl(''),
    nature: new FormControl(''),
    file_type: new FormControl(''),
    description: new FormControl(''),
    hsn: new FormControl(''),
    product_id: new FormControl(''),
    internal_tags: new FormControl('')
  });

  constructor(private actRoute: ActivatedRoute, private router: Router, private _apiservice: AllApiServiceService) {
  }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this._apiservice.getProductById(this.id).subscribe((data: any) => {
      this.view_product = data.data;
      if (this.view_product.file.length != 0) {
        let img = { url: '', name: this.view_product.file[0].id };
        var reader = new FileReader();
        reader.onload = (event: any) => {
          img.url = this.view_product.file[this.view_product.file.length - 1].file
        }
        var blob = new Blob([this.view_product.file[0].file]);
        this.images.push(img);
        if (this.view_product.file[0]) {
          reader.readAsDataURL(blob);
        }
      }
      this.selected = data.data.internal_tags;
      this.updateProduct = new FormGroup({
        product_name: new FormControl(this.view_product.product_name, Validators.required),
        packing_type: new FormControl(this.view_product.packing_type),
        print_name: new FormControl(this.view_product.print_name),
        brand_id: new FormControl(this.view_product.brand_id),
        category: new FormControl(this.view_product.category),
        sub_category: new FormControl(this.view_product.sub_category),
        nature: new FormControl(data.data.nature.id),
        file_type: new FormControl(this.view_product.file),
        description: new FormControl(this.view_product.product_detail),
        hsn: new FormControl(this.view_product.hsn),
        product_id: new FormControl(this.view_product.id),
        internal_tags: new FormControl(this.view_product.internal_tags)
      });
    }, (err: any) => console.log(err));

    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
    }

    this.categoryList();
    this.getBrandDetail();
    this.natureList();
    this.internalTagList();

    setTimeout(() => {
      console.log("view product ", this.view_product);
    }, 1000);

  }

  categoryList() {
    this._apiservice.getCategoryList().subscribe(
      (d: any) => {
        this.categorylist = d.data;
      }, (err: any) => console.log(err)
    );
  }

  subCategoryList() {
    this._apiservice.getSubCategory(this.categoryFilter).subscribe(
      (data: any) => {
        this.subCategorylist = data.data.data;
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  natureList() {
    this._apiservice.getNatureLIst().subscribe(
      (d: any) => {
        this.nature = d.data;
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
        this.brandList = data.data;
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  internalTagList() {
    this._apiservice.getinternalTagLIst().subscribe(
      (d: any) => {
        this.internalTags = d.data;
      }, (err: any) => console.log(err)
    )
  }

  imgURL(e: any) {
    console.log(this.fileForUpload);
    this.fileForUpload.shift();
    this.fileForUpload = e.target.files[0];
    let selectedFile = e.target.files[0];
    let img = { url: '', name: selectedFile.name };
    var reader = new FileReader();
    reader.onload = (event: any) => {
      img.url = event.target.result
    }
    this.images.push(img);
    this.images.shift();
    reader.readAsDataURL(e.target.files[0]);
  }

  onCategoryChange(e: any) {
    this.category = e.value;
    console.log(e.value);
    this.categoryFilter.category = e.value;
    this.subCategoryList();
  }

  onSubCategoryChange(e: any) {
    this.subCategory = e.value;
  }
  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems.push(item.id)
    console.log(this.selectedItems);
  }

  deleteImg(index: number) {
    this.images.splice(index, 1)
    this.fileForUpload = Array.from(this.fileForUpload).filter(
      item => {
        return item != this.fileForUpload[index]
      })
  }

  onBrandChange(e: any) {
    this.brand = e.value
    console.log(e.value);
  }
  editProduct() {
    console.log(this.id);

    let formValue = this.updateProduct.value;
    let updatedetail = new FormData();
    updatedetail.append('product_name', formValue.product_name!);
    updatedetail.append('packing_type', formValue.packing_type!);
    updatedetail.append('brand_id', formValue.brand_id!);
    updatedetail.append('print_name', formValue.print_name!);
    updatedetail.append('category', formValue.category!);
    updatedetail.append('nature', formValue.nature!);
    updatedetail.append('hsn', formValue.hsn!);
    updatedetail.append('sub_category', formValue.sub_category!);
    updatedetail.append('file_type', 'i');
    if (this.fileForUpload.length != 0) { 
      updatedetail.append("file[]", this.fileForUpload); 
    }
    updatedetail.append('describtion', formValue.description!);
    updatedetail.append('product_id', formValue.product_id!);
    for (let i = 0; i < this.selectedItems.length; i++) {
      updatedetail.append("internal_tags[]", this.selectedItems[i]);
    }
    this.updateProduct.value
    console.log(this.updateProduct.value);
    this._apiservice.editProduct(updatedetail).subscribe((data: any) => {
      alert("updated");
      this.router.navigate(['/admin/product']);
    }, (err: any) => console.log(err))

  }
}
