import {
  Column,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { SourceModel } from '../../sources/models/source.model';

@Table({ timestamps: false })
export class DocumentModel extends Model<
  DocumentModel,
  Pick<
    DocumentModel,
    | 'title'
    | 'external_id'
    | 'description'
    | 'page_type'
    | 'access_type'
    | 'category'
    | 'class_name'
    | 'document_number'
    | 'released_date'
    | 'url'
    | 'file'
    | 'source_id'
  >
> {
  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  external_id: string;

  @Column
  description?: string;

  @Column
  page_type?: string;

  @Column
  access_type?: string;

  @Column
  category?: string;

  @Column
  class_name?: string;

  @Column
  document_number?: string;

  @Column
  released_date?: Date;

  @Column({ allowNull: false })
  url: string;

  @Column({ type: DataType.BLOB, allowNull: false })
  file: Buffer;

  @ForeignKey(() => SourceModel)
  @Column({ allowNull: false })
  source_id: number;

  @BelongsTo(() => SourceModel, { onDelete: 'CASCADE' })
  source: SourceModel;
}
