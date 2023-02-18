import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import WalletModal from "./WalletModal";
import Header from "./Header";
import Piechart from "./chart";
import ExchangeModal from "./ExchangeModal";
import config from "../config/config";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { useCountdown } from "./useCountdown";
import { padding } from "@mui/system";
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import MetaMaskConnector from "./Wallet/MetaMaskConnector";
import { Web3Button } from "@web3modal/react";
import DialogBox from "./DialogBox";
import { makeStyles } from '@material-ui/core/styles';

import { useAccount } from "wagmi";


const useStyles = makeStyles((theme) => ({
  loaderBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    textAlign: 'center',
    margin: 0,
  }

}));

const Presale = () => {
  const classes = useStyles();

  const [modalShow, setModalShow] = React.useState(false);
  const [connect, setConnect] = React.useState(false);
  const [getWeb3, setGetWeb3] = React.useState({});
  const [walletConnected, setWalletConnected] = useState(false);
  const [soldToken,setsoldToken] = useState([])
  const [accountAddr, setAccountAddr] = useState("");
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

  const {
    connector: activeConnector,
    isConnected,
    address,
    isConnecting,
    isDisconnected,
    isDisconnecting,
  } = useAccount();

  // Function to update parent state
  function updateAddr(addr) {
    setAccountAddr(addr);
  }

  const getSoldTokenAPI = async() => {
    const response = await axios({
        method: 'post',
        url: "https://futureittechsolutions.com:5001/api/getsoldtoken",
        data: {
        }
    })
    .then(function (response) {
      setsoldToken(response.data.data[0])
        })
        .catch(
            error => {
            }

        );
    ;
}

  const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
      <div className={isDanger ? "countdown danger" : "countdown"}>
        <p>{value}</p>
        <span>{type}</span>
      </div>
    );
  };
  const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="show-counter">
        <a
          href="https://tapasadhikary.com"
          target="_blank"
          rel="noopener noreferrer"
          className="countdown-link"
        >
          <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
          <p>:</p>
          <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
        </a>
      </div>
    );
  };

  const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
      return <ExpiredNotice />;
    } else {
      return (
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
    }
  };

  const ExpiredNotice = () => {
    return (
      <div className="expired-notice">
        <span>Expired!!!</span>
        <p>Please select a future date and time.</p>
      </div>
    );
  };

  const connectWallet = async () => {
    setConnect(true);
    setTimeout(() => {
      setConnect(false);
    }, 1000);
  };

  const getWalletConnected = (addr, web3) => {
    console.log(`get wallet connected web3modal`);
    setWalletConnected(true);
    setConnect(false);
    setGetWeb3(web3);
  };

  const Video = () => {
    return (
      <div className="container">
        <video autoPlay playsInline muted src={"assets/img/file.mp4"} />
      </div>
    );
  };

  const THREE_DAYS_IN_MS = 27 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  useEffect(() => {
    // if(localStorage.getItem('provider')){
    // connectWallet()
    // }
    getSoldTokenAPI()
  }, []);

  const connectClicked = () => {
    setDialogBoxOpen(true);
  }

  const cancelButton = () => {
    setDialogBoxOpen(false);
  }

  return (
    <>
      <section className="hero-section-pre">
        <Header connectNow={connect} setwalletConnected={getWalletConnected} />
        <div className="login-banner">
          <div
            className="container-fluid hero-section-pre ParallaxVideo"
            style={{ marginTop: "100px", padding: "0px" }}
          >
            <Video />
            <Row className="d-flex align-items-center">
              <Col md={5}>
                <div className="presale-box my-5 ">
                  <div className="mg-left-auto">
                    <div className="wisdom2">
                      <h3>
                        Powered by <span className="tommorow">1.3 Million</span>{" "}
                        wise-ards.
                      </h3>
                    </div>
                    <div className="wisdom2">
                      <h3>
                        <span className="tommorow">SWIM</span>-Spread Wisdom
                      </h3>
                      <h6>
                        Unlock the power of wisdom for a healthier Earth and
                        humanity with 'WISE ME,' the revolutionary NFT
                        Play-To-Earn game for toddlers and parents that combines
                        Gaming-Earning-Learning. #spreadwisdom.
                      </h6>
                      <div className="hero-button">
                        <Button className="btn btn-primary">
                          <a
                            target="_blank"
                            href="assets/whitepaper/SWIM_Whitepaper.pdf"
                          >
                            WHITEPAPER
                          </a>
                        </Button>
                        <Button className="btn btn-primary ms-3">
                          <a
                            target="_blank"
                            href="assets/audit/swim-audit-report.pdf"
                          >
                            SWIM AUDIT
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
                <div className="presale-box my-5 ">
                  <div className="mg-right-auto">
                    <div className="wisdom2">
                      <h3>
                        Buy Now Before The{" "}
                        <span className="tommorow">2x Price</span> Rise
                      </h3>
                      <p>
                        <img
                          alt="ETH"
                          style={{ maxHeight: "25px" }}
                          src="images/icons/usdt.png"
                        />{" "}
                        1 USDT = 37 SWIM
                      </p>
                      <div className="timer">
                        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
                      </div>
                      <div className={`loader-bar ${classes.loaderBar}`}>
                      <div className={`value ${classes.value}`}>
                          <h5>Amount Raised $
                          <NumericFormat className="NumericFormat"  value={parseFloat(soldToken.sold).toFixed(2)} allowLeadingZeros thousandSeparator="," />
                            
                             </h5>
                        </div>
                      </div>

                      {isConnected ? (
                        <>
                        <div className="wallet mt-3">     
                          <Button
                            className="w-100 btn btn-primary"
                            onClick={() => setModalShow(true)}
                          >
                            Buy
                          </Button>
                          <ExchangeModal
                            getWeb3={getWeb3}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                        </div>
                        <div className="mt-3">
                        <Web3Button />
                      </div>
                      </>
                      ) : (
                        <div className="mt-3">

                            <Button onClick={connectClicked}>Connect/Disconnect</Button>
                          {
                            <DialogBox dialogBoxOpen={dialogBoxOpen} cancelButton={cancelButton}/>
                          }
                          
                        </div>
                      )}
                      <p className="text-center">
                        Listing begins SOON on more then 4+ Exchanges.
                      </p>
                      <p className="text-center">
                        Watch this space for claiming.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="about-bg" id="tokenomics">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h1>
                <span className="tommorow">WISE</span> Allocation
              </h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="sale-box-black">
                  <h2>WISE SEED ROUND</h2>
                  <p>Token Pricing: $0.027</p>{" "}
                  {/* <p>Minimum Investment: $100 </p> */}{" "}
                  <button className="btn">ONGOING</button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="sale-box-black">
                  <h2>ICO ON EXCHANGE</h2>
                  <p>Token Pricing: $0.054</p>{" "}
                  {/* <p>Minimum Investment: $100 </p> */}{" "}
                  <button className="btn">COMING SOON</button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="sale-box-black">
                  <h2>WISE LISTING </h2>
                  <p>
                    Token Pricing: To The Jupiter 🚀 (Planet of Wisdom) 🚀
                  </p>{" "}
                  {/* <p>Minimum Investment: $100 </p> */}{" "}
                  <button className="btn">COMING SOON</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center d-flex mt-4">
            <ul className="tokenomics-list">
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Seed Round</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    {" "}
                    3 Months cliff and vested over 12 Months from TGE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">4.00 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Wise Public Round 1</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Unlockced at TGE and vested over 9 months from TLE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">4.18 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Wise Public Round 2</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Unlockced at TGE and vested over 9 months from TLE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">4.18 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Wise Community Round</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Unlockced at TGE and vested over 9 months from TLE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">6.18 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Team</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    {" "}
                    12 Months cliff and vested over 36 Months from TGE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">6.30 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Operations</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Unlockced all at TGE and vested over 18 Months from TLE
                    date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">3.18 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">
                      {" "}
                      Telent Acquisition & Wisdom Events{" "}
                    </span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    {" "}
                    3 Months cliff and vested over 36 Months from TGE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">9.00 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">
                      {" "}
                      Marketing, Promotion &amp; Community Building{" "}
                    </span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    3 Months cliff and vested over 36 Months from TGE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">8.00 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Treasury / Game Development</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    3 Months cliff and vested over 45 Months from TGE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">15.00 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Donation &amp; Charity</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    3 Months cliff and vested over 45 Months from TGE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">9.00 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">
                      {" "}
                      Advisor / Promoter / Influencer{" "}
                    </span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    Unlockced all at TGE and vested over 45 Months from TLE
                    date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">3.00 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Proof Of Reserve</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    18 Month cliff and vested over 45 Months from TGE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">9.00 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Exchanges</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    Unlockced all at TGE and vested over 12 Months from TLE
                    date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">9.00 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Staking Reward</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    3 Months cliff and vested over 45 Months from TGE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">5.00 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Airdrop</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    1 Month cliff and vested over 9 Months from TGE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">3.00 %</span>
                </div>
              </li>
              <li className="tokenomics-list__item">
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__title">
                    <span className="text-theme">Future Innovation</span>
                  </span>
                  <span className="tokenomics-list__small-text">
                    3 Months cliff and vested over 27 Months from TGE date.
                  </span>
                </div>
                <div className="tokenomics-list__col">
                  <span className="tokenomics-list__small-text">
                    {" "}
                    Token Allocation{" "}
                  </span>
                  <span className="tokenomics-list__number">2.00 %</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="roadmap-sec p-tb white-sec c-l" id="roadmap">
        <div className="circle-ripple"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center">
                <h1 className="section-heading">
                  <span className="tommorow">WISE</span> Route
                </h1>
              </div>
              <div className="sub-txt text-center">
                <h4>
                  {" "}
                  Proceeding down the avenue of disseminating knowledge with a
                  WISE community and carving a fresh path towards enlightenment.{" "}
                </h4>
              </div>
              <h2 className="text-center">
                “The <span className="tommorow">SWIM</span> Year Ahead“
              </h2>
            </div>
          </div>
          <div className="rowTwoCol">
            <div className="vertical-roadmap twoColumn">
              <div className="roadmap-item">
                <div className="roadmap-text">
                  <div className="roadmap-item-text">
                    <ul>
                      <li>
                        {" "}
                        Make 'Spreading Wisdom' the central theme of the game
                        and focus on nurturing green entrepreneurs{" "}
                      </li>
                      <li>
                        {" "}
                        Embed educational components into the game to educate
                        players about Human Well-Being and environmental
                        protection{" "}
                      </li>
                      <li>
                        {" "}
                        Encourage players to take meaningful action in real life
                        to help protect the planet{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="roadmap-day">
                    <span>Goal-Driven-Events</span>
                  </div>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-text cm_wd_100">
                  <div className="roadmap-item-text">
                    <ul>
                      <li>
                        {" "}
                        Establish a robust social media presence to promote the
                        game and connect with players.
                      </li>
                      <li>
                        {" "}
                        Adopt blockchain technology to create a secure and
                        transparent platform for the Toddler's Game NFT.
                      </li>
                      <li>
                        {" "}
                        Integrate cutting-edge VR and AR technologies to improve
                        the user experience.
                      </li>
                      <li>
                        {" "}
                        Hold events to spread wisdom and connect the already
                        existing 1.5Million Wise-Ards community.{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="roadmap-day">
                    <span>Social Media and Technology</span>
                  </div>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-text">
                  <div className="roadmap-item-text">
                    <ul>
                      <li>
                        Foster community by inviting and engaging everyone to
                        our wise academy research and enabling users to interact
                        with each other within the wise world ecosystem.
                      </li>
                      <li>
                        {" "}
                        Organize events and activities to bring players together
                        and create a sense of community.
                      </li>
                      <li>
                        {" "}
                        Provide players with opportunities to contribute their
                        ideas and suggestions for game improvement.
                      </li>
                    </ul>
                  </div>
                  <div className="roadmap-day">
                    <span> Community Building 'THE WISE ACADEMY' </span>
                  </div>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-text cm_wd_100">
                  <div className="roadmap-item-text">
                    <ul>
                      <li>
                        Launch the Testing of Toddler's Game NFT to the public
                        Beta Version and Upgrade App including in it all the
                        community members inputs before launching the Final
                        Version intensive marketing campaigns to reach a larger
                        audience.
                      </li>
                      <li>
                        {" "}
                        Regularly update and improve the game based on player
                        feedback and industry trends.
                      </li>
                      <li>
                        {" "}
                        Offer engaging incentives and rewards to increase player
                        engagement with the game.
                      </li>
                    </ul>
                  </div>
                  <div className="roadmap-day">
                    <span>Launch Test and Marketing</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="vertical-roadmap twoColumn">
              <div className="roadmap-item">
                <div className="roadmap-text">
                  <div className="roadmap-item-text">
                    <ul>
                      <li>
                        Continue to Forge strategic alliances with top gaming
                        developers and quantitative experts to complete the
                        ongoing development of the “WISEME’Toddler's Game NFT
                        and MIAMI (First Ever Metaverse inside a Metaverse
                        Inception).
                      </li>
                      <li>
                        Collaborate with play schools and educational
                        institutions to integrate the game into their curriculum
                        and broaden its reach to Every Possible toddler,
                        Adolescent & Parent.
                      </li>
                      <li>
                        {" "}
                        Seek feedback from the community and industry leaders to
                        continuously enhance the game.
                      </li>
                      <li>
                        Organize events and training sessions for parents to
                        educate them on how to help their toddlers understand
                        the importance of spreading wisdom.
                      </li>
                    </ul>
                  </div>
                  <div className="roadmap-day">
                    <span>Development and Partnership</span>
                  </div>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-text cm_wd_100">
                  <div className="roadmap-item-text">
                    <ul>
                      <li>
                        Creating potential platforms for expanding the SWIM
                        Mission to allow organisations worldwide to come on
                        Onboard our mission #spreadwisdom.
                      </li>
                      <li>
                        Pursue new collaborations and partnerships with all the
                        Potentially Wise Metaverse to further the reach and
                        impact of Our #spreadwisdom Aim.
                      </li>
                    </ul>
                  </div>
                  <div className="roadmap-day">
                    <span>Expansion and Collaboration</span>
                  </div>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-text">
                  <div className="roadmap-item-text">
                    <ul>
                      <li>
                        {" "}
                        Implement a rewards system for players/parents who
                        contribute to the game and exhibit eco-friendly
                        behaviour in real life.
                      </li>
                      <li>
                        {" "}
                        Provide incentives for players to recycle, reduce waste,
                        and engage in other environmentally conscious
                        activities.
                      </li>
                      <li>
                        {" "}
                        Use the rewards system to inspire players to adopt a
                        more sustainable lifestyle.
                      </li>
                    </ul>
                  </div>
                  <div className="roadmap-day">
                    <span>Rewards System</span>
                  </div>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-text cm_wd_100">
                  <div className="roadmap-item-text">
                    <ul>
                      <li>
                        {" "}
                        Continuously seek player and industry expert feedback to
                        improve the game.
                      </li>
                      <li>
                        {" "}
                        Offer frequent updates and improvements based on
                        feedback and industry trends.
                      </li>
                      <li>
                        Ensure the #SWIM-Spread Wisdom Toddler’s/Parent Game
                        “WISE ME “ and MIAMI(met averse) remains relevant and
                        engaging for everyone to continue spreading the wisdom
                        of fostering green entrepreneurs and Healthy planet.
                      </li>
                    </ul>
                  </div>
                  <div className="roadmap-day">
                    <span>Continuous Improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cm_dark_bg">
        <div className="container-fluid">
          <div className="row my-3">
            <h1 className="text-center my-5">FEATURED IN</h1>
            <div className="col-md-1"></div>
            <div className="col-md-2">
              <img src="assets/1.png" width={250} alt="" />
            </div>
            <div className="col-md-2">
              <img src="assets/2.png" width={250} alt="" />
            </div>
            <div className="col-md-2">
              <img src="assets/3.png" width={250} alt="" />
            </div>
            <div className="col-md-2">
              <img src="assets/4.png" width={250} alt="" />
            </div>
            <div className="col-md-2">
              <img src="assets/5.png" width={250} alt="" />
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Presale;



