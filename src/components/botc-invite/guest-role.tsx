import {NativeSelect} from '@material-ui/core'
import React, {ChangeEvent} from 'react'
import config from '../../config.json'
import User from '../../domain/user'

export default function GuestRole({user: {name}, selectedRole = 'default', onSelectRole}: {user: User, selectedRole: string, onSelectRole: (role: string) => void}) {
    return (
        <span style={flexContainer}>
            {name}
            <NativeSelect style={{width: "200px", color: "#da0050"}} value={selectedRole} onChange={(role: ChangeEvent<HTMLSelectElement>) => onSelectRole(role.currentTarget.value)}>
                <option value="default">{"<Choisir un rôle>"}</option>
                {config.roles.map(role => <option key={role} value={role}>{role}</option>)}
            </NativeSelect>
        </span>
    )
}

const flexContainer = {
    display: 'flex',
    justifyContent: 'space-between',
}
