import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import User from '../../domain/user'

interface ConfirmationProps {
    open: boolean
    validationCallback: () => void
    cancelationCallback: () => void
    guests: Map<User, string>
}

export default class Confirmation extends React.Component<ConfirmationProps, any> {

    render() {
        return <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={this.props.open}
        >
            <DialogTitle id="confirmation-dialog-title">Confirmer l'envoi des rôles ?</DialogTitle>
            <DialogContent dividers>
                {
                    Array.from(this.props.guests.entries())
                        .filter(([_, role]) => !!role)
                        .map(([user, role]) => <div key={user.name}>{`${user.name} => ${role}`}</div>)}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={this.props.cancelationCallback} color="primary">Annuler</Button>
                <Button onClick={this.props.validationCallback} color="primary">Ok</Button>
            </DialogActions>
        </Dialog>
    }

}
