import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react'

function LotteryCard({data, take_part, elect_winner, getParticipantInfo, claimReward, userIsManager}) {
  const wallet = useWallet()
  const [isWinner, setIsWinner] = useState(false);
    useEffect(() => {
      if(!data.isActive){
        winningStatus();
      }
    }, [])
    const winningStatus = async () => {
      const p_data = await getParticipantInfo(data.winner);
      console.log({p_data})
      console.log(p_data.user.toString(), wallet.publicKey.toString(), p_data.user.toString() === wallet.publicKey.toString())
      if(p_data.user.toString() === wallet.publicKey.toString()){
        setIsWinner(true)
      }
    }
    
  return (
    <div>
        <ul>
            <li>entryFee: {parseInt(data.entryFee.toString())/1000000000}</li>
            <li>funds collected: {parseInt(data.funds.toString())/1000000000}</li>
            <li>Active: {data.isActive.toString()}</li>
            <li>participants: {data.participantCount.toString()}</li>
            {!data.isActive && <li>rewardClaimed: {data.rewardClaimed.toString()}</li>}
            {!data.isActive && <li>Winner: {data.winner.toString()}</li>}
            {data.isActive && <li><button onClick={()=>{take_part(data.index)}}>Enter</button></li>}
            {userIsManager && data.isActive && <li><button onClick={()=>{elect_winner(data.index)}}>Draw Winner</button></li>}
            {!data.isActive && isWinner && !data.rewardClaimed && <li><button onClick={()=>{claimReward(data.index)}}>Claim Reward</button></li>}
        </ul>
    </div>
  )
}

export default LotteryCard