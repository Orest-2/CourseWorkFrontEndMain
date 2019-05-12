import { ApplicationTask } from ".";

export interface Application {
  director_id?: number;
  executor_id?: number;
  status?: number;
  acceptor_id?: number;
  customer_id?: number;
  id: number;
  product_id: number;
  title: string;
  description: string;
  tasks: ApplicationTask[];
}
