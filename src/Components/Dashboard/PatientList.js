import React, { useEffect } from 'react'
import firebase from '../utils/firebase'
import TableComponent from "../Common/tableComponent";
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import Receipt from '../Reciepts/printModule'
import Discharge from '../Discharge/Discharge'
import { Streetview } from '@material-ui/icons';

const TableContainer = styled.div`
    padding-left: 40px;
`

export default function PatientList(props) {
  const [patients, setPatients] = React.useState([1, 2])
  const [patientsOPD, setPatientsOPD] = React.useState([1, 2])
  useEffect(() => {
    getDataForList();
  }, []);
  const getDataForList = () => {
    const userRef = firebase.database().ref("ActivePatients");
    userRef.on("value", async (snapshot) => {
      const users = snapshot.val();
      const userArrayIPD = [];
      const userArrayOPD = [];
      for (let id in users) {
        if (users[id].type === "IPD") {
          users[id].id = id;
          userArrayIPD.push(users[id])
        }
        if (users[id].type === "OPD") {
          users[id].id = id;
          userArrayOPD.push(users[id])
        }
      }
      await setPatients(userArrayIPD)
      await setPatientsOPD(userArrayOPD)
      console.log(userArrayIPD)
    })
  }

  const [view, setView] = React.useState(0);
  const [selectedPatient, setSelectedPatient] = React.useState("");
  const backToDashboard = () => {
    setView(0)
  }
  const printReceipt = (patient) => {
    setSelectedPatient(patient);
    setView(1);
  }
  const dischargePatient = (patient) => {
    setSelectedPatient(patient);
    setView(2);
  }
  return (
    <>
      {view === 0 &&
        <>
        {!props.OPDOnly &&
          <TableContainer>
            <TableComponent.Table cellpadding="0" cellspacing="0">
              <TableComponent.TableHead style={{ background: "#0C6361" }}>
                <TableComponent.HeadColumn>Name</TableComponent.HeadColumn>
                <TableComponent.HeadColumn>Ward</TableComponent.HeadColumn>
                <TableComponent.HeadColumn>Advance</TableComponent.HeadColumn>
                <TableComponent.HeadColumn>File No</TableComponent.HeadColumn>
                <TableComponent.HeadColumn>Receipt</TableComponent.HeadColumn>
                <TableComponent.HeadColumn>Status</TableComponent.HeadColumn>
              </TableComponent.TableHead>
              <TableComponent.TableBody>
                {patients.map((patient) => (
                  <TableComponent.BodyRow>
                    <TableComponent.BodyColumn >{patient.name}</TableComponent.BodyColumn>
                    <TableComponent.BodyColumn >{patient.ward}</TableComponent.BodyColumn>
                    <TableComponent.BodyColumn >{patient.advance}</TableComponent.BodyColumn>
                    <TableComponent.BodyColumn >{patient.fileNo}</TableComponent.BodyColumn>
                    <TableComponent.BodyColumn onClick={() => printReceipt(patient)} ><Button style={{ background: "#0c6361", color: "white" }}>Receipt</Button></TableComponent.BodyColumn>
                    <TableComponent.BodyColumn onClick={() => dischargePatient(patient)}><Button style={{ background: "#0c6361", color: "white" }}>Discharge</Button></TableComponent.BodyColumn>
                  </TableComponent.BodyRow>
                ))}
              </TableComponent.TableBody>
            </TableComponent.Table>
          </TableContainer>}
          <TableContainer>
            <TableComponent.Table cellpadding="0" cellspacing="0">
              <TableComponent.TableHead style={{ background: "#0C6361" }}>
                <TableComponent.HeadColumn>Name</TableComponent.HeadColumn>
                <TableComponent.HeadColumn>Consult Doctor</TableComponent.HeadColumn>
                <TableComponent.HeadColumn>Amount</TableComponent.HeadColumn>
                <TableComponent.HeadColumn>Status</TableComponent.HeadColumn>
              </TableComponent.TableHead>
              <TableComponent.TableBody>
                {patientsOPD.map((patient) => (
                  <TableComponent.BodyRow>
                    <TableComponent.BodyColumn >{patient.name}</TableComponent.BodyColumn>
                    <TableComponent.BodyColumn >{patient.doctor}</TableComponent.BodyColumn>
                    <TableComponent.BodyColumn >{patient.amount}</TableComponent.BodyColumn>
                    <TableComponent.BodyColumn onClick={() => printReceipt(patient)} ><Button style={{ background: "#0c6361", color: "white" }}>Settle</Button></TableComponent.BodyColumn>
                  </TableComponent.BodyRow>
                ))}
              </TableComponent.TableBody>
            </TableComponent.Table>
          </TableContainer>
        </>}
      {view === 1 &&
        <Receipt mode="OPD" patient={selectedPatient} backToDashboard={backToDashboard}/>}
      {view === 2 &&
        <Discharge mode="OPD" patient={selectedPatient} backToDashboard={backToDashboard}/>}
    </>
  )
}
