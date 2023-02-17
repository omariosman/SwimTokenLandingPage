import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnect from "@walletconnect/web3-provider";
import toast, { Toaster } from "react-hot-toast";
import config from "../config/config";
import { Dialog, Classes } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { provider } from "./helper";

const ExchangeModal = (props) => {
  const [metamaskbalance, setmetamaskbalance] = useState(0);
  const [ethbalance, setethbalance] = useState(0);
  const [swimbalance, setswimbalance] = useState(0);
  const [useramount, setuseramount] = useState(0);
  const [bnbprice, setbnbprice] = useState(0);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [getWeb3, setGetWeb3] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [isprocessing, setisprocessing] = useState(false);
  useEffect(() => {
    if (props.getWeb3) {
      setGetWeb3(props.getWeb3);
      getMetamaskBalance(props.getWeb3);
    }
  }, [props.getWeb3]);

  const getMetamaskBalance = async (web3) => {
    var currentNetwork = await web3.eth.getChainId();

    if (currentNetwork != "1") {
      toast.error("Please Select ETH Network!!");
      return;
    }
    const accounts = await web3.eth.getAccounts();
    var from_address = accounts[0];

    const contract = await new web3.eth.Contract(
      config.BYC_ABI,
      config.BYC_TOKEN
    );
    let decimals = await contract.methods.decimals().call();

    var currentBal =
      (await contract.methods.balanceOf(from_address).call()) / 10 ** 18;

    const contract1 = await new web3.eth.Contract(
      config.SWIM_ABI,
      config.SWIM_TOKEN
    );

    var currentBal2 =
      (await contract1.methods.balanceOf(from_address).call()) / 10 ** 18;

    var getBalance1 = (await web3.eth.getBalance(from_address)) / 10 ** 18;
    var currentBal1 = parseFloat(getBalance1).toFixed(6);

    setmetamaskbalance(currentBal);
    setethbalance(currentBal1);
    setswimbalance(currentBal2);
  };

  const maxToken = async () => {
    setuseramount(ethbalance);

    // let usdTokenToPrice = 37;
    let usdTokenToPrice = 0.00063;
    let tokenTousd = parseFloat(ethbalance).toFixed(6);
    let bnbPrice = parseFloat(tokenTousd / usdTokenToPrice).toFixed(6);

    // if(bnbPrice > 0) {
    setbnbprice(bnbPrice);
    // }
  };

  const inputHandler = (e) => {
    let { name, value, id } = e.target;
    setuseramount(value);

    // let usdTokenToPrice = 37;
    let usdTokenToPrice = 37;
    let tokenTousd = parseFloat(value).toFixed(6);
    let bnbPrice = parseFloat(tokenTousd * usdTokenToPrice).toFixed(6);

    if (bnbPrice > 0) {
      setbnbprice(bnbPrice);
    }
    console.log("bnb", bnbPrice);

    // if (value !== '') {
    //     setvalidatioError((old) => {
    //         return { ...old, ['tokenAmountError']: '', ['cryptoAmountError']: '', ['transferAmountError']: '', }
    //     })
    // }
  };

  const handleSubmitTokenWithETH = async () => {
    var supply_amount = parseFloat(useramount);

    if (!supply_amount) {
      toast.error("Please Enter amount");
      return false;
    }

    // setisDialogOpen(true)
    try {
      var web3 = getWeb3;
      var currentNetwork = await web3.eth.getChainId();
      if (currentNetwork != "0x1" && currentNetwork != "1") {
        toast.error("Please Select ETH Network!!");
        return;
      }

      var accounts = await web3.eth.getAccounts();
      let from_address = accounts[0];
      var getBalace = (await web3.eth.getBalance(from_address)) / 10 ** 18;
      var currentBal = parseFloat(getBalace).toFixed(6);

      //   if (currentBal < supply_amount) {
      //     toast.error(`insufficient funds for transfer`);
      //     return false;
      //   }
      setisprocessing(true);

      if (!provider.connected) {
        provider.enable();
      }
      let newProvider = new Web3(provider);

      const contract = new newProvider.eth.Contract(
        config.PRE_SALE_ABI,
        config.PRE_SALE_ADDRESS
      );
      var tx_builder = "";

      supply_amount = (supply_amount * 10 ** 18).toString();

      tx_builder = await contract.methods.buyTokensWithEth(from_address);

      let encoded_tx = tx_builder.encodeABI();
      console.log("getBalace", encoded_tx);

      let gasPrice = await web3.eth.getGasPrice();
      console.log("gasprice", gasPrice);

      let gasLimit = await web3.eth.estimateGas({
        gasPrice: web3.utils.toHex(gasPrice),
        to: config.PRE_SALE_ADDRESS,
        from: from_address,
        data: encoded_tx,
        value: supply_amount,
        // chainId: chainId,
      });

      const txData = await web3.eth.sendTransaction({
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(gasLimit),
        to: config.PRE_SALE_ADDRESS,
        from: from_address,
        data: encoded_tx,
        value: supply_amount,
        // chainId: chainId,
      });

      if (txData.transactionHash) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        console.log("Transaction", txData.transactionHash);
        // await metamaskConfirm(txData.transactionHash);
      } else {
        console.log("Transaction123", txData);

        toast.error(`${txData.message}`);
        // setisprocessing(false)
        // setisDialogOpen(false)
        return false;
      }
    } catch (error) {
      console.log("err", error);
      toast.error(
        `Something went wrong! Please try again later. ${error.toString()}`
      );
      setisprocessing(false);
      // setisDialogOpen(false)
      return false;
    }
  };

  const buyToken = async () => {
    if (window.ethereum) {
      try {
        let amount = useramount;
        if (!amount || amount <= 0) {
          // setmsg('Please Enter amount')
          return false;
        }
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setisDialogOpen(true);
        // setisprocessing(true)

        var web3 = new Web3(window.ethereum);
        var currentNetwork = web3.currentProvider.chainId;

        var chainId = "0x1";
        var from_address = accounts[0];

        var getBalace = (await web3.eth.getBalance(from_address)) / 10 ** 18;
        var currentBal = parseFloat(getBalace).toFixed(6);

        const contract = await new web3.eth.Contract(
          config.BYC_ABI,
          config.BYC_TOKEN
        );
        let decimals = await contract.methods.decimals().call();

        var currentTokenBal =
          (await contract.methods.balanceOf(from_address).call()) / 10 ** 18;

        let allowanceBalance = await contract.methods
          .allowance(from_address, config.PRE_SALE_ADDRESS)
          .call();

        if (getBalace == 0 || currentTokenBal == 0) {
          toast.error(`insufficient funds for transfer`);
          setisDialogOpen(false);
          // setisprocessing(false)
          return false;
        }

        allowanceBalance = allowanceBalance / 10 ** 18;
        if (amount !== allowanceBalance || allowanceBalance > amount) {
          amount = parseInt(amount * 10 ** decimals).toString();

          let trx = await contract.methods.approve(
            config.PRE_SALE_ADDRESS,
            amount
          );

          let encodeData = trx.encodeABI();
          console.log("tr", encodeData);
          let gasPrice = await web3.eth.getGasPrice();

          let gasLimit = await web3.eth.estimateGas({
            gasPrice: web3.utils.toHex(gasPrice),
            to: config.BYC_TOKEN,
            from: from_address,
            value: 0,
            data: encodeData,
            chainId: chainId,
          });
          const txData = await web3.eth.sendTransaction({
            gasPrice: web3.utils.toHex(gasPrice),
            gas: web3.utils.toHex(gasLimit),
            to: config.BYC_TOKEN,
            from: from_address,
            data: encodeData,
            value: 0,
            chainId: chainId,
          });
          if (txData.transactionHash) {
            console.log("tx1234", txData.transactionHash);
            handleSubmitToken1();
          }
        } else {
          handleSubmitToken1();
        }
      } catch (error) {
        console.log("error", error);
        setisDialogOpen(false);
        // setisprocessing(false)

        toast.error(`Something went wrong! Please try again later.`);
        return false;
      }
    } else {
      toast.error(`Please connect your MetaMask wallet!`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
  };

  const handleSubmitToken1 = async () => {
    var supply_amount = parseFloat(useramount);

    if (!supply_amount) {
      toast.error("Please Enter amount");
      return false;
    }

    setisDialogOpen(true);
    // setisprocessing(true)

    if (window.ethereum) {
      // try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      var web3 = new Web3(window.ethereum);

      const contract = await new web3.eth.Contract(
        config.PRE_SALE_ABI,
        config.PRE_SALE_ADDRESS
      );
      var tx_builder = "";
      var from_address = accounts[0];
      tx_builder = await contract.methods.buyTokensWithUSDT(from_address);
      // console.log('tx',tx_builder);
      let encoded_tx = tx_builder.encodeABI();

      var currentNetwork = web3.currentProvider.chainId;

      if (currentNetwork !== "0x1") {
        // toast.error(`Please select BNB  network !`);
        // setisprocessing(true)
        return false;
      }
      var chainId = "0x1";

      const contractbalance = await new web3.eth.Contract(
        config.BYC_ABI,
        config.BYC_TOKEN
      );
      let decimals = await contractbalance.methods.decimals().call();

      var currentBal =
        (await contractbalance.methods.balanceOf(from_address).call()) /
        10 ** 18;

      if (currentBal < supply_amount) {
        toast.error(`insufficient funds for transfer`);
        // setisprocessing(false)
        setisDialogOpen(false);
        return false;
      }

      setisDialogOpen(true);

      supply_amount = (supply_amount * 10 ** 18).toString();

      let gasPrice = await web3.eth.getGasPrice();
      let gasLimit = await web3.eth.estimateGas({
        gasPrice: web3.utils.toHex(gasPrice),
        to: config.PRE_SALE_ADDRESS,
        from: from_address,
        data: encoded_tx,
        // value: 0,
        chainId: chainId,
      });
      console.log("gas", gasLimit);

      const txData = await web3.eth.sendTransaction({
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(gasLimit),
        to: config.PRE_SALE_ADDRESS,
        from: from_address,
        data: encoded_tx,
        // value: 0,
        chainId: chainId,
      });
      console.log("tx123", txData);

      if (txData.transactionHash) {
        console.log("txdata", txData.transactionHash);
        // await metamaskConfirm(txData.transactionHash);
      } else {
        console.log("txdata1232", txData);

        toast.error(`${txData.message}`);
        // setisprocessing(false)
        setisDialogOpen(false);
        return false;
      }
      // }
      // catch (error) {
      //   toast.error(`Something went wrong! Please try again later. ${error.toString()}`);
      //   // setisprocessing(false)
      //   setisDialogOpen(false)
      //   return false;
      // }
    } else {
      toast.error(`Please connect your MetaMask wallet!`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setisDialogOpen(false);

      return false;
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-box"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3 className="modal-head"> BUY: SWIM TOKEN </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="exchange-modal">
          <div className="balance-here d-flex align-items-center">
            <img alt="ETH" src="images/icons/ether.png" />
            <p style={{ lineHeight: "3rem", fontSize: "16px", padding: "5px" }}>
              ETH BALANCE: {ethbalance}{" "}
            </p>
            <hr />
          </div>
          <div className="balance-here d-flex align-items-center">
            <img alt="USDT" src="images/icons/usdt.png" />
            <p style={{ lineHeight: "3rem", fontSize: "16px", padding: "5px" }}>
              {" "}
              USDT BALANCE: {metamaskbalance}{" "}
            </p>
            <hr />
          </div>
          <div className="balance-here d-flex align-items-center">
            <img
              alt="SWIM"
              src="assets/img/logo.png"
              style={{ width: "25px" }}
            />
            <p style={{ lineHeight: "3rem", fontSize: "16px", padding: "5px" }}>
              {" "}
              SWIM BALANCE: {swimbalance}{" "}
            </p>
            <hr />
          </div>
          <div className="forminput">
            <div className="step-box">
              <h4>Pay</h4>
              <h5>TOKEN</h5>
            </div>
            <div className="enter-input">
              <input
                type="number"
                onKeyPress={(event) => {
                  if (!/^\d*[.]?\d{0,1}$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={inputHandler}
                class="form-control "
                value={useramount}
                name="useramount"
                placeholder="0"
              />
              <button onClick={maxToken} className="max-btn">
                MAX
              </button>
            </div>
          </div>
          <div className="forminput">
            <div className="step-box">
              <h4>Receive SWIM</h4>
            </div>
            <div className="enter-input">
              <input type="text" value={bnbprice} placeholder="0" />
            </div>
          </div>
          <p style={{ fontSize: "10px" }}> 3M Cliff, 12M Vesting.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isprocessing && (
          <Button disabled={true} className="w-100">
            Proceeding...
          </Button>
        )}
        {!isprocessing && (
          <Button className="w-100" onClick={handleSubmitTokenWithETH}>
            BUY NOW
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default ExchangeModal;
