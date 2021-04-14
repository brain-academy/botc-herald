import Button from '@material-ui/core/Button'
import React, {ChangeEvent, CSSProperties} from 'react'
import config from '../../config.json'
import User from '../../domain/user'
import Confirmation from './confirmation.component'
import GuestRole from './guest-role.component'

interface SessionInviteProps {
    guests: User[]
}

interface SessionInviteState {
    guests: Map<User, string>
    assignRoleText: string
    confirmSend: boolean
}

const REPLACE_PATTERN = /<(.*?)>/g

export default class SessionInvite extends React.Component<SessionInviteProps, SessionInviteState> {

    private initGuests = () => new Map(this.props.guests.map(guest => [guest, '']))

    constructor(props: SessionInviteProps) {
        super(props)
        this.state = {
            guests: this.initGuests(),
            assignRoleText: config.assignRoleText,
            confirmSend: false
        }
    }

    onAssignRoleTextChange = (text: ChangeEvent<HTMLTextAreaElement>) => this.setState({assignRoleText: (text.target.value || '')})

    handleSelectRole = (user: User, role: string) => this.setState(state => {
        if (role === 'default')
            state.guests.set(user, '')
        else
            state.guests.set(user, role)
        return {guests: state.guests}
    })

    sendRoles = () => {
        Array.from(this.state.guests.entries()).forEach(([user, role]) => {
            if (!!role) {
                console.log(`${user.name}/${user.discord.id} is ${role}.`)
            }
            fetch(`${config.server}/users/${user.discord.id}/dm`, {
                method: 'POST', mode: 'cors', headers: new Headers({
                    'Content-Type': 'application/json'
                }), body: JSON.stringify({message: this.state.assignRoleText.replaceAll(REPLACE_PATTERN, role)})
            })
        })
        this.setState({confirmSend: false})
    }

    render() {
        return (
            <div style={{height: "100%", display: 'grid', gridGap: "10px", placeItems: "center center"}}>
                <div style={guestContainer}>
                    {Array.from(this.state.guests).map(([user, role]) => <GuestRole
                            key={user.name}
                            user={user}
                            selectedRole={role}
                            onSelectRole={role => this.handleSelectRole(user, role)} />
                    )}
                </div>
                <textarea
                    style={{whiteSpace: 'pre-line', width: '80%', maxWidth: "800px", height: '300px', gridRow: 2}}
                    value={this.state.assignRoleText}
                    onChange={this.onAssignRoleTextChange}
                />
                <span style={{gridRow: 3}}>
                    <Button variant="contained" onClick={() => this.setState({guests: this.initGuests()})}>Clear</Button>
                    <Button variant="contained"
                        onClick={() => this.setState({confirmSend: true})}
                        disabled={Array.from(this.state.guests.values()).filter(role => !!role).length === 0}
                    >Envoyer</Button>
                </span>
                <Confirmation
                    open={this.state.confirmSend}
                    validationCallback={this.sendRoles}
                    cancelationCallback={() => this.setState({confirmSend: false})}
                    guests={this.state.guests}
                />
            </div>
        )
    }

}

const guestContainer = {
    gridRow: 1,
    width: '100%',
    maxWidth: '600px',
    display: "inline-flex",
    flexDirection: "column"
} as CSSProperties
