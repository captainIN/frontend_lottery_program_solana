import React, { useState } from 'react'
import useProgram from './useProgram';
import * as anchor from '@project-serum/anchor'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';

// Random int generation function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function useMethods() {
  const { program, wallet } = useProgram();
  const [all_lotteries, set_all_lotteries] = useState([])

  const getAllLotteries = async () => {
    const all_lotteries = await program.account.lottery.all();
    console.log({ all_lotteries })
    set_all_lotteries(all_lotteries)
  }
  const initialize = async () => {
    let [account_state_signer] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("state")],
      program.programId
    )
    const tx = await program.rpc.initialize({
      accounts: {
        programState: account_state_signer,
        owner: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      }
    });
    console.log("Your initialized transaction signature", tx);
  }

  const create_lottery = async (fees) => {
    let [account_state_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("state")],
      program.programId
    )
    let account_state_data = await program.account.programState.fetch(account_state_pda);
    console.log({ account_state_data })
    let [lottery_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("lottery"), new anchor.BN(account_state_data.lotteryCount).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )
    console.log({ lottery_pda })
    let BN_fees = new anchor.BN(fees * 1000000000)
    const tx = await program.rpc.createLottery(BN_fees, {
      accounts: {
        programState: account_state_pda,
        lottery: lottery_pda,
        user: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      }
    });
    console.log("Create lotttery tx =", tx)

    getAllLotteries();
  }

  const take_part = async (lottery_index) => {
    let [lottery_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("lottery"), new anchor.BN(lottery_index).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )
    let lottery_data = await program.account.lottery.fetch(lottery_pda);

    let [participant_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("participant"), new anchor.BN(lottery_data.index).toArrayLike(Buffer, 'be', 8), lottery_data.participantCount.toArrayLike(Buffer, 'be', 8)],
      program.programId
    )

    console.log(lottery_data.entryFee.toString(), { participant_pda })
    console.log({
      lottery: lottery_pda,
      participant: participant_pda,
      user: wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    })
    const tx = await program.rpc.createParticipant({
      accounts: {
        lottery: lottery_pda,
        participant: participant_pda,
        user: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      }
    })

    console.log("tx=", tx)
    await getAllLotteries();
  }

  const elect_winner = async (lottery_index) => {
    let [account_state_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("state")],
      program.programId
    )

    let [lottery_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("lottery"), new anchor.BN(lottery_index).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )
    let lottery_data = await program.account.lottery.fetch(lottery_pda);
    let total_participants = parseInt(lottery_data.participantCount.toString());
    const winning_index = getRandomInt(total_participants);
    console.log("choosen winner index is =", winning_index)
    let tx = await program.rpc.finalizeWinner(new anchor.BN(winning_index), {
      accounts: {
        programState: account_state_pda,
        lottery: lottery_pda,
        user: wallet.publicKey,
      }
    });
    console.log("Finalize winner tx=", tx);
    getAllLotteries();
  }

  const getParticipantInfo = async (participant_pda) => {
    const participant_data = await program.account.participant.fetch(participant_pda);
    return participant_data
  }

  const claimReward = async (lottery_index) => {
    let [lottery_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("lottery"), new anchor.BN(lottery_index).toArrayLike(Buffer, 'be', 8)],
      program.programId
    );

    let lottery_data = await program.account.lottery.fetch(lottery_pda);
    let lottery_winning_participant = lottery_data.winner;
    let tx = await program.rpc.claimReward({
      accounts: {
        lottery: lottery_pda,
        participant: lottery_winning_participant,
        user: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      }
    });

    console.log("Claim Reward tx=", tx)
    getAllLotteries()
  }

  const getManager = async () => {
    let [account_state_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("state")],
      program.programId
    )
    let account_state_data = await program.account.programState.fetch(account_state_pda);
    return account_state_data.owner
  }
  return {
    all_lotteries,

    initialize,
    getAllLotteries,
    take_part,
    create_lottery,
    elect_winner,
    getParticipantInfo,
    claimReward,
    getManager
  }
}

export default useMethods