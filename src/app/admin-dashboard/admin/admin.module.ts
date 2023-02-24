import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OperatorComponent } from './operator/operator.component';
import { SalesComponent } from './sales/sales.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { OutletComponent } from './outlet/outlet.component';
import { CustomerComponent } from './customer/customer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { BarcodeImageComponent } from './barcode-image/barcode-image.component';
import { CustomBarcodeComponent } from './custom-barcode/custom-barcode.component';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditProductComponent } from './add-product/edit-product/edit-product.component';
import { CreateProductComponent } from './add-product/create-product/create-product.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewProductComponent } from './add-product/view-product/view-product.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
    declarations: [
        AdminComponent,
        DashboardNavComponent,
        AddProductComponent,
        OperatorComponent,
        SalesComponent,
        WarehouseComponent,
        OutletComponent,
        CustomerComponent,
        SupplierComponent,
        PurchaseComponent,
        BarcodeImageComponent,
        CustomBarcodeComponent,
        OrdersComponent,
        DashboardComponent,
        CreateProductComponent,
        EditProductComponent,
        ViewProductComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTabsModule,
        MatSnackBarModule,
        NgxPaginationModule,
        MatPaginatorModule,
        NgSelectModule,
        MatRadioModule,
        NgMultiSelectDropDownModule.forRoot()

    ],
    providers:[
        
    ]
})
export class AdminModule { }
