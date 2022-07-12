import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import * as anchor from '@project-serum/anchor'
import idl from '../../idl.json';
import React, { useEffect, useState } from 'react'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import useProgram from '../../hooks/useProgram';
import LotteryCard from '../LotteryCard';
import useMethods from '../../hooks/useMethods';





function MainView() {
  const wallet = useWallet()
  const walletAddress = wallet.publicKey.toString();
  const [userIsManager, setUserIsManager] = useState(false)


  const {
    all_lotteries,
    getAllLotteries,
    take_part,
    create_lottery,
    initialize,
    elect_winner,
    getParticipantInfo,
    claimReward,
    getManager
  } = useMethods();



  useEffect(() => {
    getAllLotteries();
    checkOwner();
  }, [])
  const checkOwner = async () => {
    let user = await getManager();
    if (user.toString() === wallet.publicKey.toString()) {
      setUserIsManager(true)
    }
  }
  return (
    <div className='main-container'>
      {userIsManager && <button onClick={create_lottery}>create lottery</button>}
      <div className='heading-lottery-type'>Active:</div>
      <div className='lottery-grid'>
        {all_lotteries?.map(lottery => {
          if (lottery.account.isActive) {
            return <LotteryCard
              key={lottery.account.index}
              data={lottery.account}
              take_part={take_part}
              elect_winner={elect_winner}
              getParticipantInfo={getParticipantInfo}
              claimReward={claimReward}
              userIsManager={userIsManager}
            />
          }
        })}
      </div>
      <div className='heading-lottery-type'>Completed:</div>
      <div className='lottery-grid'>
        {all_lotteries?.map(lottery => {
          if (!lottery.account.isActive) {
            return <LotteryCard
              key={lottery.account.index}
              data={lottery.account}
              take_part={take_part}
              elect_winner={elect_winner}
              getParticipantInfo={getParticipantInfo}
              claimReward={claimReward}
              userIsManager={userIsManager}
            />
          }
        })}
      </div>
    </div>
  )
}

export default MainView