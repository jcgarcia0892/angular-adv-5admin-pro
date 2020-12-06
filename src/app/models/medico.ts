import { Hospital } from './hospital';

interface _MedicolUsuario {
    _id: string;
    email: string;
    nombre: string;
}

export class Medico {

    constructor(    public nombre: string,
                    public usuario?: _MedicolUsuario,
                    public img?: string,
                    public _id?: string,
                    public hospital?: Hospital) {


    }

}
