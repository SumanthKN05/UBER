# Uber Clone Frontend Documentation

## 1. User Frontend Documentation

### 1.1 User Signup Page

**File:** userSignUp.jsx

#### Component Overview
The User Signup page enables new users to create an account by providing their personal information.

#### State Management
```jsx
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [firstName, setFirstName] = React.useState('');
const [lastName, setLastName] = React.useState('');
const [userData, setUserData] = React.useState({});
```

#### Form Handling Logic
```jsx
const submitHandler = (e) => {
  e.preventDefault();
  const newUserData = {
    Fullname: {
      firstName: firstName,
      lastName: lastName
    },
    email: email,
    password: password,
  };
  setUserData(newUserData);

  // Reset form fields
  setEmail('');
  setPassword('');
  setFirstName('');
  setLastName(''); 
}
```

#### Key UI Elements
- Split name input using a flex container with gap spacing
- Email input with email validation
- Password input with secure field
- Submit button for form submission
- Link to login page for existing users
- Privacy policy notice at bottom

#### Navigation
- Redirects to login page via "Already have an account?" link

---

### 1.2 User Login Page

**File:** userLogin.jsx

#### Component Overview
The User Login page allows existing users to access their accounts using email and password.

#### State Management
```jsx
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [userData, setUserData] = React.useState({});
```

#### Form Handling Logic
```jsx
const submitHandler = (e) => {
  e.preventDefault();
  setUserData({
    email: email,
    password: password,
  });
  console.log({userData});
  
  // Reset form fields
  setEmail('');
  setPassword('');
};
```

#### Key UI Elements
- Uber logo in top right corner
- Email input field with validation
- Password input with secure field
- "Login" button for authentication
- Link to signup page for new users
- "Sign in as Captain" option for driver login

#### Navigation
- Redirects to signup page via "Create A new Account" link
- Redirects to captain login page via "Sign in as Captain!" button

---

## 2. Captain Frontend Documentation

### 2.1 Captain Signup Page

**File:** captainSignup.jsx

#### Component Overview
The Captain Signup page allows drivers to register as Uber captains by providing their personal information.

#### State Management
```jsx
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [firstName, setFirstName] = React.useState('');
const [lastName, setLastName] = React.useState('');
const [userData, setUserData] = React.useState({});
```

#### Form Handling Logic
```jsx
const submitHandler = (e) => {
  e.preventDefault();
  const newUserData = {
    FullName: {
      firstName: firstName,
      lastName: lastName
    },
    email: email,
    password: password,
  };
  setUserData(newUserData);
 
  // Reset form fields
  setEmail('');
  setPassword('');
  setFirstName('');
  setLastName(''); 
}
```

#### Key UI Elements
- Uber driver logo in top right corner
- Split name input using a flex container with gap spacing
- Email input with validation
- Password input with secure field
- "SignUp" button for form submission
- Link to captain login page
- Privacy policy notice at bottom

#### Navigation
- Redirects to captain login page via "Login here" link

---

### 2.2 Captain Login Page

**File:** captainLogin.jsx

#### Component Overview
The Captain Login page allows registered captains to access their driver accounts.

#### State Management
```jsx
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [captainData, setCaptainData] = React.useState({});
```

#### Form Handling Logic
```jsx
const submitHandler = (e) => {
  e.preventDefault();
  setCaptainData({
    email: email,
    password: password,
  });
  
  // Reset form fields
  setEmail('');
  setPassword('');
};
```

#### Key UI Elements
- Uber driver logo in top right corner
- Email input field with validation
- Password input with secure field
- "Login" button for authentication
- "Register as a Captain!" link for new drivers
- "Sign in as User!" button for passenger login

#### Navigation
- Redirects to captain signup page via "Register as a Captain!" link
- Redirects to user login page via "Sign in as User!" button

---

## 3. Context API Implementation

**File:** `userContext.jsx`

### Context Setup
```jsx
import React, { createContext } from 'react';
export const UserDataContext = createContext();

const UserContext = ({children}) => {
  const [user, setUser] = React.useState({
    FullName:{
      firstName:'',
      lastName:''
    },
    email:'',
    password:'',
  });
  
  return (
    <UserDataContext.Provider value={[user, setUser]}>
      {children}
    </UserDataContext.Provider>
  );
}
```

### Context Integration
The Context API is implemented to manage global user state across the application, making user data accessible to all components without prop drilling. The context is set up in main.jsx to wrap the entire application:

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext>
  </StrictMode>,
)
```

This allows any component to access and update user information using the `useContext` hook, enabling seamless data sharing between different pages and components.

Similar code found with 1 license type