import { DocumentModel } from '../models/document.model';
import { CreationAttributes } from 'sequelize';

export const documentsService = {
  async getAll(offset?: number, limit?: number) {
    return DocumentModel.findAll({ limit, offset });
  },

  async create(
    createDto: CreationAttributes<DocumentModel>,
  ): Promise<DocumentModel> {
    return DocumentModel.create(createDto);
  },
};
