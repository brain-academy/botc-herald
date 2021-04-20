import {AppBar, Tab, Tabs} from '@material-ui/core'
import React, {Fragment, useEffect, useState} from 'react'
import {DayOfWeek} from '../domain/day-of-week'
import User from '../domain/user'
import TabPanel from './botc-invite/invite-panel.component'
import SessionInvite from './botc-invite/session-invite.component'

export default function BotcInvite() {

    const [value, setValue] = useState(0)
    const [guests, setGuests] = useState(new Map())

    const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => setValue(newValue)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_SERVER}/users/botc/subscriptions`, {
            method: 'GET', mode: 'cors',
            headers: new Headers({'Content-Type': 'application/json'})
        })
            .then(response => response.json())
            .then((data: Map<DayOfWeek, User[]>) => setGuests(new Map(data)))
    }, [])

    const subs = Array.from(guests.entries())
    const days = Array.from(guests.keys())
    return (
        <Fragment>
            <AppBar>
                <Tabs value={value} onChange={handleChange}>
                    {subs.map(([day]) => <Tab key={day} label={day} id={`simple-tab-${day}`} />)}
                </Tabs>
            </AppBar>
            <div style={{marginTop: "48px", height: "100%", width: "100%"}}>
                {subs.map(([day, users]) => (<TabPanel key={day} value={value} index={days.indexOf(day)}>
                    <SessionInvite guests={users} />
                </TabPanel>)
                )}
            </div>
        </Fragment>
    )
}
