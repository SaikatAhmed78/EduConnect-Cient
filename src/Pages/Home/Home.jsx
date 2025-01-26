import React from 'react';
import Banner from '../../Components/Home/Banner';
import SessionCard from '../../Components/Card/SessionCard';
import TutorStaticks from '../../Components/Home/TutorStaticks';

const Home = () => {
    return (
        <div>


            <Banner></Banner>

            <div className='w-11/12 mx-auto pt-5'>
                <SessionCard></SessionCard>
                <TutorStaticks></TutorStaticks>
            </div>

        </div>
    );
};

export default Home;