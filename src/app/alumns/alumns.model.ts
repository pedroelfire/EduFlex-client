export interface Alumn {
    alumn_id: number;
    names: string;
    last_names: string;
    created_by: number;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface CreateAlumn {
    names: string;
    last_names: string;
}

