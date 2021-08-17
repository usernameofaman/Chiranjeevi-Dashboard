import React from "react";
import ReactToPrint from "react-to-print";
import styled from 'styled-components'
import Discharge from './dischargePreview'

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
    }
render(){
    return (
        <>
        <Discharge fileNo={this.props.fileNo}/>
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
                <ReactToPrint
                    trigger={() => <button style={{ marginBottom: "30px" }}>Print this out!</button>}
                    content={() => this.componentRef}
                />
                <ComponentToPrint ref={(el) => (this.componentRef = el)} fileNo={this.props.fileNo} />
            </FlexContainer>
        );
    }
}

export default Example;
