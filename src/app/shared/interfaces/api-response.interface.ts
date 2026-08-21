export interface ApiResponse<T> {
    data: T | null;
    success: boolean;
    message: string;
    showsMessage: boolean;
    errorCode: string | null;
    timestamp: string;
}
