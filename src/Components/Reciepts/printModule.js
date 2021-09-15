import React from "react";
import ReactToPrint from "react-to-print";
import styled from 'styled-components'
import Receipt from './IPDReciept'
import OPDReceipt from './OPDReciept'

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const ButtonPrint = styled.button`
    width:120px;
    height:50px;
    margin-bottom: 20px;
`

class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
    }
render(){
    //console.log(this.props.mode)
    return (
        <>
        {this.props.mode==="IPD" ?
        <Receipt patient={this.props.patient}/> :
        <OPDReceipt patient={this.props.patient}/>
         }
        </>
    )
}

}

class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //console.log(this.props.patient)
        return (
            <FlexContainer>
                <ReactToPrint
                    trigger={() => <ButtonPrint>Print</ButtonPrint>}
                    content={() => this.componentRef}
                />
                <ComponentToPrint ref={(el) => (this.componentRef = el)} mode={this.props.mode} patient={this.props.patient}/>
            </FlexContainer>
        );
    }
}

export default Example;
