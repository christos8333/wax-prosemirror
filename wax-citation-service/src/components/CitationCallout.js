import React, { useContext, useEffect, useState } from 'react';
import { PortalContext } from 'wax-prosemirror-core';
import citationDataService from '../services/CitationDataService';
import styled from 'styled-components';

const CitationCalloutNode = styled.span`
  color: red;
  user-select: none;
  cursor: text;
  display: inline;
  vertical-align: baseline;
  position: relative;

  &.ProseMirror-selectednode {
    outline: 2px solid #68cef8;
    outline-offset: 1px;
  }

  /* Firefox-specific fix for cursor visibility */
  @-moz-document url-prefix() {
    & {
      display: inline;
      pointer-events: auto;
    }
  }
`;

const CitationCallout = props => {
  const { citationFormat } = useContext(PortalContext);
  const serviceFormat = citationDataService.getCurrentFormat();
  const { node, view, getPos } = props;
  const citationId = node?.attrs?.id;

  // Use service format if it's different from context format
  const effectiveFormat = serviceFormat !== 'simple' ? serviceFormat : citationFormat;

  const [citationText, setCitationText] = useState(`[${citationId}]`);

  console.log('CitationCallout: Component rendered for ID:', citationId);
  console.log('CitationCallout: Node attrs:', node?.attrs);
  console.log('CitationCallout: Effective format:', effectiveFormat);

  // Generate citation text based on format and data
  const generateCitationText = (format, data) => {
    if (!data) {
      return `[${citationId}]`;
    }

    switch (format) {
      case 'vancouver':
      case 'ieee':
        const vancouverNumber = citationDataService.getVancouverNumber(citationId);
        return `[${vancouverNumber || '?'}]`;
      
      case 'APA':
        if (data.author && data.author[0]) {
          const author = data.author[0];
          const year = data.issued && data.issued['date-parts'] 
            ? data.issued['date-parts'][0][0] 
            : 'n.d.';
          return `(${author.family}, ${year})`;
        }
        return `[${citationId}]`;
      
      case 'MLA':
        if (data.author && data.author[0]) {
          const author = data.author[0];
          return `(${author.family})`;
        }
        return `[${citationId}]`;
      
      case 'harvard':
        if (data.author && data.author[0]) {
          const author = data.author[0];
          const year = data.issued && data.issued['date-parts'] 
            ? data.issued['date-parts'][0][0] 
            : 'n.d.';
          return `(${author.family}, ${year})`;
        }
        return `[${citationId}]`;
      
      default: // simple and others
        if (data.author && data.author[0]) {
          const author = data.author[0];
          const year = data.issued && data.issued['date-parts'] 
            ? data.issued['date-parts'][0][0] 
            : 'n.d.';
          return `(${author.family}, ${year})`;
        }
        return `[${citationId}]`;
    }
  };

  // Update citation text when format or data changes
  useEffect(() => {
    if (!citationId) return;

    // First check if citation data exists in node attributes (YJS persistence)
    let citationData = node?.attrs?.citationData;
    
    // If not in node attributes, check service
    if (!citationData) {
      citationData = citationDataService.getCitation(citationId);
    }
    
    // If still no data, create placeholder (only for truly new citations)
    if (!citationData) {
      console.log('CitationCallout: Creating citation data for', citationId);
      citationData = {
        id: citationId,
        title: `Citation ${citationId.substring(0, 8)}...`,
        author: [{ family: 'Unknown', given: 'Author' }],
        issued: { 'date-parts': [[2023]] },
        type: 'article-journal',
        'container-title': 'Unknown Journal',
        volume: '1',
        issue: '1',
        page: '1-10',
        DOI: `10.1000/placeholder.${citationId.substring(0, 8)}`,
      };
      citationDataService.addCitation(citationId, citationData);
    } else {
      console.log('CitationCallout: Found existing citation data:', citationData);
      // Make sure it's also in the service for consistency
      if (!citationDataService.getCitation(citationId)) {
        citationDataService.addCitation(citationId, citationData);
      }
    }

    // Generate and set citation text
    const newCitationText = generateCitationText(effectiveFormat, citationData);
    setCitationText(newCitationText);

    // Update node attributes for YJS persistence
    if (view && getPos) {
      view.dispatch(
        view.state.tr.setNodeMarkup(getPos(), undefined, {
          ...node.attrs,
          citationData: citationData,
          citationText: newCitationText,
        })
      );
    }
  }, [effectiveFormat, citationId, node?.attrs?.citationData, view, getPos]);

  return (
    <CitationCalloutNode
      className="citation-callout"
      data-id={citationId}
      contentEditable={false}
    >
      {citationText}
    </CitationCalloutNode>
  );
};

export default CitationCallout;