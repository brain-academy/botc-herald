import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import React from 'react'
import User from '../../../domain/user'

interface ConfirmationProps {
    guests: User[]
    open: boolean
    validationCallback: () => void
    cancelationCallback: () => void
}

export default function Confirmation({guests, open, validationCallback, cancelationCallback}: ConfirmationProps) {
    return <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={open}>
        <DialogTitle id="confirmation-dialog-title">Confirmer l'envoi des rôles ?</DialogTitle>
        <DialogContent dividers>
            {guests
                .filter(({role}) => !!role)
                .map(user => <div key={user.name}>
                    <span style={{display: 'flex', justifyContent: 'space-between'}}>
                        <label>{user.name}</label>
                        <label>{user.role}</label>
                    </span>
                </div>)}
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={cancelationCallback} color="primary">Annuler</Button>
            <Button onClick={validationCallback} color="primary">Ok</Button>
        </DialogActions>
    </Dialog>
}
