import '@/styles/Home.scss'
import Avatar from 'react-avatar';
import { Button } from '../Buttons';
import { FiEye, FiLogIn, FiUser } from 'react-icons/fi';
import { BiMessageRoundedError } from 'react-icons/bi'

interface OnlineSectionProps {
    loggedIn: boolean
}

const OnlineSection = ({ loggedIn }: OnlineSectionProps) => {
    return loggedIn ? (
        <div className={'onlineSection loggedIn'} >
            <h5 className='semibold'> Who's online now </h5>
            <ul>
                <Item notification={true} />
                <hr />
                <Item notification={false} />
                <hr />
                <Item notification={false} />
                <hr />
                <Item notification={false} />
            </ul>
            <button>
                <p className='p2 semibold' > Show more </p>
            </button>
        </div>
    ) : (
        <div className="onlineSection loggedOut ">
        </div>
    )
}

const Item = (notification: any) => {
    return (
        <li>
            <div className="left">
                <Avatar size='32' round />
                <div className="text">
                    <p className='caption semibold' > Kristin Watson </p>
                    <p className='caption' > @username </p>
                </div>
            </div>
            <div className="right">
                <Button type='ghost' icon={<FiEye size={18} />} text='Online' size='small' />
            </div>
        </li>
    )
}

export default OnlineSection;