// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from '@/redux/store';
// Components
import { Button } from '@/components/Layout/Simple/Buttons';
// Icons
import { FiLogIn, FiUser } from 'react-icons/fi';
// Other
import Avatar from 'react-avatar';

// TODO ---> Connect component to firestore and implement functionality
// TODO ---> Cleanup code

const HomeProfileBlock = ({ loggedIn }: { loggedIn: boolean }) => {
    const dispatch = useDispatch()

    const userInfo = useSelector((state: RootState) => state.user)

    return loggedIn ? (
        <div className="profileblock profileblock-loggedin" >
            <div className="profileblock__details">
                <Avatar size='96' round />
                <div className="info">
                    <h4 className='semibold' > {userInfo.name} </h4>
                    <p className='p1' > @{userInfo.username} </p>
                </div>
                <p className='p1' > {userInfo.description} </p>
            </div>
            <div className="profileblock__follow">
                <div>
                    <p className='p3' > {userInfo.followingNum} </p>
                    <p className='p1' > Following </p>
                </div>
                <div>
                    <p className='p3' > {userInfo.followersNum} </p>
                    <p className='p1' > Followers </p>
                </div>
            </div>
            <button className='profileblock__button' >
                <p className='p2 semibold' > My Profile </p>
            </button>
        </div>
    ) : (
        <div className="profileblock profileblock-loggedout ">
            <h4 className='semibold' > New to <span>Pop</span>ion? </h4>
            <h5 className='semibold' > Register now to get your own personalized feed!  </h5>
            <div className="profileblock__actions">
                <Button 
                type='primary' 
                icon={<FiUser size={16} />} 
                text='Register' 
                size='small' 
                execute={() => { dispatch(actions.modalActions.turnOn('register')) }} 
                animation />
                <Button 
                type='primary' 
                icon={<FiLogIn size={16} />} 
                text='Login' 
                size='small' 
                execute={() => { dispatch(actions.modalActions.turnOn('login')) }} 
                animation />
            </div>
        </div>
    )
}

export default HomeProfileBlock;