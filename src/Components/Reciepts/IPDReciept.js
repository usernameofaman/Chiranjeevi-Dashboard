import React, { useEffect } from 'react'
import firebase from '../utils/firebase'
import TableComponent from "../Common/tableComponent";
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        height:"520px",
        minWidth: 320,
        marginTop: "25px"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Container = styled.div`
    justify-content: center;
    align-items: center;
    padding:10px 10px 10px 10px;
    display: flex;
    flex-direction: column;
`
const TableContainer = styled.div`
    padding-left: 40px;
`

function IPDReciept() {
    const classes = useStyles();

    return (
        <>
            <Typography style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "25px", fontFamily: "'Source Sans Pro', sans-serif", fontSize: "35px", fontWeight: "600" }}>IPD Discharge Bill</Typography>
            
            <Container>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Bill
                    </Typography>

                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
            </Container>

        </>
    )
}
export default IPDReciept;
