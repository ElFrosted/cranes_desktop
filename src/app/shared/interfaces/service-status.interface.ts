import { ApiResponse } from "./api-response.interface";

export interface ServiceStatus {
    id: number;
    descripcion: string;
    codigo: string;
    activo: boolean;
}

export interface SaveServiceStatusDTO {
    descripcion: string;
    codigo: string;
    activo: boolean;
}

export type ServiceStatusListResponse = ApiResponse<ServiceStatus[]>;
export type ServiceStatusSingleResponse = ApiResponse<ServiceStatus>;
export type ServiceStatusActionResponse = ApiResponse<null>;
