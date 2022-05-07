import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatRadioModule,
        MatCardModule,
        MatPaginatorModule,
        MatSelectModule,
        MatChipsModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatRadioModule,
        MatCardModule,
        MatPaginatorModule,
        MatSelectModule,
        MatChipsModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule
    ],
    providers: [],
  })
  export class AngularMaterialModule { }
  