import { ApiResponse } from './api-response.interface';
import { User } from './user.interface';
import { Vehicle } from './vehicle.interface';

export interface Telefono {
    id: number;
    descripcion: string;
    codigo: string;
}

export interface Data {
    telefonos: Telefono[];
    usuariosTecnicos: User[];
    gruas: Vehicle[];
}

export type ServiceInitData = ApiResponse<Data>;
