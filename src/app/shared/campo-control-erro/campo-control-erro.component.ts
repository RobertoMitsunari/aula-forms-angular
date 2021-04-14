import { TemplateFormComponent } from '../../template-form/template-form.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'campo-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrls: ['./campo-control-erro.component.css']
})
export class CampoControlErroComponent implements OnInit {

  @Input() mostrar:boolean;
  @Input() erro:string;
  constructor() { }

  ngOnInit(): void {
  }


}
