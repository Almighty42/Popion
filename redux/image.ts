import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    imageURL: '',
    newImageURL: '',
    imageOn: false
  },
  reducers: {
    uploadImage : (state, action) => {
        return {
          imageURL: action.payload,
          newImageURL: '',
          imageOn: false
        }
    },
    cropImage: (state, action) => {
      return {
        imageURL: '',
        newImageURL: action.payload,
        imageOn: true
      }
    },
    unCheck: (state) => {
      return {
        imageURL: '',
        newImageURL: '',
        imageOn: false
      }
    },
    check: (state) => {
      return {
        imageURL: '',
        newImageURL: '',
        imageOn: true
      }
    }
  },
});

export const imageActions = {
    uploadImage: imageSlice.actions.uploadImage,
    cropImage: imageSlice.actions.cropImage,
    unCheck: imageSlice.actions.unCheck,
    check: imageSlice.actions.check,
  };

export default imageSlice.reducer;