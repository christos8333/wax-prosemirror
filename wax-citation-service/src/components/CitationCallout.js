/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useContext } from 'react';
import styled from 'styled-components';
import CSL from 'citeproc';
import { PortalContext } from 'wax-prosemirror-core';
import citationDataService from '../services/CitationDataService';
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

// Use the complete English US locale
const localeXML = localeEnUS;

function getProcessor(styleXML, items) {
  const sys = {
    retrieveLocale: lang => {
      return localeXML;
    },
    retrieveItem: id => {
      const item = items[id];
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
        return enhancedItem;
      }
      return item;
    },
  };

  const processor = new CSL.Engine(sys, styleXML);
  return processor;
}

const CitationCallout = props => {
  const { citationFormat } = useContext(PortalContext);
  const { node } = props;
  const citationId = node?.attrs?.id;

  const citationText = useMemo(() => {
    try {
      if (!citationId) {
        return '[No Citation ID]';
      }

      // Get citation data from service instead of hardcoded items
      const item = citationDataService.getCitation(citationId);

      // For APA inline citations, use simple format: (Author, Year)
      if (citationFormat === 'APA') {
        if (item && item.author && item.author.length > 0) {
          const author = item.author[0];
          const year =
            item.issued && item.issued['date-parts']
              ? item.issued['date-parts'][0][0]
              : 'n.d.';
          const apaInline = `(${author.family}, ${year})`;
          return apaInline;
        }
        return `[${citationId}]`;
      }

      // For MLA inline citations, use format: (Author Page)
      if (citationFormat === 'MLA') {
        if (item && item.author && item.author.length > 0) {
          const author = item.author[0];
          // For MLA, we typically don't include page numbers in inline citations unless specified
          // You can add page number logic here if needed
          const mlaInline = `(${author.family})`;
          return mlaInline;
        }
        return `[${citationId}]`;
      }

      if (citationFormat === 'chicago') {
        if (item && item.author && item.author.length > 0) {
          const author = item.author[0];
          const year =
            item.issued && item.issued['date-parts']
              ? item.issued['date-parts'][0][0]
              : 'n.d.';
          // For Chicago, we can include page numbers if available
          const page = item.page ? `, ${item.page.split('-')[0]}` : ''; // Use first page if range
          const chicagoInline = `(${author.family} ${year}${page})`;
          return chicagoInline;
        }
        return `[${citationId}]`;
      }

      // For Harvard inline citations, use format: (Author, Year)
      if (citationFormat === 'harvard') {
        if (item && item.author && item.author.length > 0) {
          const author = item.author[0];
          const year =
            item.issued && item.issued['date-parts']
              ? item.issued['date-parts'][0][0]
              : 'n.d.';
          const harvardInline = `(${author.family}, ${year})`;
          return harvardInline;
        }
        return `[${citationId}]`;
      }

      // For simple inline citations, use format: (Author, Year)
      if (citationFormat === 'simple') {
        if (item && item.author && item.author.length > 0) {
          const author = item.author[0];
          const year =
            item.issued && item.issued['date-parts']
              ? item.issued['date-parts'][0][0]
              : 'n.d.';
          const simpleInline = `(${author.family}, ${year})`;
          return simpleInline;
        }
        return `[${citationId}]`;
      }

      // For Vancouver inline citations, use format: [1], [2], etc.
      if (citationFormat === 'vancouver') {
        const vancouverNumber = citationDataService.getVancouverNumber(
          citationId,
        );
        if (vancouverNumber) {
          return `[${vancouverNumber}]`;
        }
        return `[${citationId}]`;
      }

      // For other styles, use CSL processor
      let selectedStyle = simpleStyle;
      switch (citationFormat) {
        case 'MLA':
          selectedStyle = simpleStyle;
          break;
        case 'harvard':
          selectedStyle = harvardStyle;
          break;
        case 'ieee':
          selectedStyle = simpleStyle;
          break;
        default:
          selectedStyle = simpleStyle;
      }

      // Create a temporary items object with just the current citation for CSL processing
      const tempItems = { [citationId]: item };
      const processor = getProcessor(selectedStyle, tempItems, localeXML);

      // Set up the processor properly - use plain text instead of HTML
      processor.setOutputFormat('text');

      // Add error handling around updateItems
      try {
        processor.updateItems([citationId]);
      } catch (updateError) {}

      const bibliography = processor.makeBibliography();

      // Check different parts of the bibliography result
      if (bibliography && bibliography.length > 0) {
        if (bibliography[1] && bibliography[1].length > 0) {
          return bibliography[1][0];
        }
      }

      // Try citation cluster approach
      const citationResult = processor.makeCitationCluster({
        citationID: citationId,
        citationItems: [{ id: citationId }],
        properties: {},
      });

      // Try a simpler approach - just get the citation text directly
      if (citationResult && citationResult.length > 0) {
        const citation = citationResult[0];

        // Try to extract the text from the citation
        if (citation && citation.length > 1) {
          const citationText = citation[1];

          if (citationText && citationText !== '[NO_PRINTED_FORM]') {
            return citationText;
          }
        }
      }

      // If all else fails, try to manually format the citation
      if (item && item.author && item.author.length > 0) {
        const author = item.author[0];
        const year =
          item.issued && item.issued['date-parts']
            ? item.issued['date-parts'][0][0]
            : 'n.d.';
        const simpleCitation = `(${author.family}, ${year})`;
        return simpleCitation;
      }

      return `[${citationId}]`;
    } catch (error) {
      return `[${citationId}]`;
    }
  }, [citationId, citationFormat, citationDataService.getUpdateCounter()]);

  return <CitationCalloutNode>{citationText}</CitationCalloutNode>;
};

export default CitationCallout;
