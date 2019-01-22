import React, { PureComponent, Fragment } from 'react';
import cx from 'classnames';
import autoBind from 'auto-bind';
import ImageAsync from 'react-image-async';
import { file } from '../../types';
import styles from './styles.scss';
import Button from '/src/cms/elements/button';
import { Image } from 'styled-icons/material/Image';
import Toaster from '/src/cms/elements/toaster';
import prettyBytes from 'pretty-bytes';
import Puff from '/src/cms/elements/svg-loaders/puff.svg';
import noop from 'lodash/noop';
import ValidationIndicator from '../validation-indicator/validation-indicator';

class UploadFile extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.fileInput = React.createRef();
    this.state = {
      hover: false,
      preview: props.value,
      fileToBig: false,
      fileSize: null,
      showValidation: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (value !== prevProps.value && typeof value === 'string') {
      this.setState({ preview: value });
    }
  }

  showValidation() {
    const { optional } = this.props;
    if (optional) return;
    this.setState({ showValidation: true });
  }

  handleChange(file) {
    const { onChange } = this.props;
    if (file) {
      const fileToBig = file.size > 2000000;
      if (fileToBig) {
        this.setState({ fileToBig: true, fileSize: prettyBytes(file.size) });
        return;
      }
      onChange(file);
      // const fileProps = {
      //   name: file.name,
      //   lastModified: file.lastModified,
      //   size: file.size,
      // };
      const preview = URL.createObjectURL(file);
      this.setState({ preview: preview });
      // const reader = new window.FileReader();
      // reader.readAsDataURL(file);
      // if (reader.result) {
      //   this.setState({ preview: reader.result });
      // } else {
      //   reader.onloadend = () => {
      //     this.setState({ preview: reader.result });
      //   };
      // }
    }
    this.showValidation();
  }

  handleClick(e) {
    e.stopPropagation();
    this.fileInput.current.click();
    this.clearError();
    this.showValidation();
  }

  clearError() {
    this.setState({ fileToBig: false, fileSize: null });
  }

  resolveStructureByType() {
    const { type, placeholder } = this.props;
    const { preview } = this.state;
    if (type === 'image') {
      return preview ? (
        <ImageAsync src={[preview]} >
          {({ loaded, error }) => (
            <Fragment >
              <div style={{ backgroundImage: `url(${loaded ? preview : Puff})` }} className={styles.image} />
            </Fragment >
          )}
        </ImageAsync >
      ) : (
        <Fragment >
          <Image />
          <div >Select files from your computer</div >
          <div className={styles.placeholder} >{placeholder}</div >
        </Fragment >
      );
    }
    return preview ? (
      <iframe src={preview} className={styles.pdfPreview} frameBorder="0" scrolling="no" />
    ) : (
      <Fragment >
        <Image />
        <div >Select files from your computer</div >
        <div className={styles.placeholder} >{placeholder}</div >
      </Fragment >
    );
  }

  render() {
    const { preview, fileToBig, fileSize, showValidation, validateWith } = this.state;
    const { onValidation, type } = this.props;
    return (
      <div className={styles.imageUpload} >
        <div className={cx(styles.imagePreviewContainer, showValidation && styles.removeRightBorder)} >
          <Button
            onClick={this.handleClick}
            className={styles.button}
          >
            {this.resolveStructureByType()}
            <input
              ref={this.fileInput}
              type="file"
              onChange={e => {
                const firstFile = e.target.files[0];
                this.handleChange(firstFile);
              }}
              accept={type === 'image' ? 'image/*' : 'application/pdf'}
              className={styles.fileInput}
            />
            <Toaster show={Boolean(fileToBig)} onClick={this.clearError} >
              <span className={styles.spaceRight} >FIle is to big.</span >
              <span className={styles.spaceRight} >must be smaller than <h3 >2Mb</h3 >.</span >
              <span >(size is {fileSize})</span >
            </Toaster >
          </Button >
        </div >
        <ValidationIndicator
          show={showValidation}
          min={1}
          onValidation={onValidation}
          value={preview}
          validateWith={validateWith}
        />
      </div >
    );
  }
}

UploadFile.propTypes = file;

UploadFile.defaultProps = {
  onValidation: noop,
};

export default UploadFile;
