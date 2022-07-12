import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

function Navbar({ connected }) {
    return (
        <div className='nav'>
            <div className='logo'>
                <img src="/BetSolLogo.png" alt="BetSol"/>
            </div>
            <div className='wallet-info'>
                <WalletMultiButton />
            </div>
        </div>
    )
}

export default Navbar