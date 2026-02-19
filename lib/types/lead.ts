export type LeadStatus =
    | "New"
    | "Contacted"
    | "In Discussion"
    | "Negotiation"
    | "Proposal Sent"
    | "Won / Converted"
    | "Lost"
    | "Follow-Up Scheduled"
    | "Not Qualified"
    | "Reopened";

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: LeadStatus;
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
    status?: LeadStatus;
    remark?: string;
}
