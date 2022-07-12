import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import * as anchor from '@project-serum/anchor'
import idl from '../../idl.json';
import React, { useEffect, useState } from 'react'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import useProgram from '../../hooks/useProgram';
import LotteryCard from '../LotteryCard';
import useMethods from '../../hooks/useMethods';
import CreateLotteryForm from '../CreateLotteryForm';
import { Box, Modal } from '@material-ui/core';





function MainView() {
  const wallet = useWallet()
  const walletAddress = wallet.publicKey.toString();
  const [userIsManager, setUserIsManager] = useState(false)
  const [openCreateLotteryForm, setOpenCreateLotteryForm] = useState(false)


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
      {userIsManager && <button className='create-btn' onClick={() => setOpenCreateLotteryForm(true)}>create lottery</button>}
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

      <Modal
        open={openCreateLotteryForm}
        onClose={() => setOpenCreateLotteryForm(false)}
        aria-labelledby="create-lottery-modal-title"
        aria-describedby="create-lottery-description"
      >
        <Box style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}>
          <CreateLotteryForm create_lottery={create_lottery} closeFunction={() => setOpenCreateLotteryForm(false)}/>
        </Box>
      </Modal>
    </div>
  )
}

export default MainView