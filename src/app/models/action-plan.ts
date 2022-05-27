import { User } from "./user.model";

export class ActionPlan {
    id?:number;
    description?:string;
    term?:string;
    status?:string;
    responsible?:User;
    proposalSolutionId?:number;
}
