import { DocumentModel } from '../models/document.model';
import {
  CreationAttributes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { Pageable } from '../../shared/types/pageable';

export const documentsService = {
  async getAll(
    offset?: number,
    limit?: number,
  ): Promise<Pageable<InferAttributes<DocumentModel>>> {
    const data = await DocumentModel.findAll({ limit, offset, raw: true });
    const total = await DocumentModel.count();
    return {
      offset,
      limit,
      total,
      data,
    };
  },

  async getAllBySourceId(
    sourceId: number,
    offset?: number,
    limit?: number,
  ): Promise<Pageable<InferAttributes<DocumentModel>>> {
    const data = await DocumentModel.findAll({
      where: { source_id: sourceId },
      limit,
      offset,
      raw: true,
    });
    const total = await DocumentModel.count();
    return {
      offset,
      limit,
      total,
      data,
    };
  },

  async create(
    createDto: CreationAttributes<DocumentModel>,
  ): Promise<InferAttributes<DocumentModel>> {
    const created = await DocumentModel.create(createDto);
    return created.toJSON();
  },

  async createMany(
    createDtos: CreationAttributes<DocumentModel>[],
  ): Promise<InferAttributes<DocumentModel>[]> {
    const created = await DocumentModel.bulkCreate(createDtos, {
      returning: true,
    });
    return created.map((c) => c.toJSON());
  },
};
