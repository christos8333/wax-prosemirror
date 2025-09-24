/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useContext } from 'react';
import styled from 'styled-components';
import CSL from 'citeproc';
import { PortalContext } from 'wax-prosemirror-core';
import chicagoStyle from '../styles/chicago-author-date.csl?raw'; // Chicago author-date style
import harvardStyle from '../styles/harvard.csl?raw'; // Harvard author-date style
import simpleStyle from '../styles/simple-author-date.csl?raw'; // Simple author-date style
import apaStyle from '../styles/apa.csl?raw'; // APA CSL XML as string
import jmIndigoStyle from '../styles/jm-indigo.csl?raw'; // JM Indigo CSL XML as string (for future use)
import localeEnUS from '../styles/locales-en-US.xml?raw'; // Complete English US locale

const CitationCalloutNode = styled.span`
  color: red;
  user-select: none;
  cursor: default;
  display: inline-block;
  vertical-align: baseline;
  pointer-events: none;

  &.ProseMirror-selectednode {
    outline: 2px solid #68cef8;
    outline-offset: 1px;
  }
`;

// const items = {
//   'ITEM-1': {
//     id: 'ITEM-1',
//     type: 'book',
//     title: 'The Example Book',
//     author: [
//       {
//         family: 'Smith',
//         given: 'John',
//       },
//     ],
//     issued: {
//       'date-parts': [[2020]],
//     },
//     publisher: 'Example Publisher',
//     'publisher-place': 'New York',
//   },
// };

const items = {
  'ITEM-1': {
    id: 'ITEM-1',
    type: 'article-journal',
    title:
      'Collaboration in Virtual Environments: A Study of Remote Team Dynamics',
    author: [
      { family: 'Smith', given: 'John A.' },
      { family: 'Doe', given: 'Rebecca L.' },
    ],
    issued: { 'date-parts': [[2023]] },
    'container-title': 'Journal of Digital Research',
    volume: '15',
    issue: '2',
    page: '123-135',
    DOI: '10.1000/jdr.2023.15.2.123',
  },
};

// Use the complete English US locale
const localeXML = localeEnUS;

function getProcessor(styleXML, items, localeXML) {
  const sys = {
    retrieveLocale: lang => {
      console.log('Retrieving locale for lang:', lang);
      return localeXML;
    },
    retrieveItem: id => {
      console.log('Retrieving item for id:', id);
      const item = items[id];
      console.log('Retrieved item:', item);
      // Ensure the item has all required properties
      if (item) {
        // Add missing properties that CSL might expect
        const enhancedItem = {
          ...item,
          'citation-label': item['citation-label'] || id,
          'citation-number': item['citation-number'] || 1,
          'first-reference-note-number':
            item['first-reference-note-number'] || 1,
          'near-note': item['near-note'] || false,
          'original-date': item['original-date'] || null,
          status: item.status || 'published',
          'suppress-author': item['suppress-author'] || false,
          withheld: item.withheld || false,
        };
        console.log('Enhanced item:', enhancedItem);
        return enhancedItem;
      }
      return item;
    },
  };

  console.log('Creating CSL processor with style XML length:', styleXML.length);
  const processor = new CSL.Engine(sys, styleXML);
  console.log('CSL processor created:', processor);
  return processor;
}

