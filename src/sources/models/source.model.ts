import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DocumentModel } from '../../documents/models/document.model';

@Table
export class SourceModel extends Model<SourceModel, Pick<SourceModel, 'url'>> {
  @Column({ allowNull: false })
  url: string;

  @Column
  last_total?: number;

  @Column({ defaultValue: false })
  refreshing: boolean;

  @HasMany(() => DocumentModel)
  documents: DocumentModel[];
}
