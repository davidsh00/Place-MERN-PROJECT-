import { useEffect, useRef, useState } from "react";

import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = ({ onInput, id, errorText, initialValue }) => {
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const filePickerRef = useRef();
  const changeHandler = (event) => {
    let pickedFile;
    let fileIsValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      fileIsValid = true;
      setIsValid(true);
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };
  const pickupHandler = () => {
    filePickerRef.current.click();
  };

  useEffect(() => {
    if (!file && !initialValue) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreviewUrl(fileReader.result);
    };
    if (initialValue && !file) {
      fetch(`http://localhost:5000/${initialValue}`)
        .then((res) => res.blob())
        .then((imageBlob) => {
          setFile(imageBlob);
          onInput(id, imageBlob, true);
          fileReader.readAsDataURL(imageBlob);
        });
    } else {
      fileReader.readAsDataURL(file);
    }
  }, [file, initialValue]);
  return (
    <div className="form-control">
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        multiple={false}
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        onChange={changeHandler}
      />
      <div className="image-upload">
        <div className="image-upload__perview">
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="preview" />
          ) : (
            <p>please pickup an image</p>
          )}
        </div>
        <Button type="button" onClick={pickupHandler}>
          Pick An Image
        </Button>
      </div>
      {!isValid && file && <p> {errorText}</p>}
    </div>
  );
};
export default ImageUpload;
