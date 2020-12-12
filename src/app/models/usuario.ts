import { environment } from 'src/environments/environment';

const base_url  = environment.base_url;
export class Usuario {


    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public rol?: 'ADMIN_ROL' |'USER_ROL',
        public img?: string,
        public uid?: string
    ) {


    }
    get imagenUrl(): any {

        if (!this.img) {
            return `${base_url}/uploads/usuarios/no-image`;

        }else if (this.img.includes('https')) {
            return this.img;
        }else if (this.img) {
            return `${base_url}/uploads/usuarios/${this.img}`;
        }

    }
}
