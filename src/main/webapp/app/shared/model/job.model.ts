import dayjs from 'dayjs';
import { ITask } from 'app/shared/model/task.model';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IJob {
  id?: number;
  jobTitle?: string;
  minSalary?: number | null;
  maxSalary?: number | null;
  subSalary?: number | null;
  totalSalary?: number | null;
  date?: string | null;
  codeCode?: string | null;
  profilContentType?: string;
  profil?: string;
  tasks?: ITask[] | null;
  employee?: IEmployee | null;
}

export const defaultValue: Readonly<IJob> = {};
