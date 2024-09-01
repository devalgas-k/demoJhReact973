import dayjs from 'dayjs';
import { ISubject } from 'app/shared/model/subject.model';

export interface IMessage {
  id?: number;
  name?: string;
  email?: string;
  phone?: string | null;
  message?: string | null;
  fileContentType?: string | null;
  file?: string | null;
  city?: string | null;
  otherCountry?: string | null;
  date?: string | null;
  subject?: ISubject;
}

export const defaultValue: Readonly<IMessage> = {};
