// React
import { ReactElement, useEffect, useState } from "react";
// Components
import { HomeOnlineBlock, HomeProfileBlock, HomeTagsBlock } from "@/components/Pages/Home";
import { ModalBlock, Navbar } from "@/components/Layout/Complex";
// Redux
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
// Other
import { useMediaQuery } from "react-responsive";
import ReactLoading from 'react-loading';

interface LayoutProps {
    children: any;
}
type PageWithNestedLayoutProps = {
    children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {

    const isMinW = useMediaQuery({ query: '(max-width: 1151px)' })
    const isMinH = useMediaQuery({ query: '(max-height: 599px)' })
    const isMin = isMinW || isMinH ? true : false

    const [checkMin, setCheckMin] = useState(isMin)

    const userInfo = useSelector((state: RootState) => state.user)
    const modalInfo = useSelector((state: RootState) => state.modal)

    useEffect(() => {
        setCheckMin(isMin)
    }, [isMin])

    return (
        <>
            <ModalBlock isMin={isMin} modalInfo={modalInfo} />
            <div className="frame" >
                <Navbar loggedIn={userInfo.loggedIn} />
                {!modalInfo.loading ?
                    <div className="frame__body">
                        <>
                            {children}
                        </>
                    </div> :
                    <div className='frame__loading'>
                        <ReactLoading type='spin' color='blue' height={'5%'} width={'5%'} />
                    </div>
                }
            </div>
        </>
    );
}

const NestedLayout = ({ children }: LayoutProps) => {

    const userInfo = useSelector((state: RootState) => state.user)

    return (
        <>
            <div className="frame__side">
                <HomeProfileBlock loggedIn={userInfo.loggedIn} />
                {userInfo.loggedIn && <HomeOnlineBlock />}
            </div>
            <div className="frame__center">
                {children}
            </div>
            <div className="frame__side">
                <HomeTagsBlock loggedIn={userInfo.loggedIn} subscribedTags={userInfo.subscribedTags} />
            </div>
        </>
    );
}

const withNestedLayout = <P extends object>(Component: React.ComponentType<P>) => {
    const PageWithNestedLayout: React.FC<P & PageWithNestedLayoutProps> = (props) => (
        <NestedLayout>
            <Component {...props} />
        </NestedLayout>
    );
    return PageWithNestedLayout;
};

export { Layout, NestedLayout, withNestedLayout };