interface ButtonProps {
    type: 'primary' | 'ghost';
    subType?: 'submit' | 'button',
    icon?: JSX.Element,
    text?: string;
    size?: 'small' | 'regular' | 'large';
    execute?(): void;
    animation?: boolean;
    color?: 'standard' | 'green' | 'like' | 'disabled'
}
interface BasicButtonProps {
    execute: any
}
interface ExtendedButtonProps extends BasicButtonProps {
    type: 'ghost' | 'primary' | string
}
interface LikeButtonProps extends ExtendedButtonProps {
    likeCount: number,
}
interface CommentButtonProps {
    commentCount: number
}

interface InputProps {
    type: 'submit' | 'text' | 'email' | 'password',
    text: string;
    size: 'small' | 'regular' | 'large';
    border?: 'colored' | 'uncolored'
    icon?: JSX.Element;
    iconSide?: 'left' | 'right',
    value?: string,
    onChange?: (e: any) => void,
    required?: boolean,
    textarea?: boolean
}

export type { BasicButtonProps, ButtonProps, CommentButtonProps, ExtendedButtonProps, InputProps, LikeButtonProps }