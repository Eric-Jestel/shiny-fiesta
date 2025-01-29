// src/components/FileItem.js
import React from 'react';
import PropTypes from 'prop-types';

function FileItem({ file }) {
  return (
    <div className="file-item">
      <img src={file.url} alt={file.name} className="file-image" />
      <p>{file.name}</p>
    </div>
  );
}

FileItem.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default FileItem;