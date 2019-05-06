import { CopirightAppTask } from '.';

export interface CopyrightApplication {
  id: number;
  product_id: number;
  title: string;
  description: string;
  tasks: CopirightAppTask[];
}
