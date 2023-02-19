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
import { Web3Button } from "@web3modal/react";
import DialogBox from "./DialogBox";
import { makeStyles } from '@material-ui/core/styles';
import { useAccount } from "wagmi";
import { useAuth } from '../contexts/AuthContext2';


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
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const onMetamaskConnect = () => {
    setMetamaskConnected(true);
  }


  const onMetamaskDisconnect = () => {
    setMetamaskConnected(false);
  }

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
        <video autoPlay loop playsInline muted src={"assets/img/file.mp4"} />
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

  const disconnectClicked = () => {
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

                      {isConnected || isLoggedIn ? (
                        <>
                        <div className="wallet mt-3">     
                          <Button
                            className="w-100 btn btn-primary"
                            onClick={() => setModalShow(true)}
                          >
                            Buy
                          </Button>
                        </div>
                      <Button onClick={disconnectClicked}>Disconnect</Button>
                      </>
                      ) : (
                        <div className="mt-3">
                            <Button onClick={connectClicked}>Connect</Button>
                        </div>
                      )}
                      {
                        <DialogBox dialogBoxOpen={dialogBoxOpen} cancelButton={cancelButton}/>
                      }
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
     

      <Footer />
    </>
  );
};
export default Presale;



