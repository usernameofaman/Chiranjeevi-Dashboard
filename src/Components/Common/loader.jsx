import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(0),
    },
  },
}));

const LoaderContainer = styled.div`
  position: absolute;
`

export default function CircularIndeterminate(props) {
  const classes = useStyles();
  let left = props.left;
  let top = props.top

  return (
    <LoaderContainer style={{
      marginLeft:left,
      marginTop:top
    }}>
      <CircularProgress />
    </LoaderContainer>
  );
}