const CitationCallout = ({ citationId = 'ITEM-1', context }) => {
  const { citationFormat } = useContext(PortalContext);

  useEffect(() => {
    console.log(
      'CitationCallout rendered with citationFormat:',
      citationFormat,
    );
  }, [citationFormat]);

  console.log('Citation format from PortalContext:', citationFormat);

  const citationText = useMemo(() => {
    try {
      console.log('Processing citation with ID:', citationId);
      console.log('Available items:', items);
      console.log('Using citation format:', citationFormat);

      // For APA inline citations, use simple format: (Author, Year)
      if (citationFormat === 'APA') {
        const item = items[citationId];
        if (item && item.author && item.author.length > 0) {
          const author = item.author[0];
          const year = item.issued && item.issued['date-parts'] 
            ? item.issued['date-parts'][0][0] 
            : 'n.d.';
          const apaInline = `(${author.family}, ${year})`;
          console.log('APA inline citation:', apaInline);
          return apaInline;
        }
        return `[${citationId}]`;
      }

      // For MLA inline citations, use format: (Author Page)
      if (citationFormat === 'MLA') {
        const item = items[citationId];
        if (item && item.author && item.author.length > 0) {
          const author = item.author[0];
          // For MLA, we typically don't include page numbers in inline citations unless specified
          // You can add page number logic here if needed
          const mlaInline = `(${author.family})`;
          console.log('MLA inline citation:', mlaInline);
          return mlaInline;
        }
        return `[${citationId}]`;
      }

      if (citationFormat === 'chicago') {
        console.log('Processing Chicago citation...');
        const item = items[citationId];
        console.log('Chicago item:', item);
        if (item && item.author && item.author.length > 0) {
          const author = item.author[0];
          const year = item.issued && item.issued['date-parts'] 
            ? item.issued['date-parts'][0][0] 
            : 'n.d.';
          // For Chicago, we can include page numbers if available
          const page = item.page ? `, ${item.page.split('-')[0]}` : ''; // Use first page if range
          const chicagoInline = `(${author.family} ${year}${page})`;
          console.log('Chicago inline citation result:', chicagoInline);
          return chicagoInline;
        }
        console.log('Chicago citation fallback to ID');
        return `[${citationId}]`;
      }

      // For Harvard inline citations, use format: (Author, Year)
      if (citationFormat === 'harvard') {
        console.log('Processing Harvard citation...');
        const item = items[citationId];
        console.log('Harvard item:', item);
        if (item && item.author && item.author.length > 0) {
          const author = item.author[0];
          const year = item.issued && item.issued['date-parts'] 
            ? item.issued['date-parts'][0][0] 
            : 'n.d.';
          const harvardInline = `(${author.family}, ${year})`;
          console.log('Harvard inline citation result:', harvardInline);
          return harvardInline;
        }
        console.log('Harvard citation fallback to ID');
        return `[${citationId}]`;
      }

      // For other styles, use CSL processor
      console.log('Falling through to CSL processor for format:', citationFormat);
      let selectedStyle = simpleStyle;
      switch (citationFormat) {
        case 'MLA':
          selectedStyle = simpleStyle;
          break;
        case 'harvard':
          selectedStyle = harvardStyle;
          break;
        case 'vancouver':
          selectedStyle = simpleStyle;
          break;
        case 'ieee':
          selectedStyle = simpleStyle;
          break;
        default:
          selectedStyle = simpleStyle;
      }

      const processor = getProcessor(selectedStyle, items, localeXML);

      // Set up the processor properly - use plain text instead of HTML
      processor.setOutputFormat('text');

      // Add error handling around updateItems
      try {
        console.log('Calling updateItems with citationId:', citationId);
        processor.updateItems([citationId]);
        console.log('updateItems completed successfully');
      } catch (updateError) {
        console.error('Error in updateItems:', updateError);
        // Try to continue with a simpler approach
        console.log('Attempting to continue without updateItems...');
      }

      console.log('Processor state after updateItems:', processor);

      // Try bibliography approach first
      console.log('Trying bibliography approach...');
      const bibliography = processor.makeBibliography();
      console.log('Bibliography result:', bibliography);

      // Check different parts of the bibliography result
      if (bibliography && bibliography.length > 0) {
        console.log('Bibliography length:', bibliography.length);
        console.log('Bibliography[0]:', bibliography[0]);
        console.log('Bibliography[1]:', bibliography[1]);

        if (bibliography[1] && bibliography[1].length > 0) {
          console.log('Found bibliography entry:', bibliography[1][0]);
          return bibliography[1][0];
        }
      }

      // Try citation cluster approach
      console.log('Trying citation cluster approach...');
      const citationResult = processor.makeCitationCluster({
        citationID: citationId,
        citationItems: [{ id: citationId }],
        properties: {},
      });

      console.log('Citation cluster result:', citationResult);

      // Try a simpler approach - just get the citation text directly
      if (citationResult && citationResult.length > 0) {
        const citation = citationResult[0];
        console.log('Citation object:', citation);

        // Try to extract the text from the citation
        if (citation && citation.length > 1) {
          const citationText = citation[1];
          console.log('Citation text:', citationText);

          if (citationText && citationText !== '[NO_PRINTED_FORM]') {
            return citationText;
          }
        }
      }

      // If all else fails, try to manually format the citation
      console.log('Manual fallback - creating simple citation...');
      const item = items[citationId];
      if (item && item.author && item.author.length > 0) {
        const author = item.author[0];
        const year =
          item.issued && item.issued['date-parts']
            ? item.issued['date-parts'][0][0]
            : 'n.d.';
        const simpleCitation = `(${author.family}, ${year})`;
        console.log('Manual citation:', simpleCitation);
        return simpleCitation;
      }

      return `[${citationId}]`;
    } catch (error) {
      console.error('Error processing citation:', error);
      console.error('Error details:', error.message, error.stack);
      return `[${citationId}]`;
    }
  }, [citationId, citationFormat]);

  return <CitationCalloutNode>{citationText}</CitationCalloutNode>;
};

export default CitationCallout;
