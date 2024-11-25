export interface Criteria {
    criteria_id: number;
    name: string;
    value: number;
    grade?: number;
    created_by: number;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface createCriteria {
    name: string;
    value: number;
}
