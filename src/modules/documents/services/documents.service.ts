import { DocumentModel, DocumentModelCreate } from '../models/document.model';

export const documentsService = {
  async getAll(offset?: number, limit?: number) {
    return DocumentModel.findAll({ limit, offset });
  },

  async create(model: DocumentModelCreate): Promise<DocumentModel> {
    return DocumentModel.create(model);
  },
};
