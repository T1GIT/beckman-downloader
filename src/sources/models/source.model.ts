import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DocumentModel } from '../../documents/models/document.model';

@Table({ timestamps: false })
export class SourceModel extends Model<SourceModel, Pick<SourceModel, 'path'>> {
  @Column({ allowNull: false })
  path: string;

  @Column
  total?: number;

  @Column({ defaultValue: false })
  refreshing: boolean;

  @Column
  refreshed_at?: Date;

  @HasMany(() => DocumentModel)
  documents: DocumentModel[];
}
