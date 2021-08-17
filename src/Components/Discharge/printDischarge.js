import React from "react";
import ReactToPrint from "react-to-print";
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const Paper = styled.div`
    padding:10px;
    display: flex;
    height: 11.7in;
    width: 8.3in;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const LogoAndHeading = styled.div`
    display: flex;
    width: 100%;
`

const LogoHolder = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    margin: 15px 0px 10px 0px;
`
const TextHolder = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`
const HeaderInput = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
    font-size:18px;

`
const Logo = styled.img`
    width: 70px;
    height: 80px;
    `
const Form = styled.div`
width: 100%;
justify-content: center;
flex-direction: column;
border: 2px solid #000000;
margin-top: -2px;
`
const Field = styled.div`
    font-weight: 600;
    padding: 0px 30px 0px 30px;
    margin: 0px 20px 0px 20px;
    border-bottom: 1px dotted black;
`
const HorizontalLine = styled.div`
    width: 100%;
    height: 2px;
    background-color: black;
    margin-top: 10px;
`
const TextSection = styled.div`
    padding: 45px;
    width : 40%;
   
`
const BillText = styled.div`
height: 30px;
border:1px solid black;
 width:100%;
 margin-top:-1px;
display: flex;
justify-content: center;
align-items: center;   
`



class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const balance = 800;
        const itemList = [
            {
            name:"Reg", 
            amount:800
            },
            {
            name:"Room/GW", 
            amount:800
            },
            {
            name:"Doctor", 
            amount:800
            },
            {
            name:"Dr. Visit", 
            amount:800
            },
            {
            name:"Nursing", 
            amount:800
            },
            {
            name:"Sugar", 
            amount:800
            },
            {
            name:"ECG", 
            amount:800
            },
            {
            name:"X-Ray", 
            amount:800
            },
            {
            name:"Nebo", 
            amount:800
            },
            {
            name:"Suction", 
            amount:800
            },
            {
            name:"O2", 
            amount:800
            },
            {
            name:"Cardiac Monitor", 
            amount:800
            },
            {
            name:"Dressing", 
            amount:800
            },
            {
            name:"Blood Transfusion", 
            amount:800
            },
            {
            name:"R/T Feeding ", 
            amount:800
            },
            {
            name:"Cathetrization ", 
            amount:800
            },
            {
            name:"Enema ", 
            amount:800
            },
            {
            name:"Others ", 
            amount:800
            },
            {
            name:"Lab Investigation ", 
            amount:800
            },
            


        ]
        return (
            <Paper>
                <Form>
                    <Section>
                        <LogoAndHeading>
                            <LogoHolder>
                                <Logo src="/Images/Discharge.png" />
                            </LogoHolder>
                            <TextHolder>
                                <Typography variant="h3">
                                    <b>CHIRANJEEVI HOSPITAL</b>
                                </Typography>
                                <Typography variant="h6">
                                    <b>Virat Sagar Parisar,Oppo. SATI College, NH-86,Vidisha (M.P.)</b><br />
                                    <b>TI : 250544, 251280</b>
                                </Typography>
                            </TextHolder>
                        </LogoAndHeading>
                        <HeaderInput>
                            <div style={{ display: 'flex' }}>Reg. No : <Field>1509</Field></div>
                            <div style={{ display: 'flex' }}>Ward: <Field>17 No</Field> </div>
                            <div style={{ display: 'flex' }}>Pt name: <Field>Aman Sharma</Field></div>
                        </HeaderInput>
                        <HeaderInput>
                            <div style={{ display: 'flex' }}>Date of Admission : <Field>15/12/2019</Field></div>
                            <div style={{ display: 'flex' }}>Date of Discharge<Field>20/12/2019</Field></div>
                        </HeaderInput>
                    </Section>
                    <HorizontalLine />
                    <div style={{ display: "flex", height: "700px" }}>
                        <Section  >
                            
                            <TextSection >
                            {itemList.map((item)=> (
                                <Typography   >{item.name}</Typography>
                            ))}

                             
                            </TextSection>

                        </Section>
                        <Section>
                            <TextSection  >
                            {itemList.map((item)=> (
                                <Typography   >{item.amount}</Typography>
                            ))}

                           
                            </TextSection>

                        </Section>
                    </div>
                    <HorizontalLine />
                    <div style={{ display: "flex", width: "50%", justifyContent: "flex-start", padding: "50px" }} >
                        <TextSection style={{ padding: "0px" }}>

                            < BillText >Total</ BillText>
                            < BillText >Less</ BillText>
                            < BillText >Paid</ BillText>
                        </TextSection>
                        <TextSection style={{ padding: "0px" ,  marginLeft: "1px"}}>

                            < BillText >2000</ BillText>
                            < BillText >1000</ BillText>
                            < BillText >500</ BillText>
                        </TextSection>
                    </div>


                </Form>
            </Paper>
        );
    }
}

class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <FlexContainer>
                <ReactToPrint
                    trigger={() => <button style={{ marginBottom: "30px" }}>Print this out!</button>}
                    content={() => this.componentRef}
                />
                <ComponentToPrint ref={(el) => (this.componentRef = el)} props={this.props} />
            </FlexContainer>
        );
    }
}

export default Example;
