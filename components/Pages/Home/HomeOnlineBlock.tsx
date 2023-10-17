// Components
import { Button } from '../../Layout/Simple/Buttons';
// Icons
import { FiEye } from 'react-icons/fi';
// Other
import Avatar from 'react-avatar';

// TODO ---> Connect component to firestore and implement functionality

const HomeOnlineBlock = () => {
    return  (
        <div className="onlineblock" >
            <h5 className='semibold'> Who's online now </h5>
            <h6 className='semibold'> Who's online now </h6>
            <ul className='onlineblock__list' >
                <Item />
                <hr />
                <Item />
            </ul>
            <button>
                <p className='onlineblock__showmore p2 semibold' > Show more </p>
            </button>
        </div>
    )
}

const Item = () => {
    return (
        <li className='onlineblock__item' >
            <div className="onlineblock__item__left">
                <Avatar size='32' round />
                <div className="onlineblock__item__text">
                    <p className='caption semibold' > Kristin Watson </p>
                    <p className='caption' > @username </p>
                </div>
            </div>
            <div className="onlineblock__item__right">
                <Button 
                type='ghost' 
                icon={<FiEye size={18} />} 
                text='Online' 
                size='small' />
            </div>
        </li>
    )
}

export default HomeOnlineBlock;