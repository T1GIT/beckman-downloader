import { BeckmanDocument } from './beckman-document';

export interface BeckmanResponse {
  total: number;
  results: BeckmanDocument[];
}
