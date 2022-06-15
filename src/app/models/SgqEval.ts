import { Attachment } from "./attachment";
import { User } from "./user.model";
import {NonCompliance} from "./non-compliance";

export class SgqEval {
    id?: number;
    attachments: Attachment[] = [];
    author?:User
    recurrence?: NonCompliance[] = []
    text_area1: string;
    text_area2: string;
    text_area3: string;
    nonCompliance_id: number;
}
