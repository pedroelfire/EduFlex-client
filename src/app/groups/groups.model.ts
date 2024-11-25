import { Alumn, AlumnCriteria } from "../alumns/alumns.model";
import { Criteria } from "../criteria/criteria.model";

export interface Group {
    group_id: number;
    name: string;
    grade: string;
    created_by: number;
    created_at: Date | string;
    updated_at: Date | string;
    alumn_count?: number
}

export interface CreateGroup {
    name: string;
    grade: number;
    alumns: Alumn[];
    criteria: Criteria[]
}

export interface alumnsInGroupAndNotInGroupResponse {
    alumns_in_group: Alumn[];
    alumns_not_in_group: Alumn[]
}

export interface groupDetail {
    group: Group,
    alumns: AlumnCriteria[]
}


