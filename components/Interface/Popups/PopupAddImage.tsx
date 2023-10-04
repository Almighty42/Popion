// React
import React, { useRef } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, actions } from "@/redux/store";
// Components
import { Button } from "@/components/Layout/Simple/Buttons";
// Icons
import { FiCheck } from "react-icons/fi";
// Other
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const PopupAddImage = () => {
    const dispatch = useDispatch()

    const imageInfo = useSelector((state: RootState) => state.image)

    const cropperRef = useRef<ReactCropperElement>(null);
    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        dispatch(actions.imageActions.cropImage(cropper?.getCroppedCanvas().toDataURL()))        
    };

    // TODO Sometimes when clicking add image it doesn't trigger modal

    return (
        <div className="cropperbody cropperbody-section" >
            <Cropper
                className="cropperbody__cropper"
                initialAspectRatio={1}
                preview=".img-preview"
                src={imageInfo.imageURL}
                viewMode={1}
                minCropBoxHeight={100}
                minCropBoxWidth={100}
                background={false}
                aspectRatio={16 / 9}
                ref={cropperRef}
            />
            <div className="cropperbody__actions">
                <Button 
                type="primary" 
                animation 
                icon={<FiCheck 
                size={16} />} 
                size="small" 
                text="Confirm crop" 
                execute={() => { onCrop();dispatch(actions.modalActions.turnOff());  }} />
            </div>
        </div>
    );
}

export default PopupAddImage;