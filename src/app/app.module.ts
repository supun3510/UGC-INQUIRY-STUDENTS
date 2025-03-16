import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'; // Required for Toastr
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { AddDialogComponent } from './pages/ui-components/tables/add-dialog/add-dialog.component';
import { AppTablesComponent } from './pages/ui-components/tables/tables.component';
import { EditDialogComponent } from './pages/ui-components/tables/edit-dialog/edit-dialog.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AppYearlyBreakupComponent } from './components/yearly-breakup/yearly-breakup.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    AppTablesComponent,
    EditDialogComponent,
    FileUploadComponent,
    AppYearlyBreakupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    provideAnimations(), // Toastr animations
    ToastrModule.forRoot() // ✅ Directly use ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
