import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {
  Input,
  InputConstants as Constants,
  withInput,
  omit,
} from '@axa-fr/react-toolkit-form-core';
import { InputManager } from '@axa-fr/react-toolkit-core';
import Button from '@axa-fr/react-toolkit-button';

const omitProperties = omit(['classModifier', 'className', 'onChange', 'isVisible', 'inputRef']);

class File extends Component {
  constructor(props) {
    super(props);
    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onOpenClick() {
    this.dropzone.open();
  }

  render() {
    const {
      componentClassName,
      id,
      name,
      disabled,
      onDrop,
      multiple,
      maxSize,
      minSize,
      accept,
      readOnly,
      placeholder,
      label,
      icon,
      ...otherProps
    } = this.props;

    return (
      <div className={componentClassName}>
        <Dropzone
          onDrop={onDrop}
          id={id}
          name={name}
          multiple={multiple}
          maxSize={maxSize}
          minSize={minSize}
          accept={accept}
          className="drop-box hidden-mobile"
          ref={d => {
            this.dropzone = d;
          }}
          readOnly={readOnly}
          disabled={disabled}
          {...omitProperties(otherProps)}>
          <div>{placeholder} </div>
        </Dropzone>
        <Button
          type="button"
          className="af-btn"
          classModifier="file hasiconLeft"
          onClick={this.onOpenClick}
          disabled={disabled}>
          <i className={`glyphicon glyphicon-${icon}`} /> {label}
        </Button>
      </div>
    );
  }
}

const propTypes = {
  ...Constants.propTypes,
  values: PropTypes.array,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  className: PropTypes.string,
  classModifier: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
};
const defaultClassName = 'af-form__file-input';
const defaultProps = {
  ...Constants.defaultProps,
  values: null,
  placeholder: 'Glissez/déposez vos fichiers',
  accept: '',
  multiple: true,
  maxSize: 20000000, // 20 mo
  minSize: 0,
  className: defaultClassName,
  classModifier: null,
  label: 'Parcourir',
  icon: 'open',
};

const handlers = {
  onDrop: ({ onChange, name, id }) => (acceptedFiles, rejectedFiles) => {
    const values = acceptedFiles.map(file => ({
      id: InputManager.createId(),
      file,
    }));
    const errors = rejectedFiles.map(error => ({
      id: InputManager.createId(),
      file: error,
    }));
    onChange({
      values,
      errors,
      name,
      id,
    });
  },
};

const EnhancedComponent = withInput(
  defaultClassName,
  propTypes,
  defaultProps,
  handlers
)(File);

EnhancedComponent.Clone = Input.Clone;
EnhancedComponent.displayName = File.name;

export default EnhancedComponent;
