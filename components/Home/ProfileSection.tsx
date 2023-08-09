import '@/styles/Home.scss'
import Avatar from 'react-avatar';
import {Button} from '../Buttons';
import { FiLogIn, FiUser } from 'react-icons/fi';

interface ProfileSectionProps {
    loggedIn: boolean,
    setShowModal?: any,
    setAuth? : any
}

const ProfileSection = ({ loggedIn, setShowModal,  setAuth }: ProfileSectionProps) => {
    return loggedIn ? (
        <div className={'profileSection loggedIn'} >
            <div className="details">
                <Avatar size='96' round />
                <div className="info">
                    <h4 className='semibold' > Name </h4>
                    <p className='p1' > @username </p>
                </div>
                <p className='p1' > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </div>
            <div className="follow">
                <div>
                    <p className='p3' > 1,103 </p>
                    <p className='p1' > Following </p>
                </div>
                <div>
                    <p className='p3' > 1,103 </p>
                    <p className='p1' > Followers </p>
                </div>
            </div>
            <button>
                <p className='p2 semibold' > My Profile </p>
            </button>
        </div>
    ) : (
        <div className="profileSection loggedOut ">
            <h4 className='semibold' > New to <span>Pop</span>ion? </h4>
            <h5 className='semibold' > Register now to get your own personalized feed!  </h5>
            <div className="auth">
                <Button type='primary' icon={<FiUser size={16} />} text='Register' size='small' execute={() => { setShowModal(true);setAuth(true) }} />
                <Button type='primary' icon={<FiLogIn size={16} />} text='Login' size='small' execute={() => { setShowModal(true);setAuth(false) }} />
            </div>
        </div>
    )
}

export default ProfileSection;