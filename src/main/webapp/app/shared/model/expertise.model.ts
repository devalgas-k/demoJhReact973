import { IExperience } from 'app/shared/model/experience.model';

export interface IExpertise {
  id?: number;
  title?: string;
  description?: string | null;
  level?: number | null;
  experiences?: IExperience[] | null;
}

export const defaultValue: Readonly<IExpertise> = {};
