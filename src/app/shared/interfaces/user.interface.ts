import { ApiResponse } from './api-response.interface';

export interface User {
    id: number;
    tipoDocumentoId: number;
    documento: string;
    primerNombre: string;
    segundoNombre: string | null;
    primerApellido: string;
    segundoApellido: string | null;
    rolId: number;
    activo: boolean;
}

export interface TipoDocumento {
    id: number;
    nombre: string;
    codigo: string;
}

export interface Rol {
    id: number;
    nombre: string;
    codigo: string;
}

export interface UserInitDataParams {
    tiposDocumento: TipoDocumento[];
    roles: Rol[];
}

export interface SaveUserDTO {
    tipoDocumentoId: string | number;
    documento: string;
    rolId: string | number;
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
}

// Al crear exige la clave
export interface CreateUserDTO extends SaveUserDTO {
    clave: string;
}

// Al actualizar la clave pasa a ser opcional
export interface UpdateUserDTO extends SaveUserDTO {
    clave?: string;
}

export type UserListResponse = ApiResponse<User[]>;
export type UserSingleResponse = ApiResponse<User>;
export type UserInitDataResponse = ApiResponse<UserInitDataParams>;
export type UserActionResponse = ApiResponse<null>;
