import dayjs from 'dayjs';
import { IJob } from 'app/shared/model/job.model';
import { IDepartment } from 'app/shared/model/department.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IJobHistory {
  id?: number;
  startDate?: string | null;
  endDate?: string | null;
  language?: Language | null;
  fileContentType?: string | null;
  file?: string | null;
  date?: string | null;
  duration?: string | null;
  job?: IJob | null;
  department?: IDepartment | null;
  employee?: IEmployee | null;
}

export const defaultValue: Readonly<IJobHistory> = {};
