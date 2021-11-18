import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { DialogInsertComponent } from './components/dialog-insert/dialog-insert.component';
import { DialogUpdateComponent } from './components/dialog-update/dialog-update.component';
import { DialogDetailComponent } from './components/dialog-detail/dialog-detail.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import {MatCardModule} from '@angular/material/card';

import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [AppComponent, FooterComponent, NavbarComponent, DialogInsertComponent, DialogUpdateComponent, DialogDetailComponent],
  entryComponents: [DialogInsertComponent, DialogUpdateComponent, DialogDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatTableModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
