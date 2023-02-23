import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CreateProductComponent } from './add-product/create-product/create-product.component';
import { EditProductComponent } from './add-product/edit-product/edit-product.component';
import { ViewProductComponent } from './add-product/view-product/view-product.component';
import { AdminComponent } from './admin.component';
import { BarcodeImageComponent } from './barcode-image/barcode-image.component';
import { CustomBarcodeComponent } from './custom-barcode/custom-barcode.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OperatorComponent } from './operator/operator.component';
import { OrdersComponent } from './orders/orders.component';
import { OutletComponent } from './outlet/outlet.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SalesComponent } from './sales/sales.component';
import { SupplierComponent } from './supplier/supplier.component';
import { WarehouseComponent } from './warehouse/warehouse.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [

      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'operator',
        component: OperatorComponent,
      },
      {
        path: 'warehouse',
        component: WarehouseComponent,
      },
      {
        path: 'outlet',
        component: OutletComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: 'suppliers',
        component: SupplierComponent,
      },
       {
        path: 'product',
        component: AddProductComponent,
      },
      {
        path: 'purchase',
        component: PurchaseComponent,
      },
      {
        path: 'barcode-image',
        component: BarcodeImageComponent,
      }, 
      {
        path: 'customer-barcode',
        component: CustomBarcodeComponent,
      },
       {
        path: 'order',
        component: OrdersComponent,
      },
      {
        path: 'create-product',
        component: CreateProductComponent,
      },
      {
        path: 'view-product/:id',
        component: ViewProductComponent,
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: "full"
      },
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: "full"
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
