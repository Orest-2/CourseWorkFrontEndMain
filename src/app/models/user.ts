export interface User {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  email: string;
  belong_to: number;
  is_admin: boolean;
  is_customer: boolean;
  is_executor: boolean;
  is_secretary: boolean;
}
