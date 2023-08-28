import { BeckmanDocument } from '../dto/beckman-document';
import { CreationAttributes } from 'sequelize';
import { DocumentModel } from '../../documents/models/document.model';

export const documentCreateConvertor = {
  fromBeckmanDocument(
    value: BeckmanDocument,
  ): Omit<CreationAttributes<DocumentModel>, 'source_id'> {
    return {
      title: value.title,
      external_id: value.id,
      description: value.description,
      page_type: value.pageType,
      access_type: value.accessType,
      category: value.category,
      class_name: value.className,
      document_number: value.documentNumber,
      released_date: value.releasedDate,
      url: `https://www.beckmancoulter.com${value.url}`,
    };
  },
};
