// Style
import '@/styles/Home.scss'
// Other
import Avatar from 'react-avatar';
// Components
import { Button } from '../../base/Buttons';
// Icons
import { FiEye } from 'react-icons/fi';

const OnlineSection = ({ loggedIn }: { loggedIn : boolean }) => {
    return loggedIn ? (
        <div className={'onlineSection loggedIn'} >
            <h5 className='semibold'> Who's online now </h5>
            <h6 className='semibold'> Who's online now </h6>
            <ul>
                <Item />
                <hr />
                <Item />
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

const Item = () => {
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