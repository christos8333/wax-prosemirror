import React, { useMemo } from 'react';
import styled from 'styled-components';
import CSL from 'citeproc';
import apaStyle from '../styles/apa.csl?raw'; // APA CSL XML as string

const CitationCalloutNode = styled.span`
  color: red;
`;

const items = {
  'ITEM-1': {
    id: 'ITEM-1',
    type: 'book',
    title: 'The Example Book',
    author: [{ family: 'Smith', given: 'John' }],
    issued: { 'date-parts': [[2020]] },
    publisher: 'Example Publisher',
  },
};

const localeXML = `<?xml version="1.0" encoding="utf-8"?>
<locale xmlns="http://purl.org/net/xbiblio/csl" xml:lang="en">
  <terms>
    <term name="editortranslator" form="long">
      <single>editor &amp; translator</single>
      <multiple>editors &amp; translators</multiple>
    </term>
    <term name="editortranslator" form="short">
      <single>ed. &amp; trans.</single>
      <multiple>eds. &amp; trans.</multiple>
    </term>
    <term name="translator" form="long">
      <single>translator</single>
      <multiple>translators</multiple>
    </term>
    <term name="translator" form="short">
      <single>trans.</single>
      <multiple>trans.</multiple>
    </term>
    <term name="editor" form="long">
      <single>editor</single>
      <multiple>editors</multiple>
    </term>
    <term name="editor" form="short">
      <single>ed.</single>
      <multiple>eds.</multiple>
    </term>
    <term name="editortranslator" form="verb">
      <single>edited &amp; translated by</single>
      <multiple>edited &amp; translated by</multiple>
    </term>
    <term name="translator" form="verb">
      <single>translated by</single>
      <multiple>translated by</multiple>
    </term>
    <term name="editor" form="verb">
      <single>edited by</single>
      <multiple>edited by</multiple>
    </term>
    <term name="editortranslator" form="verb-short">
      <single>ed. &amp; trans.</single>
      <multiple>eds. &amp; trans.</multiple>
    </term>
    <term name="translator" form="verb-short">
      <single>trans.</single>
      <multiple>trans.</multiple>
    </term>
    <term name="editor" form="verb-short">
      <single>ed.</single>
      <multiple>eds.</multiple>
    </term>
    <term name="container-title" form="long">
      <single>in</single>
      <multiple>in</multiple>
    </term>
    <term name="container-title" form="short">
      <single>in</single>
      <multiple>in</multiple>
    </term>
    <term name="collection-title" form="long">
      <single>in</single>
      <multiple>in</multiple>
    </term>
    <term name="collection-title" form="short">
      <single>in</single>
      <multiple>in</multiple>
    </term>
    <term name="archive" form="long">
      <single>from</single>
      <multiple>from</multiple>
    </term>
    <term name="archive" form="short">
      <single>from</single>
      <multiple>from</multiple>
    </term>
    <term name="event" form="long">
      <single>presented at</single>
      <multiple>presented at</multiple>
    </term>
    <term name="event" form="short">
      <single>presented at</single>
      <multiple>presented at</multiple>
    </term>
    <term name="event" form="verb">
      <single>presented at</single>
      <multiple>presented at</multiple>
    </term>
    <term name="event" form="verb-short">
      <single>presented at</single>
      <multiple>presented at</multiple>
    </term>
    <term name="event" form="noun">
      <single>presentation</single>
      <multiple>presentations</multiple>
    </term>
    <term name="event" form="noun-short">
      <single>presentation</single>
      <multiple>presentations</multiple>
    </term>
    <term name="recalled" form="long">
      <single>retrieved</single>
      <multiple>retrieved</multiple>
    </term>
    <term name="recalled" form="short">
      <single>retrieved</single>
      <multiple>retrieved</multiple>
    </term>
    <term name="original-date" form="long">
      <single>originally published</single>
      <multiple>originally published</multiple>
    </term>
    <term name="original-date" form="short">
      <single>orig. pub.</single>
      <multiple>orig. pub.</multiple>
    </term>
    <term name="original-date" form="verb">
      <single>originally published</single>
      <multiple>originally published</multiple>
    </term>
    <term name="original-date" form="verb-short">
      <single>orig. pub.</single>
      <multiple>orig. pub.</multiple>
    </term>
    <term name="original-date" form="noun">
      <single>original publication</single>
      <multiple>original publications</multiple>
    </term>
    <term name="original-date" form="noun-short">
      <single>orig. pub.</single>
      <multiple>orig. pub.</multiple>
    </term>
    <term name="issued" form="long">
      <single>published</single>
      <multiple>published</multiple>
    </term>
    <term name="issued" form="short">
      <single>pub.</single>
      <multiple>pub.</multiple>
    </term>
    <term name="issued" form="verb">
      <single>published</single>
      <multiple>published</multiple>
    </term>
    <term name="issued" form="verb-short">
      <single>pub.</single>
      <multiple>pub.</multiple>
    </term>
    <term name="issued" form="noun">
      <single>publication</single>
      <multiple>publications</multiple>
    </term>
    <term name="issued" form="noun-short">
      <single>pub.</single>
      <multiple>pub.</multiple>
    </term>
    <term name="accessed" form="long">
      <single>accessed</single>
      <multiple>accessed</multiple>
    </term>
    <term name="accessed" form="short">
      <single>accessed</single>
      <multiple>accessed</multiple>
    </term>
    <term name="accessed" form="verb">
      <single>accessed</single>
      <multiple>accessed</multiple>
    </term>
    <term name="accessed" form="verb-short">
      <single>accessed</single>
      <multiple>accessed</multiple>
    </term>
    <term name="accessed" form="noun">
      <single>access</single>
      <multiple>access</multiple>
    </term>
    <term name="accessed" form="noun-short">
      <single>access</single>
      <multiple>access</multiple>
    </term>
    <term name="submitted" form="long">
      <single>submitted</single>
      <multiple>submitted</multiple>
    </term>
    <term name="submitted" form="short">
      <single>submitted</single>
      <multiple>submitted</multiple>
    </term>
    <term name="submitted" form="verb">
      <single>submitted</single>
      <multiple>submitted</multiple>
    </term>
    <term name="submitted" form="verb-short">
      <single>submitted</single>
      <multiple>submitted</multiple>
    </term>
    <term name="submitted" form="noun">
      <single>submission</single>
      <multiple>submissions</multiple>
    </term>
    <term name="submitted" form="noun-short">
      <single>submission</single>
      <multiple>submissions</multiple>
    </term>
    <term name="abstract" form="long">
      <single>abstract</single>
      <multiple>abstracts</multiple>
    </term>
    <term name="abstract" form="short">
      <single>abstract</single>
      <multiple>abstracts</multiple>
    </term>
    <term name="annote" form="long">
      <single>annotation</single>
      <multiple>annotations</multiple>
    </term>
    <term name="annote" form="short">
      <single>annotation</single>
      <multiple>annotations</multiple>
    </term>
    <term name="reference" form="long">
      <single>reference</single>
      <multiple>references</multiple>
    </term>
    <term name="reference" form="short">
      <single>reference</single>
      <multiple>references</multiple>
    </term>
    <term name="references" form="long">
      <single>references</single>
      <multiple>references</multiple>
    </term>
    <term name="references" form="short">
      <single>references</single>
      <multiple>references</multiple>
    </term>
  </terms>
  <date form="text">
    <date-part name="year"/>
  </date>
</locale>`;

function getProcessor(styleXML, items, localeXML) {
  const sys = {
    retrieveLocale: () => localeXML,
    retrieveItem: id => items[id],
  };
  return new CSL.Engine(sys, styleXML);
}

const CitationCallout = ({ citationId = 'ITEM-1' }) => {
  const citationText = useMemo(() => {
    try {
      const processor = getProcessor(apaStyle, items, localeXML);
      processor.updateItems([citationId]);

      const [citation] = processor.makeCitationCluster({
        citationID: citationId,
        citationItems: [{ id: citationId }],
        properties: {},
      });

      return citation[1] || `[${citationId}]`;
    } catch (error) {
      console.error('Error processing citation:', error);
      return `[${citationId}]`;
    }
  }, [citationId]);

  return <CitationCalloutNode>{citationText}</CitationCalloutNode>;
};

export default CitationCallout;
