export interface LoginRequest {
    user: string;
    password: string;
}

export interface AuthUserData {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    usuarioId: number;
    documento: string;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
    showsMessage: boolean;
    errorCode: string | null;
    timestamp: string;
}

export interface MenuItem {
    id: number;
    padreMenuId: number | null;
    nombre: string;
    descripcion: string;
    codigo: string;
}

export type LoginResponse = ApiResponse<AuthUserData>;
export type UserRoutesResponse = ApiResponse<MenuItem[]>;
