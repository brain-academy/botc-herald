import React, {ChangeEvent} from 'react'
import config from '../../config.json'
import User from '../../domain/user'
import NativeSelect from '@material-ui/core/NativeSelect'

export default function GuestRole({user: {name}, onSelectRole}: {user: User, onSelectRole: (role: string) => void}) {
    return (
        <span style={flex}>
            {name}
            <NativeSelect style={{width: "200px", color: "#da0050"}} defaultValue="default" onChange={(role: ChangeEvent<HTMLSelectElement>) => onSelectRole(role.currentTarget.value)}>
                <option value="default">{"<Choisir un rôle>"}</option>
                {config.roles.map(role => <option key={role}>{role}</option>)}
            </NativeSelect>
        </span>
    )
}

const flex = {
    display: 'flex',
    justifyContent: 'space-between',
}
