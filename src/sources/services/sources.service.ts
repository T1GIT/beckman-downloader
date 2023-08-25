import { SourceModel } from '../models/source.model';
import { SourceUpdateDto } from '../dto/source-update.dto';
import { SourceCreateDto } from '../dto/source-create.dto';

export const sourcesService = {
  async getAll(offset?: number, limit?: number) {
    return SourceModel.findAll({ limit, offset });
  },

  async create(createDto: SourceCreateDto) {
    return SourceModel.create(createDto);
  },

  async update(id: number, updateDto: SourceUpdateDto) {
    const [, [updated]] = await SourceModel.update(updateDto, {
      where: { id },
      returning: true,
    });
    return updated;
  },

  async remove(id: number) {
    await SourceModel.destroy({ where: { id } });
  },
};
