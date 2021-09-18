import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ethers, BigNumber } from 'ethers';
import Container from '../components/Container';

import { contractAddress } from '../config';
import contract from '../contracts/abi.json';

export default function Home() {
  const [formInput, updateFormInput] = useState('');
  const [whitelistResult, setWhitelistResult] = useState(false);

  async function onAllowList() {
    if (typeof window.ethereum !== 'undefined') {
      let address = formInput.address;
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const instance = new ethers.Contract(
        contractAddress,
        contract.abi,
        provider
      );
      const transaction = await instance.onAllowList(address);
      if (transaction !== 'false') {
        setWhitelistResult('✅ Whitelisted');
      } else {
        setWhitelistResult('Not in whitelist');
      }
      // if (loadingState !== 'loaded') return (
      //   <h1 className='px-20 py-10 text-3xl'>dd</h1>
      // )
    }
  }

  async function requestAccount() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log('error');
      console.error(error);
      alert('Login to Metamask first');
    }
  }

  return (
    <Container>
      <div className='flex justify-center'>
        <div className='w-1/2 flex flex-col pb-12'>
          <input
            placeholder='Asset name'
            className='mt-8 border rounded p-4'
            onChange={(e) =>
              updateFormInput({ ...formInput, address: e.target.value })
            }
          />
          Whitelist status: {whitelistResult}
          <button
            onClick={onAllowList}
            className='font-bold mt-4 bg-black text-white rounded p-4'
          >
            Check whitelist status
          </button>
        </div>
      </div>
    </Container>
  );
}
// let test = await instance.PRICE(ethers.utils.formatBytes32String('string'))
// used to query, e.g. whitelist
