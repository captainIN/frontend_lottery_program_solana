import { Provider } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor'
import idl from '../idl.json';
const opts = {
    preflightCommitment: "processed"
}


// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

function useProgram() {
    const wallet = useWallet();

    const getProvider = () => {
        const connection = new Connection(network, opts.preflightCommitment);
        const provider = new Provider(
            connection, wallet, opts.preflightCommitment,
        );
        return provider;
    }

    const provider = getProvider();
    const program = new anchor.Program(
        idl,
        programID,
        provider
    )
  return {
    program,
    provider,
    wallet
  }
}

export default useProgram