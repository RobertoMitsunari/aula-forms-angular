
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario:any = {
    nome: 'AHOY',
    email: 'marine@desuu.com'
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }
  aplicaCssErro(campo){
    return{
      'is-invalid': this.verificaValidTouched(campo)
    };
  }
  onSubmit(form){
    this.http.post("https://httpbin.org/get",JSON.stringify(form.value))
    .subscribe(data => { console.log(data) });
  }
  consultaCEP(cep, form){
    cep = cep.replace(/\D/g,'');
    if(cep != ""){
      var validacep = /^[0-9]{8}$/;
    }
    if(validacep.test(cep)){
      this.limpaDados(form);
      this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe(data => { this.pupulaDadosForms(data, form) });
    }
  }

  pupulaDadosForms(dados, form){
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
    form.form.patchValue({
      endereco: {
          cep: dados.cep,
          number: "",
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          Cidade: dados.localidade,
          Estado: dados.uf
        }
      }
    )
  }

  limpaDados(formulario){
    formulario.form.patchValue({
      endereco: {
          cep: "",
          number: "",
          complemento: "",
          rua: "",
          bairro: "",
          Cidade: "",
          Estado: ""
        }
      }
    )
  }

}
