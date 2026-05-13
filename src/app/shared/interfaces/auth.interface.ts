import { User } from "./user.interface";

//TODO averiguar que tipo de info me devuelven
export interface Auth {
    message: string;
    token: string;
    user: User;
}
