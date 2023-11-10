import React, { useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Image from "next/image";
import UploaderIcon from "@/images/dp-generator/bytesize_upload.png";
import styles from "./styles.module.scss";

interface CropImageProps {
  onCroppedImage: (croppedImage: string) => void;
  croppedImage: string | null;
}

const CropImage: React.FC<CropImageProps> = ({ onCroppedImage, croppedImage }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [hideCropper, setHideCropper] = useState<boolean>(false);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // setSrc(reader.result as string);
        setImage(reader.result as string);
        // setCroppedImageUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current?.cropper;
      const resultImage = cropper.getCroppedCanvas().toDataURL();
      onCroppedImage(resultImage as string);
    }
  };

  const useCroppedImage = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current?.cropper;
      if (typeof cropperRef.current?.cropper !== "undefined") {
        const resultImage = cropper.getCroppedCanvas().toDataURL();
        onCroppedImage(resultImage as string);
      }
    }

    setHideCropper(!hideCropper);
  };

  return (
    <div>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
      />
      {image && !hideCropper && (
        <>
          <Cropper
            ref={cropperRef}
            src={image}
            className={styles.cropper_container}
            aspectRatio={1} // Set aspectRatio to 1 for a square crop
            guides={true}
            crop={onCrop}
            responsive={true}
            checkOrientation={false}
          />

          <button type='button' className={styles.save_btn} onClick={useCroppedImage}>
            Save cropped image
          </button>
        </>
      )}

      <div onClick={handleClick} className='dp_gen_page__customize_form_group_uploader'>
        <div className='dp_gen_page__customize_form_group_uploader_content'>
          {!croppedImage ? (
            <>
              <Image src={UploaderIcon} alt='icon' width={50} height={50} />
              <div className='dp_gen_page__customize_form_group_uploader_content_text'>
                Drag and drop to upload or <span>browse</span>
              </div>
            </>
          ) : (
            <div className='dp_gen_page__customize_form_group_uploader_content_photo'>
              <Image src={croppedImage as string} width={100} height={100} alt='photo' />
              <div className='dp_gen_page__customize_form_group_uploader_content_photo_change'>
                Change
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropImage;
