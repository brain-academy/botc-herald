import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'
import User from '../../../domain/user'

export default function Notification({guests, toastSend, setToastSend}: {guests: User[], toastSend: boolean, setToastSend: (val: boolean) => void}) {
    return <Snackbar
        open={toastSend}
        autoHideDuration={6000}
        onClose={() => setToastSend(false)}>
        <MuiAlert onClose={() => setToastSend(false)} severity="success" elevation={6} variant="filled" >
            Roles envoyés !
            {guests
                .filter(({role}) => !!role)
                .map(user => <div key={user.name}>
                    <span style={{display: 'flex', justifyContent: 'space-between'}}>
                        <label>{user.name}</label>
                        <label>{user.role}</label>
                    </span>
                </div>)}
        </MuiAlert>
    </Snackbar>
}
