/* eslint react/prop-types: 0 */

import React from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LeftMenuStyled = styled.div`
  border-bottom: 1px solid #d9d9d9;
  color: #979797;
  font-family: 'Fira Sans';
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0.6px;
  list-style: none;
  line-height: 0;
  margin: 5px 0;
  display: block;
  padding: 20px 0 10px;
  margin-left: 10px;
  text-align: left;
  text-transform: uppercase;
  width: 51%;
`;

const LeftMenuTitle = ({ title }) => {
  const { t, i18n } = useTranslation();
  return (
    <LeftMenuStyled>
      {!isEmpty(i18n) && i18n.exists(`Wax.Various.${title}`)
        ? t(`Wax.Various.${title}`)
        : title}
    </LeftMenuStyled>
  );
};

export default LeftMenuTitle;
