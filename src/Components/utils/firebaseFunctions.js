import firebase from "./firebase";

export default {
    getOneData,
    getData
}

function getOneData(db,order, id){
    let selectedId = "";
    let data =  "";
    const userRef = firebase.database().ref(db);
    var userQuery = userRef.orderByChild(order).equalTo(id);
    userQuery.once("value", function (snapshot) {
        selectedId = Object.keys(snapshot.val())
        snapshot.forEach(function (child) {
            data = child.val()
        });
    });
    const response = {
        selectedId,data
    }
    return response
}

async function getData(db){
    const doctorRef = await firebase.database().ref(db);
    const doctorList = [];
    await doctorRef.on('value', (snap) => {
        const doctorData = snap.val();
        for (let id in doctorData) {
            doctorList.push({ id, ...doctorData[id] })
        }
    });
    return doctorList
}