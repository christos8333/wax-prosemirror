import { Service } from 'wax-prosemirror-core';
import { tableNodes, goToNextCell } from 'prosemirror-tables';
import Table from './Table';

class InsertTableService extends Service {
  register() {
    this.container.bind('Table').to(Table);
    const CreateShortCut = this.container.get('CreateShortCut');

    // eslint-disable-next-line camelcase
    const { table, table_row, table_cell, table_header } = tableNodes({
      tableGroup: 'block',
      cellContent: 'block+',
    });
    const createNode = this.container.get('CreateNode');

    createNode({
      table,
    });
    createNode({
      table_row,
    });
    createNode({
      table_cell,
    });
    createNode({
      table_header,
    });
    CreateShortCut({
      Tab: goToNextCell(1),
    });
    CreateShortCut({
      'Shift-Tab': goToNextCell(-1),
    });
  }
}

export default InsertTableService;
