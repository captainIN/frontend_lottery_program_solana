import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

function LoginBox() {
    return (
        <div className='login-container'>
            <div className='login-box'>
                <div className='title'>Login to Blogchain</div>
                <div className='sub-title'>Unlock the new world!</div>
                <div className='button-container'>
                    <WalletMultiButton />
                </div>
            </div>
        </div>
    )
}

export default LoginBox