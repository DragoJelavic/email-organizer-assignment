export interface Email {
  id?: number;
  to: string;
  subject: string;
  body: string;
  created_at?: string;
  updated_at?: string;
}

export interface EmailFormData {
  to: string;
  subject: string;
  body: string;
}
