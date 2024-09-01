import dayjs from 'dayjs';
import { IExpertise } from 'app/shared/model/expertise.model';
import { Contract } from 'app/shared/model/enumerations/contract.model';

export interface IExperience {
  id?: number;
  title?: string;
  company?: string;
  description?: string | null;
  logoCompanyContentType?: string | null;
  logoCompany?: string | null;
  inProgress?: boolean;
  contract?: Contract;
  startDate?: string | null;
  endDate?: string | null;
  expertise?: IExpertise[] | null;
}

export const defaultValue: Readonly<IExperience> = {
  inProgress: false,
};
