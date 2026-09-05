import { ApiResponse } from "./api-response.interface";

export interface TipoVehiculo {
    id: number;
    nombre: string;
    codigo: string;
}

export interface Vehicle {
    id: number;
    tipoVehiculoId: TipoVehiculo;
    placa: string;
    codigo: string;
    activo: boolean;
}

export interface VehicleInitDataParams {
    tiposVehiculo: TipoVehiculo[];
}

export interface SaveVehicleDTO {
    tipoVehiculoId: string | number;
    placa: string;
    codigo: string;
}

export type VehicleListResponse = ApiResponse<Vehicle[]>;
export type VehicleSingleResponse = ApiResponse<Vehicle>;
export type VehicleInitDataResponse = ApiResponse<VehicleInitDataParams>;
export type VehicleActionResponse = ApiResponse<null>;