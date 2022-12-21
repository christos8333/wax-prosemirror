/* eslint-disable no-underscore-dangle */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { injectable, inject } from 'inversify';
import Button from '../../components/Button';

@injectable()
class Tools {
  title = 'title';
  _isDisplayed = true;
  _isHiddenInToolGroup = false;
  config = {};
  pmplugins = {};
  name = 'name';
  constructor(@inject('Config') config, @inject('PmPlugins') pmplugins) {
    this.config = config;
    this.pmplugins = pmplugins;
  }

  static get id() {
    return this.name;
  }

  get run() {
    return true;
  }

  get enable() {
    return () => true;
  }

  select() {
    return () => true;
  }

  get active() {
    return () => false;
  }

  toJSON() {
    return {
      title: this.title,
      icon: this.icon,
      label: this.label,
      active: this.active,
      run: this.run,
      enable: this.enable,
      select: this.select,
      id: this.id,
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return this._isDisplayed ? (
      <Button item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }

  displayTool() {
    this._isDisplayed = true;
  }

  hideTool() {
    this._isDisplayed = false;
  }

  isDisplayed() {
    return this._isDisplayed;
  }

  displayInToolGroup() {
    this._isHiddenInToolGroup = false;
  }

  hideInToolGroup() {
    this._isHiddenInToolGroup = true;
  }

  isIntoMoreSection() {
    return this._isHiddenInToolGroup;
  }
}
export default Tools;
