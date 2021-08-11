import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  white-space: nowrap;
  margin-top: 27px;
  border-spacing: 0 6px;
  padding-right: 20px;
`;
const TableHead = styled.thead`
  background-color: #009fe0;
  // font-weight:600;
`;
const TableBody = styled.tbody`
  width: 100%;
  border-collapse: separate;
  white-space: nowrap;
  border-spacing: 0 10px;
  padding-right: 20px;
`;
const HeadColumn = styled.th`
  padding: 9px 0 9px 15px;
  text-align: left;
  font-size: 18px;
  font-weight: 300;
  width:320px;
  color:#ffffff;
  &:first-child {
  border-radius: 5px 0 0 0;
  }
  &:last-child {
  border-radius: 0 5px 0 0;
  }
`;
const BodyRow = styled.tr`
  background-color: #f7fbfd;
  cursor: pointer;
`;
const BodyColumn = styled.td`
  padding: 20px 0 20px 15px;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  width:320px;
  color:#343434;
   &:first-child {
    border-radius: 0 0 0 0;
   }
   &:last-child {
    border-radius: 0 0 0 0;
   }
 `;
 const BodyColumnRight = styled.td`
  padding: 20px 0 20px 15px;
  text-align: center;
  font-size: 16px;
  // font-weight: 400;
  width:320px;
  color:#343434;
   &:first-child {
    border-radius: 0 0 0 0;
   }
   &:last-child {
    border-radius: 0 0 0 0;
   }
 `;
 const HeadColumnRight = styled.th`
  padding: 9px 0 9px 15px;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  width:320px;
  color:#ffffff;
  &:first-child {
  border-radius: 5px 0 0 0;
  }
  &:last-child {
  border-radius: 0 5px 0 0;
  }
`;
export default {
    Table,
    TableHead,
    TableBody,
    HeadColumn,
    BodyColumn,
    BodyRow,
    BodyColumnRight,
    HeadColumnRight,
}