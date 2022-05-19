import {User} from "./user.model";
import {Attachment} from "./attachment";

export class Cost {
    id: number;
    non_compliance_id: number;
    user: User
    attachment: Attachment = new Attachment();
    value: string;
    createdAt: string
}
