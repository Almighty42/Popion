// React
import React from 'react'
// Components
import Navbar from 'src/components/layout/Navbar/Navbar'
import HomeSection from '../HomeSection/HomeSection'

const Home = () => {
    return (
        <div style={{ overflowX:'hidden' }} >
            <Navbar />
            <HomeSection />
        </div>
    )
}

export default Home