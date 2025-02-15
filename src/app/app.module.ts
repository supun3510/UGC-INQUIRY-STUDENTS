import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'; // Required for Toastr
import { provideToastr, ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AddDialogComponent } from './pages/ui-components/tables/add-dialog/add-dialog.component';
import { AppTablesComponent } from './pages/ui-components/tables/tables.component';
import { EditDialogComponent } from './pages/ui-components/tables/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    AppTablesComponent,
    EditDialogComponent
  ],
  imports: [
    provideAnimations(), // Toastr animations
    ToastrModule.forRoot() // ✅ Directly use ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
