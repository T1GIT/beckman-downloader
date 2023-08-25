import { SourceModel, SourceModelCreate } from '../models/source.model';

export const sourcesService = {
  async getAll(offset?: number, limit?: number) {
    return SourceModel.findAll({ limit, offset });
  },

  async create(model: SourceModelCreate) {
    return SourceModel.create(model);
  },
};
