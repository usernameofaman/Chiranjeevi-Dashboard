import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import firebase from '../utils/firebase'
import { history } from "../utils/history";
import { login } from '../../utils';
import Toast from '../Common/snackbar'

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
    width: "100%",
    background: "#0C6361",
    '&:hover': {
      backgroundColor: '#0C6361',
      boxShadow: 'none',
    },


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
    // console.log(user)
  }
  useEffect(() => {
    getDataForLogin();
  });
  const getDataForLogin = () => {

  }
  const SignUp = () => {
    // return
    const inventoryRef = firebase.database().ref("Users");
    const UserData = {
      name: user.username,
      password: user.password,
    };
    console.log(UserData)
    inventoryRef.push(UserData).then(() => {
      Toast.apiSuccessToast("User Added")
    }).catch(() => {
      Toast.apiFailureToast("Server Error")
    });
  }

  const UserLogin = async () => {
    let checkUser;
    const userRef = await firebase.database().ref("Users");
    var userQuery = await userRef.orderByChild("name").equalTo(user.username);
    await userQuery.once("value", function (snapshot) {
      snapshot.forEach(function (child) {
        checkUser = child.val()
        console.log(child.val())
      });
    });
    console.log(checkUser, user)
    if (checkUser && checkUser.password === user.password) {
      login()
      Toast.apiSuccessToast("Login Success")
      history.push("/Dashboard")
    } else {
      Toast.apiFailureToast("Password Error")
    }
  }

  return (
    <Container>
      {/* <Loader/> */}
      <form className={classes.login} noValidate autoComplete="off">
        <TextField onChange={takingUserInput} name="username" label="Username" variant="outlined" />
        <TextField onChange={takingUserInput} name="password" type="password" label="Password" variant="outlined" />
        <Button onClick={UserLogin} className={classes.btn} variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
}
