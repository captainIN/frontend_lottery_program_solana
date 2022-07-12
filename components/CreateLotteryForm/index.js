import React, { useState } from 'react'

function CreateLotteryForm({create_lottery, closeFunction}) {
    const [entryFee, setEntryFee] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        await create_lottery(entryFee);
        closeFunction();
    }
    return (
        <div className='create-lottery-form-container'>
            <form className='create-lottery-form' onSubmit={e=>handleSubmit(e)}>

                <div>
                    <h3>Create New Lottery</h3>
                    <label>Entry Fee:</label>
                    <input
                        type="number"
                        step="0.001"
                        placeholder="Entry Fee in SOL"
        required
                        value={entryFee}
                        onChange={e => setEntryFee(e.target.value)}
                    />
                </div>

                <button
                    type='submit'
                    className='submit-btn'
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreateLotteryForm