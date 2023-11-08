import React from "react";
// import React, { useState, useEffect, ChangeEvent } from "react";
// import Image from "next/image";
// import UploaderIcon from "@/images/dp-generator/bytesize_upload.png";
// import Cropper from "react-easy-crop";
// // import { Area } from "react-easy-crop/types";

interface CropImageProps {
  onCroppedImage?: (croppedImage: string) => void; // Callback to return the cropped image
}

const CropImage: React.FC<CropImageProps> = () => {
  //   const inputRef = React.useRef<HTMLInputElement | null>(null);
  //   const [src, setSrc] = useState<string | null>(null);
  // //   const [crop, setCrop] = useState<Area>({ x: 0, y: 0 });
  //   const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

  //   useEffect(() => {
  //     setCroppedImageUrl(null); // Clear the previous cropped image when a new image is loaded
  //   }, [src]);

  //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files && e.target.files[0]) {
  //       const file = e.target.files[0];
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         console.log(reader.result);
  //         setSrc(reader.result as string);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const handleClick = () => {
  //     if (inputRef.current) {
  //       inputRef.current.click();
  //     }
  //   };

  //   const onCropChange = (area: Area) => {
  //     setCrop(area);
  //   };

  //   const handleSaveCroppedImage = async () => {
  //     if (src) {
  //       const img = new Image() as HTMLImageElement; // Cast it to HTMLImageElement
  //       img.src = src;
  //       img.onload = () => {
  //         const canvas = document.createElement("canvas");
  //         const scaleX = img.naturalWidth / img.width;
  //         const scaleY = img.naturalHeight / img.height;

  //         canvas.width = 50; // Set the desired width of the cropped image
  //         canvas.height = 50; // Set the desired height of the cropped image

  //         const ctx = canvas.getContext("2d");

  //         if (ctx) {
  //           ctx.drawImage(
  //             img,
  //             crop.x * scaleX,
  //             crop.y * scaleY,
  //             crop.width * scaleX,
  //             crop.height * scaleY,
  //             0,
  //             0,
  //             100, // Set the desired width of the cropped image
  //             100, // Set the desired height of the cropped image
  //           );

  //           const croppedImage = canvas.toDataURL("image/jpeg"); // Change format if needed
  //           setCroppedImageUrl(croppedImage);
  //           onCroppedImage(croppedImage);
  //         }
  //       };
  //     }
  //   };

  return (
    <div style={{ position: "relative" }}>
      {/* <input
        style={{ display: "none" }}
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
      />

      {src && (
        <div
          style={{
            position: "absolute",
            zIndex: 50,
            width: "100%",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Cropper
            image={src}
            crop={crop}
            aspect={1}
            onCropChange={onCropChange}
            showGrid={false}
          />

          <div>
            <img src={croppedImageUrl as string} alt='Cropped' />
            <button type='button' onClick={handleSaveCroppedImage}>
              Save Cropped Image
            </button>
          </div>
        </div>
      )}

      <div onClick={handleClick} className='dp_gen_page__customize_form_group_uploader'>
        <div className='dp_gen_page__customize_form_group_uploader_content'>
          {!croppedImageUrl ? (
            <>
              <Image src={UploaderIcon} alt='icon' width={50} height={50} />
              <div className='dp_gen_page__customize_form_group_uploader_content_text'>
                Drag and drop to upload or <span>browse</span>
              </div>
            </>
          ) : (
            <div className='dp_gen_page__customize_form_group_uploader_content_photo'>
              <Image src={croppedImageUrl} width={100} height={100} alt='photo' />
              <div className='dp_gen_page__customize_form_group_uploader_content_photo_change'>
                Change
              </div>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default CropImage;
