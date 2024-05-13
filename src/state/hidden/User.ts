import IUser from "../public/IUser";
import {v4 as uuidv4} from "uuid";
import UserBase from "../public/UserBase";

class User implements IUser {
    public readonly id: string;
    public readonly username: string;
    public readonly password: string;
    public readonly email: string | undefined;

    public constructor(data: UserBase) {
        this.id = data.id ?? uuidv4();
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
    }
}
export default User;