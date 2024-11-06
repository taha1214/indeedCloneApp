import React from 'react';
import { Card } from 'antd';
const UserCard = ({ data }) => {

    const { name, email, qualification} = data

return(
  <Card
    style={{
      width: 250,
      backgroundColor: 'lightgrey',

    }}
  >
    <p>{name || null}</p>
    <p>{email || null}</p>
    <p>{qualification || null}</p>
    
  </Card>
  )
};
export default UserCard;