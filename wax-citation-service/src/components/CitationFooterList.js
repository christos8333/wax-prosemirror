/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-else-return */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { PortalContext } from 'wax-prosemirror-core';
import citationDataService from '../services/CitationDataService';

const CitationListWrapper = styled.div`
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
`;

const CitationFooterList = () => {
  const { citationFormat } = useContext(PortalContext);
  const [citations, setCitations] = useState([]);

  // Update citations when the service changes
  useEffect(() => {
    const updateCitations = () => {
      const serviceFormat = citationDataService.getCurrentFormat();
      
      // Use service format if it's different from context format
      const effectiveFormat = serviceFormat !== 'simple' ? serviceFormat : citationFormat;
      
      if (effectiveFormat === 'vancouver' || effectiveFormat === 'ieee') {
        // Vancouver and IEEE: Show only unique citations (no duplicates)
        const uniqueCitations = citationDataService.getCitationsInVancouverOrder();
        setCitations(uniqueCitations);
      } else {
        // Other styles: Show all citation instances (including duplicates)
        const visibleCitations = citationDataService.getVisibleCitationInstances();
        setCitations(visibleCitations);
      }
    };

    // Initial load
    updateCitations();

    // Set up a simple polling mechanism to check for changes
    // In a real app, you might want to use a more sophisticated event system
    const interval = setInterval(updateCitations, 1000);

    return () => clearInterval(interval);
  }, [citationFormat]);

  const formatCitation = citation => {
    if (citationFormat === 'APA') {
      // APA format: Author, A. (Year). Title. Publisher.
      const author = citation.author[0];
      const year =
        citation.issued && citation.issued['date-parts']
          ? citation.issued['date-parts'][0][0]
          : 'n.d.';
      return `${author.family}, ${author.given} (${year}). ${citation.title}. ${citation.publisher}.`;
    }

    if (citationFormat === 'MLA') {
      // MLA format: Author, First Name. Title. Publisher, Year.
      const author = citation.author[0];
      const year =
        citation.issued && citation.issued['date-parts']
          ? citation.issued['date-parts'][0][0]
          : 'n.d.';
      return `${author.family}, ${author.given}. ${citation.title}. ${citation.publisher}, ${year}.`;
    }

    if (citationFormat === 'Chicago') {
      // Chicago Author-Date format: Author, First Name. Year. Title. Publisher.
      const author = citation.author[0];
      const year =
        citation.issued && citation.issued['date-parts']
          ? citation.issued['date-parts'][0][0]
          : 'n.d.';
      return `${author.family}, ${author.given}. ${year}. ${citation.title}. ${citation.publisher}.`;
    }

    if (citationFormat === 'harvard') {
      // Harvard format: Author, Initial. Year. Title. Publisher/Journal.
      const author = citation.author[0];
      const year =
        citation.issued && citation.issued['date-parts']
          ? citation.issued['date-parts'][0][0]
          : 'n.d.';
      // Use first initial of given name
      const initial = author.given ? author.given.charAt(0) + '.' : '';

      // Handle different citation types
      if (citation.type === 'article-journal') {
        // For journal articles: Author, Initial. Year. Title. Journal, Volume(Issue), pages.
        const journal = citation['container-title'] || 'Unknown Journal';
        const volume = citation.volume ? `, ${citation.volume}` : '';
        const issue = citation.issue ? `(${citation.issue})` : '';
        const pages = citation.page ? `, ${citation.page}` : '';
        return `${author.family}, ${initial} ${year}. ${citation.title}. ${journal}${volume}${issue}${pages}.`;
      } else {
        // For books: Author, Initial. Year. Title. Publisher.
        const publisher = citation.publisher || 'Unknown Publisher';
        return `${author.family}, ${initial} ${year}. ${citation.title}. ${publisher}.`;
      }
    }

    if (citationFormat === 'vancouver') {
      // Vancouver format: Author Surname Initial. Title. Publisher; Year.
      if (!citation.author || !citation.author[0]) {
        return `[Citation ${citation.id || 'Unknown'}]`;
      }

      const author = citation.author[0];
      const year =
        citation.issued && citation.issued['date-parts']
          ? citation.issued['date-parts'][0][0]
          : 'n.d.';
      // Use first initial of given name
      const initial = author.given ? author.given.charAt(0) : '';
      const publisher = citation.publisher || 'Unknown Publisher';
      const title = citation.title || 'Unknown Title';
      return `${author.family} ${initial}. ${title}. ${publisher}; ${year}.`;
    }

    if (citationFormat === 'ieee') {
      // IEEE format: [number] J. Smith, Title. Publisher, Year.
      if (!citation.author || !citation.author[0]) {
        return `[Citation ${citation.id || 'Unknown'}]`;
      }

      const author = citation.author[0];
      const year =
        citation.issued && citation.issued['date-parts']
          ? citation.issued['date-parts'][0][0]
          : 'n.d.';
      // Use first initial of given name
      const initial = author.given ? author.given.charAt(0) : '';
      const publisher = citation.publisher || 'Unknown Publisher';
      const title = citation.title || 'Unknown Title';
      return `[${citation.vancouverNumber || '?'}] ${initial}. ${
        author.family
      }, ${title}. ${publisher}, ${year}.`;
    }

    // Default format for other styles
    return `${citation.author[0].family}, ${citation.author[0].given}. ${citation.title}.`;
  };

  if (citations.length === 0) return null;

  return (
    <CitationListWrapper>
      <h1>References</h1>
      {citationFormat === 'vancouver' || citationFormat === 'ieee' ? (
        <ol>
          {citations.map((citation, index) => (
            <li key={`${citation.id}-${index}`}>{formatCitation(citation)}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {citations.map((citation, index) => (
            <li key={`${citation.id}-${index}`}>{formatCitation(citation)}</li>
          ))}
        </ul>
      )}
    </CitationListWrapper>
  );
};

export default CitationFooterList;
