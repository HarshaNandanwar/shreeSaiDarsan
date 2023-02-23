import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AllApiServiceService {

  baseUrl:  string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getCategoryList(){
    return this.http.get(`${this.baseUrl}/category-list`);
  }

  getNatureLIst(){
    return this.http.get(`${this.baseUrl}/warehouse/nature-list`);
  }

  getinternalTagLIst(){
    return this.http.get(`${this.baseUrl}/internal-tag/list`);
  }

  getProductList(data:any){
    return this.http.get(`${this.baseUrl}/product/list?page=${data.pno}&name=${data.name}&barcode=${data.barcode}&nature=${data.nature}&category=${data.categories}&packing_type=${data.packing_type}&limit=${data.limit}
    &inventory_status=${data.inventory_status}&get_all_deleted=${data.get_all_deleted}&internal_tag=${data.internal_tag}`);
  }

  getUnitList(){
    return this.http.get(`${this.baseUrl}/product/unit-list`);
  }

  getBrandList(data:any){
    return this.http.get(`${this.baseUrl}/brand/get-brand?page=${data.pno}&brand_name=${data.brand_name?data.brand_name:''}`)
  }

  getSubCategory(data:any){
    return this.http.get(`${this.baseUrl}/get-subcategory?page=${data.pno}&category=${data.category?data.category:''}&subcategory=${data.subcategory?data.subcategory:''}`)      
  }

  addProduct(data:any){
    return this.http.post(`${this.baseUrl}/product/add-basic`, data)
  }

  getProductById(id:any){
    return this.http.get(`${this.baseUrl}/product/edit/${id}`);
  }

  deleteProduct(id: any) {
    return this.http.get(`${this.baseUrl}/product/delete/${id}`)
  }

  restoreProduct(id:any){
    return this.http.post(`${this.baseUrl}/product/restore-product`, id);
  }

  deletePermanentlyProduct(id:any){
    return this.http.post(`${this.baseUrl}/product/parmanent-delete-product`, id);
  }

  editProduct(data:any) {
    return this.http.post(`${this.baseUrl}/product/edit`, data);
}
}
