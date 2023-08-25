import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class DocumentModel extends Model<
  DocumentModel,
  Pick<DocumentModel, 'name' | 'ref' | 'document' | 'released'>
> {
  @Column({ allowNull: false })
  name: string;

  @Column
  ref?: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  released: Date;
}
