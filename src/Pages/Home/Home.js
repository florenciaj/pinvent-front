import React from 'react';
import { RiProductHuntLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import HeroImg from '../../Assets/inv-img.png';
import { ShowOnLogin, ShowOnLogout } from '../../Component/Protect/HiddenLink';
import './Home.scss';

const Home = () => {
    return (
        <div className='home'>
            <nav className='container --flex-between'>
                <div className="logo">
                    <RiProductHuntLine size={35} />
                </div>

                <ul className="home-links">
                    <ShowOnLogout>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                    <li>
                        <button className="--btn --btn-primary">
                            <Link to='/login'>Login</Link>
                        </button>
                    </li>
                    </ShowOnLogout>
                    <ShowOnLogin>
                    <li>
                        <button className="--btn --btn-primary">
                            <Link to='/dashboard'>Dashboard</Link>
                        </button>
                    </li>
                    </ShowOnLogin>
                </ul>
            </nav>

            <section className="container hero">
                <div className="hero-text">
                    <h2>Inventory {"&"} Stock Management Solution</h2>
                    <p>
                        Inventory system to control and manage proucts in the warehouse in
                        real timeand integrated to make it easier to develop your business.
                    </p>
                    <div className="hero-buttons">
                        <button className="--btn --btn-secondary">
                            <Link to="/dashboard">Free Trial 1 Month</Link>
                        </button>
                    </div>
                    <div className="--flex-start">
                        <NumberText number="14K" text="Brand Owners" />
                        <NumberText number="23K" text="Active Users" />
                        <NumberText number="500+" text="Partners" />
                    </div>
                </div>

                <div className="hero-image">
                    <img src={HeroImg} alt="Inventory" />
                </div>
                <div className="hero-image"></div>
            </section>
        </div>
    )
}

const NumberText = ({ number, text }) => {
    return (
        <div className="--mr">
            <h3 className="--color-white">{number}</h3>
            <h3 className="--color-white">{text}</h3>
        </div>
    )
}

export default Home;