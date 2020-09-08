import React from 'react';
// import { lorem } from 'faker'

import GridCell from '../../wax-prosemirror-components/src/ui/tables/GridCell';

export const Base = () => <GridCell />;

export const Active = () => <GridCell active />;

export default {
  component: GridCell,
  title: 'Tables/Grid Cell',
};
