import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import "./ImagePond.css";

registerPlugin(
  FilePondPluginImageResize,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

const ImagePond = (props) => {
  const [files, setFiles] = useState([]);
  // console.log(files);
  return (
    <FilePond
      name={props.name}
      files={files}
      // maxFiles={3}
      // server="/api"
      stylePanelAspectRatio={300 / 200}
      imageResizeTargetWidth={200}
      imageResizeTargetHeight={300}
      allowReorder={true}
      allowMultiple={true}
      dropOnPage={true}
      onupdatefiles={setFiles}
      allowImageValidateSize={true}
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  );
};

export default ImagePond;
