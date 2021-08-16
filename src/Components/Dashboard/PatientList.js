import React, { useEffect } from 'react'
import firebase from '../utils/firebase'
import TableComponent from "../Common/tableComponent";
import styled from 'styled-components';

const TableContainer = styled.div`
    padding-left: 40px;
`

export default function PatientList() {
  const [patients, setPatients] = React.useState([1, 2])
  useEffect(() => {
    getDataForList();
  }, []);
  const getDataForList = () => {
      const userRef = firebase.database().ref("Patients");
      userRef.on("value", async (snapshot) => {
        const users = snapshot.val();
        const userArray = [];
        for (let id in users) {
          userArray.push(users[id])
        }
        await setPatients(userArray)
      })
  }
  return (
    <TableContainer>
      <TableComponent.Table cellpadding="0" cellspacing="0">
        <TableComponent.TableHead style={{ background: "#0C6361" }}>
          <TableComponent.HeadColumn>Name</TableComponent.HeadColumn>
          <TableComponent.HeadColumn>Room</TableComponent.HeadColumn>
          <TableComponent.HeadColumn>Advance</TableComponent.HeadColumn>
          <TableComponent.HeadColumn>File No</TableComponent.HeadColumn>
        </TableComponent.TableHead>
        <TableComponent.TableBody>
          {patients.map((patient) => (
            <TableComponent.BodyRow>
              <TableComponent.BodyColumn >{patient.name}</TableComponent.BodyColumn>
              <TableComponent.BodyColumn >{patient.room}</TableComponent.BodyColumn>
              <TableComponent.BodyColumn >{patient.advance}</TableComponent.BodyColumn>
              <TableComponent.BodyColumn >{patient.fileNo}</TableComponent.BodyColumn>
            </TableComponent.BodyRow>
          ))}
        </TableComponent.TableBody>
      </TableComponent.Table>


    </TableContainer>
  )
}
