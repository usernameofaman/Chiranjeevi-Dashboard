import React from 'react'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const Paper = styled.div`
    padding:10px;
    display: flex;
    height: 6.7in;
    width: 17in;
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
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
    font-size:18px;
    margin-top: 25px;
    

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




function IPDReciept() {

    return (
        <>
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
                                    <b>TI : 250544, 251280</b>
                                </Typography>
                                
                            </TextHolder>
                        </LogoAndHeading>
                    </Section>
                    <HorizontalLine />
                    <HeaderInput s> 
                        <TextField  name="text" type="text" size="small" label="No." variant="outlined"/>
                        <TextField  style={{marginRight:"4%"}} name="text" type="text" size="small" label="Date" variant="outlined"/>
                    </HeaderInput>
                   
                    
                    <HeaderInput>

                    <input placeholder="Received with thanks from Mr." style={{borderRadius:"10px", padding:"10px", width:"50%", height:"40px", fontSize:"20px"}}name="text" type="text" variant="outlined" label="Received with thanks " />
                    <input placeholder="The sum of Rupess" style={{borderRadius:"10px",padding:"10px",width:"30%", height:"40px", fontSize:"20px", marginRight:"15%"}}name="text" type="text" variant="outlined" label="Received with thanks " />
                    </HeaderInput>
                    <HeaderInput>
                    <input placeholder="For Hospitalijation/Pathological Investigations/OPD/X-Reay/ECG/Other" style={{borderRadius:"10px",padding:"10px",width:"675px", height:"40px", fontSize:"20px"}}name="text" type="text" variant="outlined" label="Received with thanks " />
                    <input placeholder="Cheque No." style={{borderRadius:"10px",padding:"10px",width:"375px", height:"40px", fontSize:"20px"}}name="text" type="text" variant="outlined" label="Received with thanks " />
                    <input placeholder="Cheque No." style={{borderRadius:"10px",padding:"10px",width:"275px", height:"40px", fontSize:"20px", marginRight:"100px"}}name="text" type="text" variant="outlined" label="Received with thanks " />
                    </HeaderInput>
                    <HeaderInput>
                    <input placeholder="RS" style={{borderRadius:"10px",padding:"10px", width:"375px", height:"40px", fontSize:"20px", border:"2px solid"}}name="text" type="text" variant="outlined" label="Received with thanks " />
                    <Typography style={{marginRight:"10%", fontSize:"25px"}}>For Cheeranjeevi</Typography>
                    </HeaderInput>

                </Form>
            </Paper>

        </>
    )
}
export default IPDReciept;
