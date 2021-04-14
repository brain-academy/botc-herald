import {Box} from '@material-ui/core'
import React from 'react'

interface TabPanelProps {
    children?: React.ReactNode
    index: any
    value: any
}

export default function TabPanel({children, value, index, ...other}: TabPanelProps) {
    return (
        <div id={`simple-tabpanel-${index}`} {...other} style={TabStyle}>
            {value === index && (
                <Box p={3}>{children}</Box>
            )}
        </div>
    )
}

const TabStyle = {
    width: '100%',
}
