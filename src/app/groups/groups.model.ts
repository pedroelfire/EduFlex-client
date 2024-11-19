import { Alumn } from "../alumns/alumns.model";

export interface Group {
    group_id: number;
    name: string;
    grade: string;
    created_by: number;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface CreateGroup {
    name: string;
    grade: number;
}

export interface alumnsInGroupAndNotInGroupResponse {
    alumns_in_group: Alumn[];
    alumns_not_in_group: Alumn[]
}

