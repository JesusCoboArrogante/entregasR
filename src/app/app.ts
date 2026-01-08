import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidacionPropia } from './validacion-propia';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  
})
export class App {
  protected readonly title = signal('deJovenes');
  resultado!: string;

  private readonly provincias = [
    "Araba/Álava","Albacete","Alicante/Alacant","Almería","Ávila","Badajoz",
    "Balears, Illes","Barcelona","Burgos","Cáceres","Cádiz","Castellón/Castelló",
    "Ciudad Real","Córdoba","Coruña, A","Cuenca","Girona","Granada","Guadalajara",
    "Gipuzkoa","Huelva","Huesca","Jaén","León","Lleida","Rioja, La","Lugo","Madrid",
    "Málaga","Murcia","Navarra","Ourense","Asturias","Palencia","Palmas, Las",
    "Pontevedra","Salamanca","Santa Cruz de Tenerife","Cantabria","Segovia",
    "Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia/València",
    "Valladolid","Bizkaia","Zamora","Zaragoza","Ceuta","Melilla"
  ];

  formularioJovenes = new FormGroup({
      nombre:   new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      apellido: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      dni: new FormControl('',[Validators.required, ValidacionPropia.validarDNI]),
      fecha: new FormControl('',[Validators.required ,ValidacionPropia.validarFecha]),
      sexo: new FormControl ('',[Validators.required]),
      file:  new FormControl('',[Validators.required ,ValidacionPropia.validarArchivo]),
      interes: new FormControl([],[Validators.required, ValidacionPropia.validarInteres]),
      cp: new FormControl('',[Validators.required, ValidacionPropia.validarProvincia]),
      provinciaNombre: new FormControl<string>({value: '', disabled: true}),
      acepto: new FormControl(false,Validators.requiredTrue)
  });

  onCpInput(){
    const cp = (this.formularioJovenes.get('cp')?.value ?? '').toString();
    if (cp.length < 2){
      this.formularioJovenes.get('provinciaNombre')?.setValue('');
      return
    }
    const codigo = Number(cp.slice(0,2));
    const nombre = this.provincias[codigo-1]?? '';
    this.formularioJovenes.get('provinciaNombre')?.setValue(nombre);
  }

  submit(){
    if (this.formularioJovenes.valid) {
      alert ('Todos los datos son validos')
    }else{
      alert ('Hay datos invalidos en el formulario')
    }

  }
}
