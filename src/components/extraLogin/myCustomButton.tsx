import React from 'react'
import { Button } from 'reactstrap'

const MyCustomButton = ({ onClick, children }) => {
    return (
        <Button 
        onClick={onClick} style={{ width:'285px', borderRadius:50, backgroundColor:'transparent', color:'black', height:46}}>
            {children}
        </Button>
    )
}

export default MyCustomButton
