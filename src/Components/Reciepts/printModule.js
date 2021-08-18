import React from "react";
import ReactToPrint from "react-to-print";
import styled from 'styled-components'
import Receipt from './IPDReciept'

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
    return (
        <>
        <Receipt/>
        </>
    )
}

}

class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlexContainer>
                <ComponentToPrint ref={(el) => (this.componentRef = el)} />
                <ReactToPrint
                    trigger={() => <ButtonPrint>Print</ButtonPrint>}
                    content={() => this.componentRef}
                />
            </FlexContainer>
        );
    }
}

export default Example;
