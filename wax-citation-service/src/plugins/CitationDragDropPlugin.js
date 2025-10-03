import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';
import citationDataService from '../services/CitationDataService';

const citationDragDropPlugin = new PluginKey('citationDragDropPlugin');

export default () => {
  return new Plugin({
    key: citationDragDropPlugin,
    props: {
      handleDOMEvents: {
        dragover: (view, event) => {
          // Check if this is our custom citation drag
          const hasCitationData = event.dataTransfer.types.includes(
            'application/json',
          );
          if (hasCitationData) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
            // Add visual feedback to editor
            view.dom.classList.add('drag-over');
            return true;
          }
          // Let ProseMirror handle native drag operations
          return false;
        },
        dragleave: (view, event) => {
          // Only remove class if leaving the editor completely
          if (!view.dom.contains(event.relatedTarget)) {
            view.dom.classList.remove('drag-over');
          }
          return false;
        },
        dragenter: (view, event) => {
          // Check if this is our custom citation drag
          const hasCitationData = event.dataTransfer.types.includes(
            'application/json',
          );
          if (hasCitationData) {
            event.preventDefault();
            view.dom.classList.add('drag-over');
            return true;
          }
          return false;
        },
        drop: (view, event) => {
          // Check if this is our custom citation drag
          let citationData;
          try {
            const jsonData = event.dataTransfer.getData('application/json');
            if (!jsonData) {
              // No JSON data, let ProseMirror handle it (native drag/drop)
              view.dom.classList.remove('drag-over');
              return false;
            }

            const data = JSON.parse(jsonData);
            if (data.type === 'citation' && data.data) {
              citationData = data.data;
            } else {
              // Not our citation data, let ProseMirror handle it
              view.dom.classList.remove('drag-over');
              return false;
            }
          } catch (error) {
            // Invalid JSON or no data, let ProseMirror handle it
            view.dom.classList.remove('drag-over');
            return false;
          }

          // Only handle if we have valid citation data
          if (citationData) {
            event.preventDefault();

            // Generate citation ID
            const citationId = citationDataService.generateCitationId(
              citationData,
            );

            // Store the citation data in the service
            citationDataService.addCitation(citationId, citationData);

            // Get drop position
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });

            if (coordinates) {
              const { pos } = coordinates;
              const { state, dispatch } = view;

              // Create citation callout node
              const citationCalloutType = state.schema.nodes.citation_callout;
              const citationCalloutNode = citationCalloutType.create(
                {
                  id: citationId,
                  class: 'citation-callout',
                },
                state.schema.text(citationData.title || 'Citation'),
              );

              // Insert the citation at the drop position
              const tr = state.tr.insert(pos, citationCalloutNode);

              // Set selection after the inserted citation
              const newSelection = TextSelection.create(
                tr.doc,
                pos + citationCalloutNode.nodeSize,
              );
              tr.setSelection(newSelection);

              dispatch(tr);

              // Remove drag-over class
              view.dom.classList.remove('drag-over');

              // Focus the editor
              view.focus();

              return true;
            }
          }

          // Remove drag-over class on any drop
          view.dom.classList.remove('drag-over');
          return false;
        },
      },
    },
  });
};
