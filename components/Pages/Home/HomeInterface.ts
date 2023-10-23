import { UserInfoProps } from "@/utils/interfaces"
import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { Action } from "redux"

interface HomeAddPostProps {
    userInfo: UserInfoProps,
}
interface createPostInterface {
    editorState: any
    setEditorState: Dispatch<SetStateAction<any>>
    userInfo: UserInfoProps
    imageInfo: {
        imageURL: string;
        newImageURL: string;
        imageOn: boolean;
    }
    dispatch: Dispatch<Action>,
}
interface handleAddImageInterface {
    imageInfo: {
        imageURL: string;
        newImageURL: string;
        imageOn: boolean;
    },
    dispatch: Dispatch<Action>,
    setCheck: Dispatch<SetStateAction<boolean>>,
    handleFocusBack(): void,
    fileInput: MutableRefObject<null>
}
interface handleFileUploadInterface {
    e: any
    setCheck: Dispatch<SetStateAction<boolean>>
    handleFocusBack(): void
    setCompare: Dispatch<SetStateAction<any>>
    dispatch: Dispatch<Action>,
}

export type {
    HomeAddPostProps,
    createPostInterface,
    handleAddImageInterface,
    handleFileUploadInterface
}