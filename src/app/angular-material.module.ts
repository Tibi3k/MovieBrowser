import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatRadioModule,
        MatCardModule,
        MatPaginatorModule,
        MatSelectModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatRadioModule,
        MatCardModule,
        MatPaginatorModule,
        MatSelectModule
    ],
    providers: [],
  })
  export class AngularMaterialModule { }
  