import {Button} from '@material-ui/core'
import React, {ChangeEvent, CSSProperties, useState} from 'react'
import config from '../../config.json'
import User from '../../domain/user'
import GuestRole from './guest-role.component'
import Confirmation from './validation/confirmation.component'
import Notification from './validation/notification.component'

const REPLACE_PATTERN = /<(.*?)>/g

export default function SessionInvite(props: {guests: User[]}) {

    const [guests, setGuests] = useState([...props.guests])
    const [assignRoleText, setAssignRoleText] = useState(config.assignRoleText)
    const [confirmSend, setConfirmSend] = useState(false)
    const [toastSend, setToastSend] = useState(false)

    const onAssignRoleTextChange = (text: ChangeEvent<HTMLTextAreaElement>) => setAssignRoleText(text.target.value || '')

    const handleSelectRole = (user: User, role: string) => {
        user.role = role === 'default' ? '' : role
        setGuests([...guests])
    }

    const sendRoles = () => {
        guests.forEach(user => {
            if (!!user.role) {
                fetch(`${config.server}/users/${user.discord.id}/dm`, {
                    method: 'POST', mode: 'cors', headers: new Headers({'Content-Type': 'application/json'}),
                    body: JSON.stringify({message: assignRoleText.replaceAll(REPLACE_PATTERN, user.role)})
                })
                    .then(_ => {
                        setConfirmSend(false)
                        setToastSend(true)
                    })
                    .catch(_ => setConfirmSend(false))
            }
        })
    }

    const clearRoles = () => setGuests(guests.map(guest => ({...guest, role: ''})))

    return (
        <div style={{height: "100%", display: 'grid', gridGap: "10px", placeItems: "center center"}}>
            <div style={guestContainer}>
                {guests.map(user => <GuestRole
                    key={user.name}
                    user={user}
                    selectedRole={user.role}
                    onSelectRole={role => handleSelectRole(user, role)} />)}
            </div>
            <textarea
                style={{whiteSpace: 'pre-line', width: '80%', maxWidth: "800px", height: '300px', gridRow: 2}}
                value={assignRoleText}
                onChange={onAssignRoleTextChange}
            />
            <span style={{gridRow: 3}}>
                <Button variant="contained" onClick={clearRoles}>Clear</Button>
                <Button variant="contained"
                    onClick={() => setConfirmSend(true)}
                    disabled={guests.filter(user => !!user.role).length === 0}
                >Envoyer</Button>
            </span>
            <Confirmation
                open={confirmSend}
                validationCallback={sendRoles}
                cancelationCallback={() => setConfirmSend(false)}
                guests={guests}
            />
            <Notification guests={guests} toastSend={toastSend} setToastSend={setToastSend} />
        </div>
    )
}

const guestContainer = {
    gridRow: 1,
    width: '100%',
    maxWidth: '600px',
    display: "inline-flex",
    flexDirection: "column"
} as CSSProperties
