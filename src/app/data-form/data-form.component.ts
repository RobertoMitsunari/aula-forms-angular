
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoBr } from '../shared/models/EstadoBr';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/Dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario : FormGroup;
  estados: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private consultaCepService: ConsultaCepService
    ) { }

  ngOnInit(): void {
    this.estados = [];
    this.dropDownService.getEstadosBr().subscribe((dados: EstadoBr) => {this.estados.push(dados);console.log(dados)})
    /*
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      email: [null, [Validators.required,Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null,Validators.required],
        numero: [null,Validators.required],
        complemento: [null,Validators.required],
        rua: [null,Validators.required],
        bairro: [null,Validators.required],
        cidade: [null,Validators.required],
        estado: [null,Validators.required]
      })
    });
  }
  onSubmit(){
    console.log(this.formulario)
    if(this.formulario.valid){
      this.http.post("https://httpbin.org/get",JSON.stringify(this.formulario.value))
      .subscribe(data => {
        console.log(data);
        this.formulario.reset();
       },(error: any) => alert('erro'));
    }else{
      this.verificaValidacoesForm(this.formulario);
    }

  }
  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    });
  }
  resetar(){
    this.formulario.reset();
  }
  verificaValidTouched(campo: string){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  aplicaCssErro(campo: string){
    return{
      'is-invalid': this.verificaValidTouched(campo)
    };
  }
  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email');
    if (campoEmail.errors){
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }
  verificaEmailDigitado(){
    let campoEmail = this.formulario.get('email');
    if (campoEmail.errors){
      return campoEmail.errors['required'] && campoEmail.touched;
    }
  }
  consultaCEP(){
    let cep = this.formulario.get('endereco.cep').value;
    cep = cep.replace(/\D/g,'');
    if(cep !== "" && cep != null){
      this.limpaDados();
      this.consultaCepService.consultaCEP(cep).subscribe(data => { this.pupulaDadosForms(data) });
    }
  }
  pupulaDadosForms(dados){
    /*
    form.setValue({
      nome: form.value.nome,
      email: form.value.email,
      endereco: {
        cep: dados.cep,
        number: "",
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        Cidade: dados.localidade,
        Estado: dados.uf
      }
    });*/
    this.formulario.patchValue({
      endereco: {
          cep: dados.cep,
          number: "",
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      }
    )
  }

  limpaDados(){
    this.formulario.patchValue({
      endereco: {
          number: "",
          complemento: "",
          rua: "",
          bairro: "",
          cidade: "",
          estado: ""
        }
      }
    )
  }
}
