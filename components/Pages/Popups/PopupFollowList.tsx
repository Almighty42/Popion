// React
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
// Redux
import { RootState, actions } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { Button } from '@/components/Layout/Simple/Buttons';
import Input from '@/components/Layout/Simple/Input';
// Icons
import { FiCompass, FiSearch, FiUserPlus, FiUserX, FiX } from 'react-icons/fi';
// Hooks
import { useFollowUser } from '@/lib/hooks';
// Other
import { motion } from "framer-motion";
import Avatar from 'react-avatar';
import { animationOptions, popInVariant1 } from '@/lib/animations';
import { firestore, postToJSON } from '@/lib/firebase';
import { UserInfoProps } from '@/utils/interfaces';
import { useRouter } from 'next/router';

interface PopupFollowListProps {
  userId: string | undefined,
  userObject: UserInfoProps | undefined,
  setLoading?: any
}
interface ListItemProps {
  name: string,
  username: string,
  userId: string | undefined,
  userInfo: UserInfoProps,
  followersNum: number,
  followingNum: number,
  followState: boolean,
  isOwner: boolean,
  setLoading?: any
  loggedIn: boolean,
  blocked: boolean
}

const PopupFollowList = ({ userId, userObject, setLoading }: PopupFollowListProps) => {
  const dispatch = useDispatch()

  const [list, setList] = useState<Array<string>>([])

  const modalInfo = useSelector((state: RootState) => state.modal);
  const userInfo = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      if (modalInfo.type == 'following') {
        const listFollowing = (await firestore.collection(`users/${modalInfo.userId}/following`).get()).docs.map(postToJSON)
        const listPromise = listFollowing.map(async (item) => {
          const userObject = (await firestore.doc(`users/${item.userId}`).get()).data()
          const isOwner = userInfo.username == item.username
          //@ts-ignore
          const isBlocked = userInfo.bannedUsers.includes(item.userId)
          //@ts-ignore
          if (userInfo.following.includes(item.userId)) return {
            ...item,
            userId: item.userId,
            followersNum: userObject?.followersNum,
            followingNum: userInfo?.followingNum,
            followState: true,
            isOwner,
            blocked: isBlocked
          }
          else return {
            ...item,
            followState: false,
            isOwner, userId: item.userId,
            followersNum: userObject?.followersNum,
            followingNum: userInfo?.followingNum,
            blocked: isBlocked
          }
        })
        const listNew = await Promise.all(listPromise)
        setList(listNew)
      } else if (modalInfo.type == 'followers') {
        const listFollowers = (await firestore.collection(`users/${modalInfo.userId}/followers`).limit(5).get()).docs.map(postToJSON)
        const listPromise = listFollowers.map(async (item) => {
          const userObject = (await firestore.doc(`users/${item.userId}`).get()).data()
          const isOwner = userInfo.username == item.username
          //@ts-ignore
          const isBlocked = userObject.bannedUsers.includes(userId)
          //@ts-ignore
          if (userInfo.following.includes(item.userId)) return {
            ...item,
            userId: item.userId,
            followersNum: userObject?.followersNum,
            followingNum: userInfo?.followingNum,
            followState: true,
            isOwner,
            blocked: isBlocked
          }
          else return {
            ...item,
            followState: false,
            isOwner,
            userId: item.userId,
            followersNum: userObject?.followersNum,
            followingNum: userInfo?.followingNum,
            blocked: isBlocked
          }
        })
        const listNew = await Promise.all(listPromise)
        setList(listNew)
      }
    }
    fetchData()
  }, [])

  const returnItems = () => {
    return list.map((item: any) =>
      <ListItem
        name={item.name}
        username={item.username}
        userId={item.userId}
        userInfo={userInfo}
        followersNum={item.followersNum}
        followingNum={item.followingNum}
        followState={item.followState}
        isOwner={item.isOwner}
        setLoading={setLoading}
        loggedIn={userInfo.loggedIn}
        blocked={item.blocked}
      />
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={popInVariant1}
      transition={animationOptions}
      className="popupshare"
    >
      <div className="popupshare__header">
        <Input
          size='small'
          text='Input text here'
          type='text'
          border='colored'
          icon={<FiSearch size={24} />}
          iconSide='left' />
        <Button
          type='ghost'
          icon={<FiX size={16} />}
          size='small'
          text='Close'
          execute={() => { dispatch(actions.modalActions.turnOff()) }} />
      </div>
      <div className="popupshare__listbody">
        <ul className='popupshare__list' >
          {returnItems()}
        </ul>
      </div>
    </motion.div>
  );
}

const ListItem = ({ name, username, followersNum, followingNum, followState, userId, userInfo, isOwner, setLoading, loggedIn, blocked }: ListItemProps) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [toggle, setToggle] = useState(followState)
  const [useFollowState, setUseFollowState] = useState(followState)
  const [followersCount, setFollowersCount] = useState(followersNum)
  const [followingCount, setFollowingCount] = useState(followingNum)

  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)

  useEffect(() => {
    if (useFollowState) {
      setCheck1(false);
      setCheck2(true)
    } else {
      setCheck1(true);
      setCheck2(false)
    }
  }, [])

  return (
    <li className='popupshare__item popupshare__item-follow' >
      <Avatar size='32' round />
      <div className="popupshare__item__text">
        <p className='caption semibold' > {name} </p>
        <p className='caption captionBlue' > @{username} </p>
      </div>
      {loggedIn &&
        <>
          {!isOwner &&
            <>
              {blocked ?
                <>
                  <Button
                  type="ghost"
                  text="User blocked you"
                  icon={<FiUserPlus size={16} />}
                  size="small"
                  color='disabled'
                  />
                </> :
                <>
                  {!useFollowState ?
                    <Button
                      type="ghost"
                      text="Follow"
                      icon={<FiUserPlus size={16} />}
                      size="small"
                      execute={() => {
                        useFollowUser({
                          add: true,
                          userInfo,
                          dispatch,
                          userId,
                          setToggle,
                          followersNum: followersCount,
                          followingNum: followingCount,
                          targetName: name,
                          targetUsername: username,
                          setFollowersCount,
                          setFollowingCount
                        });
                        setUseFollowState(true)
                      }}
                      animation /> :
                    <Button
                      type="primary"
                      text="Unfollow"
                      icon={<FiUserX size={16} />}
                      size="small"
                      execute={() => {
                        useFollowUser({
                          add: false,
                          userInfo,
                          dispatch,
                          userId,
                          setToggle,
                          followersNum: followersCount,
                          followingNum: followingCount,
                          targetName: name,
                          targetUsername: username,
                          setFollowersCount,
                          setFollowingCount
                        });
                        setUseFollowState(false)
                      }}
                      animation />
                  }
                </>
              }
            </>
          }
        </>
      }
      <Button
        type='ghost'
        animation
        icon={<FiCompass size={16} />}
        size='small'
        text='Open profile'
        execute={async () => { 
        //@ts-ignore
        setLoading() 
        await router.push(`/users/${username}`) 
        window.location.reload() 
      }}
      />
    </li>
  )
}

export default PopupFollowList;