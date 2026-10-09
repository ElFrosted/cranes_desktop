import { ApiResponse } from "./api-response.interface";

export interface Insurance {
    id: number,
    nombre: string,
    codigo: string,
    activo: boolean
}

export interface SaveInsuranceDTO {
    nombre: string
    codigo: string
}

export type InsuranceListResponse = ApiResponse<Insurance[]>;
export type InsuranceSingleResponse = ApiResponse<Insurance>;
export type InsuranceActionResponse = ApiResponse<null>;