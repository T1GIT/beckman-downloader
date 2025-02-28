import { SourceModel } from '../models/source.model';
import { SourceUpdateDto } from '../dto/source-update.dto';
import { SourceCreateDto } from '../dto/source-create.dto';
import { Pageable } from '../../shared/types/pageable';
import { Attributes, InferAttributes, Transaction } from 'sequelize';
import { queueService } from '../../crawler/services/queue.service';

export const sourcesService = {
  async existsById(id: number): Promise<boolean> {
    return (await SourceModel.count({ where: { id } })) > 0;
  },

  async getAll(
    offset?: number,
    limit?: number,
  ): Promise<Pageable<InferAttributes<SourceModel>>> {
    const data = await SourceModel.findAll({ limit, offset, raw: true });
    const total = await SourceModel.count();
    return {
      offset,
      limit,
      total,
      data,
    };
  },

  async getAllByRefreshing(
    refreshing: boolean,
  ): Promise<InferAttributes<SourceModel>[]> {
    return SourceModel.findAll({ where: { refreshing }, raw: true });
  },

  async getById(
    id: number,
    transaction?: Transaction,
  ): Promise<InferAttributes<SourceModel> | undefined> {
    return SourceModel.findByPk(id, { raw: true, transaction });
  },

  async create(
    createDto: SourceCreateDto,
  ): Promise<InferAttributes<SourceModel>> {
    const created = await SourceModel.create({ ...createDto });
    await queueService.refresh(created.id);
    return created.toJSON();
  },

  async update(
    id: number,
    updateDto: SourceUpdateDto,
  ): Promise<InferAttributes<SourceModel> | undefined> {
    const [, [updated]] = await SourceModel.update(updateDto, {
      where: { id },
      returning: true,
    });
    return updated.toJSON();
  },

  async setTotal(id: number, total: number): Promise<void> {
    await SourceModel.update({ total }, { where: { id } });
  },

  async startRefreshing(id: number): Promise<void> {
    await SourceModel.update({ refreshing: true }, { where: { id } });
  },

  async finishRefreshing(id: number): Promise<void> {
    await SourceModel.update(
      { refreshing: false, refreshed_at: new Date() },
      { where: { id } },
    );
  },

  async remove(id: number): Promise<void> {
    await SourceModel.destroy({ where: { id } });
  },
};
