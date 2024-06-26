import React, {useState} from 'react'
import {ethers} from 'ethers'
import './WalletCard.css'


const WalletCard = () =>{
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect wallet');


  const connectWalletHandler=() => {
    if(window.ethereum){
        window.ethereum.request({method:'eth_requestAccounts'})
        .then(result =>{accountChangedHandler(result[0]);})
    }
    else { setErrorMessage('install Metamask');}
  }    

  const accountChangedHandler = (newAccount) =>{
    setDefaultAccount(newAccount);
    setConnButtonText('Wallet Connected');
    getUserBalance(newAccount.toString());
  }

  const getUserBalance = (account) =>{
    window.ethereum.request({method:'eth_getBalance', params: [account, 'latest']})
    .then (balance => {setUserBalance(ethers.formatEther(balance)); })
  }

  const chainChangedHandler = ()=> {
    window.location.reload();
  }

   window.ethereum.on('accountChanged', accountChangedHandler);
   window.ethereum.on('chainChanged', chainChangedHandler);
    return (
        <div className='walletCard'>
        <h4> {"Connection to Metamask using window. ethereum methods"} </h4>
        <button onClick = {connectWalletHandler}>{connButtonText}</button>
        <div className='accountDisplay'>
           <h3>Taiwo Talabi Address: {defaultAccount}</h3>
        </div>
        <div className='balanceDisplay'>
           <h3> Balance: {userBalance}</h3>
        </div>
        {errorMessage}
        </div>
    ); 
}
export default WalletCard;