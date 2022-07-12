import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function LotteryCard({ data, take_part, elect_winner, getParticipantInfo, claimReward, userIsManager }) {
  const wallet = useWallet()
  const [isWinner, setIsWinner] = useState(false);
  useEffect(() => {
    if (!data.isActive) {
      winningStatus();
    }
  }, [])
  const winningStatus = async () => {
    const p_data = await getParticipantInfo(data.winner);
    console.log({ p_data })
    console.log(p_data.user.toString(), wallet.publicKey.toString(), p_data.user.toString() === wallet.publicKey.toString())
    if (p_data.user.toString() === wallet.publicKey.toString()) {
      setIsWinner(true)
    }
  }

  return (
    <div className={`lottery-card ${!data.isActive ? 'inactive' : ''} ${isWinner ? 'winner-card' : ''}`}>
      <div className='pool-size'>{parseInt(data.funds.toString()) / 1000000000} <span className='currency'>SOL</span></div>
      <div className='act-btns'>
        {data.isActive && <button className='entry-btn' onClick={() => take_part(data.index)}>ENROLL NOW</button>}
        {!data.isActive && !isWinner && <div className='entry-btn disabled'>Ended</div>}
        {userIsManager && data.isActive && <button className='entry-btn success' onClick={() => { elect_winner(data.index) }}>Draw Winner</button>}
      </div>
      <div className='entry-fee'>
        <div className='cost'>
          <div className='title'>Entry Fee</div>
          <div className='fee'>{parseInt(data.entryFee.toString()) / 1000000000} <span className='currency'>SOL</span></div>
        </div>
      </div>
      {!data.isActive && !isWinner && <div className='reveal-winner' onClick={() => alert(`Winning participant: ${data.winner.toString()}`)}>Show Winner</div>}
      {!data.isActive && isWinner && data.rewardClaimed && <div className='claim-btn disabled'>Reward Claimed</div>}
      {!data.isActive && isWinner && !data.rewardClaimed && <div className='claim-btn' onClick={() => { claimReward(data.index) }}>Claim Reward</div>}
      {isWinner && <div className='winner-tag'>You Won!</div>}
      <div className='participants'>
        <img src="https://toppng.com/uploads/preview/people-people-icon-blue-11553450975ccznm1rxwu.png" alt="participant" />
        <div className='count'>{data.participantCount.toString()}</div>
      </div>
    </div>
  )
}

export default LotteryCard