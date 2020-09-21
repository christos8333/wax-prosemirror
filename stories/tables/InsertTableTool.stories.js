import React, { useState } from 'react';
import styled from 'styled-components';

import InsertTableTool from '../../wax-prosemirror-components/src/ui/tables/InsertTableTool';
import { Demo } from '../_helpers';

const Wrapper = styled.div`
  height: 450px;
`;

const Selected = styled.div`
  margin: 12px 0;
`;

export const Base = () => {
  const [selected, setSelected] = useState(null);

  const handleGridSelect = dimensions => setSelected(dimensions);

  return (
    <Demo onClickButton={() => setSelected(null)}>
      <Wrapper>
        <Selected>
          Selected:{' '}
          {selected && `${selected.rows} rows & ${selected.cols} columns`}
          {!selected && 'nothing'}
        </Selected>

        <InsertTableTool onGridSelect={handleGridSelect} />
      </Wrapper>
    </Demo>
  );
};

export default {
  component: InsertTableTool,
  title: 'Tables/Table Tool',
};
