import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components'



const LoaderContainer = styled.div`
  position: absolute;
`

export default function CircularIndeterminate(props) {
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
