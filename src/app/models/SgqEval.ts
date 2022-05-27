import { Attachment } from "./attachment";
import { User } from "./user.model";
import {NonCompliance} from "./non-compliance";

export class SgqEval {
    id?: number;
    attachments: Attachment[] = [];
    author?:User
    recurrence?: NonCompliance[] = []
    textArea1: string;
    textArea2: string;
    textArea3: string;
    nonCompliance_id: number;
}
