import { ApiResponse } from "./api-response.interface";

export interface Telefono {
    id: number;
    descripcion: string;
    codigo: string;
}

export interface UsuarioTecnico {
    id: number;
    tipoDocumentoId: number;
    documento: string;
    primerNombre: string;
    segundoNombre: string | null;
    primerApellido: string;
    segundoApellido: string | null;
    rolId: number;
}

export interface Data {
    telefonos: Telefono[];
    usuariosTecnicos: UsuarioTecnico[];
}

export type ServiceInitData = ApiResponse<Data>
