import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import React, {Fragment} from 'react'
import config from '../config.json'
import User from '../domain/user'
import Confirmation from './botc-invite/confirmation.component'
import TabPanel from './botc-invite/invite-panel.component'
import SessionInvite from './botc-invite/session-invite.component'

interface GuestsProps { }
interface GuestsState {
    value: number | string
    guests: Map<string, User[]>
}

export default class BotcInvite extends React.Component<GuestsProps, GuestsState> {
    constructor(props: GuestsProps) {
        super(props)
        this.state = {
            value: 0,
            guests: new Map()
        }
    }

    handleChange = (event: React.ChangeEvent<{}>, newValue: string) => this.setState({value: newValue})

    componentDidMount() {
        fetch(`${config.server}/users/botc/subscriptions`, {
            method: 'GET', mode: 'cors', headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then((data: Map<string, User[]>) => {
                this.setState({guests: new Map(data)})
            })
    }

    render() {
        const {value} = this.state
        const subs = Array.from(this.state.guests.entries())
        const days = Array.from(this.state.guests.keys())
        return (
            <Fragment>
                <AppBar>
                    <Tabs value={value} onChange={this.handleChange}>
                        {subs.map(([day]) => <Tab key={day} label={day} id={`simple-tab-${day}`} />)}
                    </Tabs>
                </AppBar>
                <div style={{marginTop: "48px", height: "100%", width: "100%"}}>
                    {subs.map(([day, users]) => (<TabPanel key={day} value={value} index={days.indexOf(day)}>
                        <SessionInvite guests={users} />
                    </TabPanel>)
                    )}
                </div>
                {/* <Confirmation open={true}/> */}
            </Fragment>
        )
    }
}
