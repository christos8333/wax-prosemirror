/* eslint-disable react/prop-types */
import React from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

const Translation = ({ label, defaultTr }) => {
  console.log('asdads', defaultTr);
  const { t, i18n } = useTranslation();
  return <>{!isEmpty(i18n) && i18n.exists(label) ? t(label) : defaultTr}</>;
};

export default Translation;
