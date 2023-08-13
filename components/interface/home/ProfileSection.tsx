// Style
import '@/styles/Home.scss'
// Other
import Avatar from 'react-avatar';
// Components
import { Button } from '@/components/base/Buttons';
// Icons
import { FiLogIn, FiUser } from 'react-icons/fi';
// Redux
import { useDispatch } from 'react-redux';
import { actions } from '@/redux/store';

const ProfileSection = ({ loggedIn }: { loggedIn: boolean }) => {
    // Dispatch
    const dispatch = useDispatch()

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
                <Button type='primary' icon={<FiUser size={16} />} text='Register' size='small' execute={() => { dispatch(actions.modalActions.turnOn('register')) }} animation />
                <Button type='primary' icon={<FiLogIn size={16} />} text='Login' size='small' execute={() => { dispatch(actions.modalActions.turnOn('login')) }} animation />
            </div>
        </div>
    )
}

export default ProfileSection;