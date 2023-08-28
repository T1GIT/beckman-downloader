import axios from 'axios';
import { BeckmanResponse } from '../dto/beckman-response';

export const beckmanService = {
  async getAll(
    url: string,
    page?: number,
    limit?: number,
  ): Promise<BeckmanResponse> {
    const { data } = await axios.get<BeckmanResponse>(url, {
      params: {
        query: '*',
        index: page,
        size: limit,
        languages: 'English',
        type: 'tech-docs',
      },
      headers: {
        Cookie:
          'foundation.globalization.country=US; foundation.globalization.language=en; website#lang=en; wsrcookie=en_US',
      },
    });
    return data;
  },
};
