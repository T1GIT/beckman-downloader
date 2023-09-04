import { DocumentModel } from '../models/document.model';
import { CreationAttributes, InferAttributes } from 'sequelize';
import { Pageable } from '../../shared/types/pageable';

export const documentsService = {
  async existsById(id: number): Promise<boolean> {
    return (await DocumentModel.count({ where: { id } })) > 0;
  },

  async getAll(
    offset?: number,
    limit?: number,
  ): Promise<Pageable<InferAttributes<DocumentModel>>> {
    const data = await DocumentModel.findAll({
      limit,
      offset,
      raw: true,
      attributes: { exclude: ['file'] },
    });
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
      attributes: { exclude: ['file'] },
    });
    const total = await DocumentModel.count();
    return {
      offset,
      limit,
      total,
      data,
    };
  },

  async getById(
    id: number,
  ): Promise<InferAttributes<DocumentModel> | undefined> {
    return await DocumentModel.findByPk(id, {
      raw: true,
      attributes: { exclude: ['file'] },
    });
  },

  async getFileById(id: number): Promise<Buffer | undefined> {
    const document = await DocumentModel.findByPk(id, {
      raw: true,
      attributes: ['file'],
    });
    return document?.file;
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
