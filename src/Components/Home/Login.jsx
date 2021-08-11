import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import Loader from '../Common/loader'
import firebase from '../utils/firebase'
import { history } from "../utils/history";

const useStyles = makeStyles((theme) => ({
  login: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    height: '200px'
  },
  btn: {
    width: '100%',
  }
}));

const Container = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Login() {
  const classes = useStyles();
  const [dbUsers, setDbUsers] = React.useState(0)
  const [user, setUser] = React.useState({
    username: "",
    password: ""
  })
  const takingUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }
  useEffect(() => {
    getDataForLogin();
  });
  const getDataForLogin = () => {
    if (dbUsers === 0) {
      const userRef = firebase.database().ref("User");
      userRef.on("value", async (snapshot) => {
        const users = snapshot.val();
        const userArray = [];
        for (let id in users) {
          userArray.push(users[id])
        }
        await setDbUsers(userArray)
      })
    }
  }

  const CreateUser = () => {
    console.log(dbUsers)
    if (user.username === dbUsers[0].username && user.password === dbUsers[0].password) {
      history.push("/Dashboard")
    }
  }

  return (
    <Container>
      {/* <Loader/> */}
      <form className={classes.login} noValidate autoComplete="off">
        <TextField onChange={takingUserInput} name="username" id="outlined-basic" label="Username" variant="outlined" />
        <TextField onChange={takingUserInput} name="password" id="outlined-basic" type="password" label="Password" variant="outlined" />
        <Button onClick={CreateUser} className={classes.btn} variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
}
