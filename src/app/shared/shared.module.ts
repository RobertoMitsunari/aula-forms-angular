import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormsModule } from '@angular/forms';
import { DropdownService } from './services/Dropdown.service';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    FormDebugComponent,
    CampoControlErroComponent
  ],
  providers:[
    DropdownService
  ]
})
export class SharedModule { }
