import { DefaultProperties } from 'src/app/models/defaultProperties.model';

export class ParamDict extends DefaultProperties {
  paramName?: string;
  isDepartment?: boolean;
  isUser?: boolean;
  default2CreateStock?: boolean;
  default2CreateSaple?: boolean;
  description?: string;
  defaultValue?: string;
}
