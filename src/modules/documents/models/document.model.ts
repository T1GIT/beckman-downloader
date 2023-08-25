import { Column, Model, Table } from 'sequelize-typescript';

export interface DocumentModelCreate
  extends Pick<DocumentModel, 'name' | 'ref' | 'document' | 'released'> {}

@Table
export class DocumentModel
  extends Model<DocumentModelCreate>
  implements DocumentModelCreate
{
  @Column
  name: string;

  @Column({ allowNull: true })
  ref?: string;

  @Column
  document: string;

  @Column
  released: Date;
}
