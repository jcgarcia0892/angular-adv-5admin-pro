
interface _hospitalUsuario {
    _id:string,
    email:string,
    nombre:string
}

export class Hospital {



    constructor(    public nombre:string,
                    public usuario?:_hospitalUsuario,
                    public img?:string,
                    public _id?:string) {

    }

}