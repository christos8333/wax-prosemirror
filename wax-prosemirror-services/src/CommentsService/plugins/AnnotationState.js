/* eslint-disable no-param-reassign */
import { Decoration, DecorationSet } from 'prosemirror-view';
import AnnotationDecoration from './AnnotationDecoration';
import { createAnnotationRendering } from './rendering/engine';
import { AnnotationPluginKey } from './AnnotationPlugin';

export default class AnnotationState {
  constructor(options) {
    this.decorations = DecorationSet.empty;
    this.options = options;
  }

  // eslint-disable-next-line class-methods-use-this
  randomId() {
    return Math.floor(Math.random() * 0xffffffff).toString();
  }

  addAnnotation(action) {
    console.log('here?');
    const { map } = this.options;
    const { from, to, data } = action;
    const id = this.randomId();
    map.set(id, { id, from, to, data });
  }

  updateAnnotation(action) {
    const { map } = this.options;
    const annotationToUpdate = map.get(action.id);
    if (annotationToUpdate) {
      annotationToUpdate.data = action.data;
    }
  }

  deleteAnnotation(id) {
    const { map } = this.options;
    map.delete(id);
  }

  termsAt(position, to) {
    return this.decorations.find(position, to || position).map(decoration => {
      return new AnnotationDecoration(decoration);
    });
  }

  allAnnotations() {
    const { map } = this.options;
    return Array.from(map.entries(), ([_, value]) => {
      return value;
    });
  }

  createDecorations(state) {
    const { map, styles } = this.options;

    const decorations = [];
    // only terms, not connectives, are rendered
    const termList = Array.from(map, ([key, value]) => {
      // eslint-disable-next-line prefer-object-spread
      return Object.assign(Object.assign({}, value), { id: key });
    }).filter(value => {
      return 'from' in value && 'to' in value;
    });
    const annotationRendering = createAnnotationRendering(termList);
    annotationRendering.forEach(annotation => {
      const { from, to } = annotation;
      console.log(this.options);
      // eslint-disable-next-line
      console.log(`[${this.options.instance}] Decoration.inline()`, from, to, {
        id: annotation.id,
        data: annotation,
      });

      if (from === to) {
        console.warn(
          `[${this.options.instance}] corrupt decoration `,
          annotation.from,
          from,
          annotation.to,
          to,
        );
      }
      let baseClasses; // = "border-black p-0.5 font-semibold inline relative ";
      switch (annotation.rendering) {
        case 'fragment-left':
          baseClasses = styles.leftFragment;
          break;
        case 'fragment-middle':
          baseClasses = styles.middleFragment;
          break;
        case 'fragment-right':
          baseClasses = styles.rightFragment;
          break;
        case 'normal':
          baseClasses = styles.normal;
          break;
        default:
          break;
      }
      // set custom background color
      let customStyle;
      if (annotation.backgroundColor) {
        customStyle = {
          style: `background-color: ${annotation.backgroundColor};`,
          class: baseClasses,
        };
      }
      decorations.push(
        Decoration.inline(
          from,
          to,
          customStyle || {
            class: baseClasses,
            style: 'background-color: orange;',
          },
          {
            id: annotation.id,
            data: annotation,
            inclusiveEnd: true,
          },
        ),
      );
    });
    this.decorations = DecorationSet.create(state.doc, decorations);
  }

  apply(transaction, state) {
    // Add/Remove annotations
    const action = transaction.getMeta(AnnotationPluginKey);
    if (action && action.type) {
      console.log(`[${this.options.instance}] action: ${action.type}`);
      if (action.type === 'addAnnotation') {
        this.addAnnotation(action);
      }
      if (action.type === 'updateAnnotation') {
        this.updateAnnotation(action);
      }
      if (action.type === 'deleteAnnotation') {
        this.deleteAnnotation(action.id);
      }
      this.createDecorations(state);
      this.options.onAnnotationListChange(this.allAnnotations());
      return this;
    }
    // manually map annotation positions
    this.options.map.forEach((annotation, _) => {
      if ('from' in annotation && 'to' in annotation) {
        annotation.from = transaction.mapping.map(annotation.from);
        annotation.to = transaction.mapping.map(annotation.to);
      }
    });
    this.createDecorations(state);
    return this;
  }
}
