import { Column, Model, Table } from 'sequelize-typescript';

export interface SourceModelCreate extends Pick<SourceModel, 'url'> {}

@Table
export class SourceModel
  extends Model<SourceModelCreate>
  implements SourceModelCreate
{
  @Column
  url: string;

  @Column({ allowNull: true })
  last_total?: number;
}
