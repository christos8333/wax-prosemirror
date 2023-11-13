/* eslint-disable no-underscore-dangle */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { WaxContext } from 'wax-prosemirror-core';

const BlockDropDownComponent = ({ view, tools }) => {
  const { t, i18n } = useTranslation();
  const context = useContext(WaxContext);
  const {
    activeViewId,
    pmViews: { main },
  } = context;

  const [label, setLabel] = useState(null);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const translatedLabel = (translation, defaultLabel) => {
    return !isEmpty(i18n) && i18n.exists(translation)
      ? t(translation)
      : defaultLabel;
  };

  const dropDownOptions = [
    {
      label: translatedLabel(`Wax.BlockLevel.Heading 2`, 'Heading 2'),
      value: '5',
      item: tools[5],
    },
    {
      label: translatedLabel(`Wax.BlockLevel.Heading 3`, 'Heading 3'),
      value: '6',
      item: tools[6],
    },
    {
      label: translatedLabel(`Wax.BlockLevel.Paragraph`, 'Paragraph'),
      value: '8',
      item: tools[8],
    },
    {
      label: translatedLabel(`Wax.BlockLevel.Block Quote`, 'Block Quote'),
      value: '13',
      item: tools[13],
    },
  ];

  return <>DropDown</>;
};

export default BlockDropDownComponent;
