import React from 'react';
export const UserDataContext = createContext()

const UserContext =({children}) => {
  const [user,setUser ] = React.useState({
    FullName:{
      firstName:'',
      lastName:''
    },
    email:'',
    password:'',
  });
  return (
    <div><UserDataContext.provider value={[user,setUser]}>{children}</UserDataContext.provider></div>
  )
}
export default UserContext;