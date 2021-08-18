import firebase from "./firebase";

export default {
    getOneData,
    getData,
    inWords,
    toTitleCase
}

function getOneData(db, order, id) {
    let selectedId = "";
    let data = "";
    const userRef = firebase.database().ref(db);
    var userQuery = userRef.orderByChild(order).equalTo(id);
    userQuery.once("value", function (snapshot) {
        if (snapshot.val()) {selectedId = Object.keys(snapshot.val());}
        snapshot.forEach(function (child) {
            data = child.val()
        });
    });
    return {
        selectedId, data
    }
}

async function getData(db) {
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

var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}