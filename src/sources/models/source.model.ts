import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class SourceModel extends Model<SourceModel, Pick<SourceModel, 'url'>> {
  @Column({ allowNull: false })
  url: string;

  @Column
  last_total?: number;
}
