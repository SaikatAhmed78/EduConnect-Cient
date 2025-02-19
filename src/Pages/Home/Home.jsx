import React from 'react';
import Banner from '../../Components/Home/Banner';
import SessionCard from '../../Components/Card/SessionCard';
import TutorStaticks from '../../Components/Home/TutorStaticks';
import FeaturesSection from '../../Update/FeaturesSection';
import ReviewsSection from '../../Update/ReviewsSection';
import FAQSection from '../../Update/FAQSection';
import StudyTips from '../../Update/StudyTips';
import NewsletterSubscription from '../../Update/NewsletterSubscription';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='w-11/12 mx-auto pt-5'>
                <SessionCard></SessionCard>
                <TutorStaticks></TutorStaticks>
                <FeaturesSection></FeaturesSection>
                <ReviewsSection></ReviewsSection>
                <StudyTips></StudyTips>
                <FAQSection></FAQSection>
                <NewsletterSubscription></NewsletterSubscription>

            </div>
        </div>

    );
};

export default Home;



