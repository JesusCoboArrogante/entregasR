import { NgStyle } from "@angular/common";
import { AbstractControl, ValidationErrors } from "@angular/forms";


export class ValidacionPropia {
    static validarDNI(control: AbstractControl): ValidationErrors | null{
         if (!control.value) return null;
        const valor = control.value
        const ultima = valor.charAt(valor.length-1).toUpperCase();
        const numeros = parseInt(valor.slice(0,8),10);
        const resto = numeros % 23;
        const dni = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];
        if(dni[resto] == ultima ){
            return  null;
        }

        return {validarDNI: true};
    }


    static validarFecha(control: AbstractControl): ValidationErrors | null{
    if(!control.value) return null;
     const cadena:string = control.value    

    let arregloFecha = cadena.split('/');
    let anio = Number(arregloFecha[2]);
    let mes = Number(arregloFecha[1]) ;
    let dia = Number(arregloFecha[0]);

    let fecha = new Date(anio, mes, dia).getTime();
    let  hoy = Date.now();

        if (hoy < fecha) {
            return {validarFecha: true}
        }


        if (anio > 2009) {
            return {validarFecha: true}
        }

        if(mes < 1 || mes > 12){
            return {validarFecha: true}
        }
        if(dia < 1 || dia > 31){
           return {validarFecha: true}
        }

        if (mes == 1 || mes == 3 ||  mes == 5 || mes ==7 || mes ==8 || mes ==10 ||mes ==12 ) {
            if (dia > 31) {
               return {validarFecha: true} 
            }
        }else if (mes == 4 || mes == 6 || mes ==9 || mes == 11) {
            if (dia > 30) {
                return {validarFecha: true} 
                
            }
        } 

        const esBisiesto =
        (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);

        if (mes == 2) {
            if (esBisiesto) {
            if (dia > 29) {
                 return {validarFecha: true} 
            }
        }else if (dia > 28) {
                return {validarFecha: true} 
        } 
        }

        
        return null
    
    }

    static validarArchivo(control: AbstractControl): ValidationErrors | null {

        if (!control.value) return null;

        const cadena = control.value;
        const partes = cadena.split('.');
        const extension = partes[1].toUpperCase();

        const ext: string[] = ['JPG', 'PNG', 'JPEG'];

        for (let i = 0; i < ext.length; i++) {
        if (ext[i] ==extension) {
            return null;
            }
        }

        return { validarArchivo: true };
    }

    static validarInteres(control: AbstractControl): ValidationErrors | null{

            if (!control.value) return null;

            var lista = control.value as string[];
	        
            if (!lista || lista.length <= 1 ) {
                return { validarInteres: true };
            }
    
        
        return null
    }

    static validarProvincia(control: AbstractControl): ValidationErrors | null{
        if (!control.value) return null;
        let provincia = control.value;
        let numeros = Number(provincia.slice(0,2));

        if (numeros <= 0 || numeros > 52) {
            return {validarProvincia: true}
        }
        return null
    }

    
}

