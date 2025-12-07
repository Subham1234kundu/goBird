export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: "New" | "Contacted" | "Qualified" | "Lost";
    remark: string;
    created_at: string;
    updated_at: string;
}

export interface CreateLeadData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export interface UpdateLeadData {
    status?: "New" | "Contacted" | "Qualified" | "Lost";
    remark?: string;
}
