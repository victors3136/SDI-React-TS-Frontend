import UserBase from "./UserBase";

interface IUser extends UserBase {
    get id(): string;

    get username(): string;

    get password(): string;

    get email(): string | undefined;
}

export default IUser;