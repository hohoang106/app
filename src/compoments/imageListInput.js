import React from 'react';
import SubmitPicture from './submitPicture';

function imageListInput({ files = [], onRemoveImage, onAddImage }) {
    return (
        <div style={{ flexDirection: "row" }}>
            {files.map((uri, i) => <SubmitPicture
                key={i} imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
            />)}
            <SubmitPicture onChangeImage={uri => onAddImage(uri)} />
        </div>
    );
}

export default imageListInput;