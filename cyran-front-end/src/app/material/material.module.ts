import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { MatSelectModule } from  '@angular/material/select';
import { MatCheckboxModule } from  '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table'
import { CdkTableModule} from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator'

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatTabsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSliderModule,
  MatSidenavModule,
  MatTableModule,
  CdkTableModule,
  MatPaginatorModule
]

/**
 * #### Description
 * Imports and exports all used Angular material components
 *  
 * #### Version
 * since: V1.0.0
 * 
 */
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
