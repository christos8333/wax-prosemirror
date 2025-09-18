import React, { useMemo } from 'react';
import styled from 'styled-components';
import CSL from 'citeproc';
import chicagoStyle from '../styles/chicago-author-date.csl?raw'; // Chicago author-date style
import simpleStyle from '../styles/simple-author-date.csl?raw'; // Simple author-date style
import apaStyle from '../styles/apa.csl?raw'; // APA CSL XML as string
import jmIndigoStyle from '../styles/jm-indigo.csl?raw'; // JM Indigo CSL XML as string (for future use)
import localeEnUS from '../styles/locales-en-US.xml?raw'; // Complete English US locale

const CitationCalloutNode = styled.span`
  color: red;
`;

const items = {
  'ITEM-1': {
    id: 'ITEM-1',
    type: 'book',
    title: 'The Example Book',
    author: [
      {
        family: 'Smith',
        given: 'John'
      }
    ],
    issued: {
      'date-parts': [[2020]]
    },
    publisher: 'Example Publisher',
    'publisher-place': 'New York'
  },
};

// Use the complete English US locale
const localeXML = localeEnUS;

function getProcessor(styleXML, items, localeXML) {
  const sys = {
    retrieveLocale: (lang) => {
      console.log('Retrieving locale for lang:', lang);
      return localeXML;
    },
    retrieveItem: (id) => {
      console.log('Retrieving item for id:', id);
      const item = items[id];
      console.log('Retrieved item:', item);
      return item;
    },
  };
  
  console.log('Creating CSL processor with style XML length:', styleXML.length);
  const processor = new CSL.Engine(sys, styleXML);
  console.log('CSL processor created:', processor);
  return processor;
}

const CitationCallout = ({ citationId = 'ITEM-1' }) => {
  const citationText = useMemo(() => {
    try {
      console.log('Processing citation with ID:', citationId);
      console.log('Available items:', items);
      
      // Use Chicago style (known to work well)
      const processor = getProcessor(chicagoStyle, items, localeXML);
      
      // Set up the processor properly - use plain text instead of HTML
      processor.setOutputFormat('text');
      processor.updateItems([citationId]);

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
        const year = item.issued && item.issued['date-parts'] ? item.issued['date-parts'][0][0] : 'n.d.';
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
  }, [citationId]);

  return <CitationCalloutNode>{citationText}</CitationCalloutNode>;
};

export default CitationCallout;
