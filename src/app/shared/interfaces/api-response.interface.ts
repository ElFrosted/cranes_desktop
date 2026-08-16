export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
    showsMessage: boolean;
    errorCode: string | null;
    timestamp: string;
}
