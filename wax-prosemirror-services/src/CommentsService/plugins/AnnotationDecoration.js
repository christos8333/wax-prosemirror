export default class AnnotationDecoration {
  constructor(decoration) {
    this.decoration = decoration;
  }

  get displayName() {
    return this.decoration.type.spec.data.displayName;
  }

  get tag() {
    return this.decoration.type.spec.data.tag;
  }

  get id() {
    return this.decoration.type.spec.id;
  }

  get from() {
    return this.decoration.from;
  }

  get to() {
    return this.decoration.to;
  }

  get selectedText() {
    return this.decoration.type.spec.data.selectedText;
  }

  get data() {
    return this.decoration.type.spec.data;
  }

  get HTMLAttributes() {
    return this.decoration.type.attrs;
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      data: this.data,
      from: this.from,
      to: this.to,
      HTMLAttributes: this.HTMLAttributes,
    });
  }
}
