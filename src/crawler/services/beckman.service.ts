import axios, { Axios } from 'axios';
import { BeckmanResponse } from '../dto/beckman-response';

const beckmanAxios = new Axios({
  baseURL: 'https://www.beckmancoulter.com',
  headers: {
    Cookie:
      'foundation.globalization.country=US; foundation.globalization.language=en; website#lang=en; wsrcookie=en_US',
  },
});

export const beckmanService = {
  async getAll(
    path: string,
    page?: number,
    limit?: number,
  ): Promise<BeckmanResponse> {
    const { data } = await beckmanAxios.get<BeckmanResponse>(path, {
      params: {
        query: '*',
        index: page,
        size: limit,
        languages: 'English',
        type: 'tech-docs',
      },
    });
    return data;
  },

  async getFile(id: string): Promise<Buffer> {
    const { data } = await beckmanAxios.get<ArrayBuffer>(`/download/${id}`, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(data);
  },
};
