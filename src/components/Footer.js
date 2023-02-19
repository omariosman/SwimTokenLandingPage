import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import config from '../config/config';
import {Navbar,Container,Offcanvas,Nav,NavDropdown,Form,Button} from 'react-bootstrap';

const Footer = () => {

    return (
        <>
            <footer  className="footer tm-wrapper tm-container tm-grid-base" style={{ position: "fixed", bottom: 0, width: "100%", height: "25%"}}>
                <div className='container'>
                    <div  className="row pt-2 mb-0">
                        <div className="col-md-4 d-block d-md-none">
                            <div className="row mb-0">
                                <div className="col-md-12 text-center footer-logo">
                                    <img src="assets/img/logo.png" width="200px" />
                                    <h3>#spreadwisdom</h3>
                                    <p>The World Needs More Wise People.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="social-icon text-center pt-3">
                                <h2>SOCIAL</h2>
                                <ul className='pt-4'>
                                    <li><a target="_blank" href="https://t.me/+_RgpFKIL5pE0MWVl"><img src="images/telegram.png" /></a></li>
                                    <li><a target="_blank" href="https://twitter.com/sspreadwisdom?s=11&t=n-pBiFgUgtC-kdwR0PVHMA"><img src="images/twiiter.png" /></a></li>
                                    <li><a target="_blank" href="https://youtube.com/@swimspreadwisdom"><img src="images/youtube.png" /></a></li>
                                    <li><a target="_blank" href="https://www.facebook.com/SWIM-Spread-Wisdom-103661795946253/"><img src="images/facebook.png" /></a></li>
                                    <li><a target="_blank" href="https://instagram.com/swimspreadwisdom/"><img src="images/instagram.png" /></a></li>
                                    <li><a target="_blank" href="https://discord.gg/mgRbTdjw7H"><img src="images/discord.png" /></a></li>
                                </ul>
                                <br />
                                <h8>
                                Cryptocurrency may be unregulated in your jurisdiction. The value of cryptocurrencies may go down as well as up. Profits may be subject to capital gains or other taxes applicable in your jurisdiction.
                                </h8>
                                <br />
                            </div>
                        </div>
                        <div className="col-md-4 d-none d-md-block">
                            <div className="row">
                                <div className="col-md-12 text-center footer-logo">
                                    <img src="assets/img/logo.png" width="200px" />
                                    <h3>#spreadwisdom</h3>
                                    <p>The World Needs More Wise People.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='text-center pt-3'>
                                <h2>SUPPORT</h2>
                                <div className="footer-box">
                                    <ul>
                                        <li><a href="tos">Terms of Use</a></li>
                                        <li><a href="privacypolicy">Privacy Policy</a></li>
                                        <li><a href="cookies">Cookie policy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-0'>
                        <div className="col-md-12">
                            <div className="text-center">
                                <p className="Copyright">© 2023 By SWIM SPREAD WISDOM LTD.<a target="_blank" href="#"></a></p>
                            </div>
                        </div>  
                    </div>
               </div>
            </footer>
        </>

    )

}
export default Footer;