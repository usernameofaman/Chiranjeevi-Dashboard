import React from 'react'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Container = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding:10px 10px 10px 10px;
    display: flex;
    flex-direction: column;
`

const TelePhone = styled.img`
    width:18px;
    height:18px;
`
const Paper = styled.div`
    padding:10px;
    display: flex;
    height: 5in;
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
    /* margin-top: ; */
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
    padding: 5px 20px 5px 20px;
    font-size:18px;
    margin-top: 10px;

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
margin-top: 2px;
`

const HorizontalLine = styled.div`
    width: 100%;
    height: 2px;
    background-color: black;
    margin-top: 10px;
`
const Value = styled.div`

`



function IPDReciept() {

    return (
        <>
        <Container>
           <Paper>
                <Form>
                    <Section >
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
                                    <b><TelePhone src="/Images/telephone.png"/> : 250544, 251280</b>
                                </Typography>
                                
                            </TextHolder>
                        </LogoAndHeading>
                    </Section>
                    <HorizontalLine />
                    <HeaderInput> 
                        <TextField  name="text" type="text" size="small" label="No." variant="outlined"/>
                        <TextField  style={{marginRight:"4%"}} name="text" type="text" size="small" label="Date" variant="outlined"/>
                    </HeaderInput>
                    <HeaderInput>
                        Received with thanks from Mr <Value>Aman Sharma</Value>
                    </HeaderInput>
                    <HeaderInput>
                    The sum of Rupees <Value> Ten Thousand Four Hundred </Value>
                    </HeaderInput>
                    <HeaderInput>
                        For Hospitalization / Pathalogical Investigation / OPD / X-Ray/ECG Other
                    </HeaderInput>
                    <HeaderInput>
                        Cheque No. <Value> </Value> Dated <Value>  </Value>
                    </HeaderInput>

                </Form>
            </Paper>
            </Container>

        </>
    )
}
export default IPDReciept;
