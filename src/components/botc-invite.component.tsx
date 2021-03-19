import React, {Fragment, ReactNode} from 'react';
import User from '../domain/user';
import GuestRoleComponent from './botc-invite/guest-role.component';
import SimpleTabs from './botc-invite/invite-panel';

interface GuestsProps { }
interface GuestsState {
    guests: Map<string, User[]>
}

export default class BotcInvite extends React.Component<GuestsProps, GuestsState> {

    constructor(props: GuestsProps) {
        super(props)
        this.state = {guests: new Map()}
    }

    componentDidMount() {
        fetch('http://34.77.25.251:3000/users/botc/subscriptions', {
            method: 'GET', mode: 'cors', headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then((data: Map<string, User[]>) => {
                this.setState({guests: new Map(data)})
            })
    }

    render(): ReactNode {
        return (
            <SimpleTabs/>
            // <Fragment>
            //     {Array.from(this.state.guests.entries())
            //         .map(([day, users]) => <Fragment key={day}>
            //             <label>{day}</label>
            //             {users.map(user => <GuestRoleComponent key={user.name} user={user} />)}
            //         </Fragment>
            //         )}
            // </Fragment>
        )
    }
}
