import React from 'react';
import User from '../../domain/user'
import config from '../../config.json'

export default function GuestRoleComponent({user: {name}}: {user: User}) {
    return (
        <span style={flex}>
            {name}
            <select defaultValue="default">
                <option value="default" disabled>{"<Choisir un rôle>"}</option>
                {config.roles.map(role => <option key={role}>{role}</option>)}
            </select>
        </span>
    )
}

const flex = {
    display: 'flex',
    width: '50%',
    justifyContent: 'space-between',
    paddingLeft: '10%'
}
