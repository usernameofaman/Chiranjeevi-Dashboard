import firebase from "./firebase";
import Toast from '../Common/snackbar'

export default {
    getOneData,
    getData,
    increaseSerial,
    inWords,
    toTitleCase,
    increaseFileNo
}

function getOneData(db, order, id) {
    let parsedId = parseInt(id)
    let selectedId = "";
    let data = "";
    const userRef = firebase.database().ref(db);
    var userQuery = userRef.orderByChild(order).equalTo(parsedId);
    userQuery.once("value", function (snapshot) {
        if (snapshot.val()) { selectedId = Object.keys(snapshot.val()); }
        snapshot.forEach(function (child) {
            data = child.val()
            console.log(child.val())
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

// var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
// var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

// function inWords(num) {
//     if ((num = num.toString()).length > 9) return 'overflow';
//     let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
//     if (!n) return; var str = '';
//     str += (n[1] !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
//     str += (n[2] !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
//     str += (n[3] !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
//     str += (n[4] !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
//     str += (n[5] !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
//     return str;
// }

function inWords(price) {
    var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
      dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
      tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
      handle_tens = function(dgt, prevDgt) {
        return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
      },
      handle_utlc = function(dgt, nxtDgt, denom) {
        return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
      };
  
    var str = "",
      digitIdx = 0,
      digit = 0,
      nxtDigit = 0,
      words = [];
    if (price += "", isNaN(parseInt(price))) str = "";
    else if (parseInt(price) > 0 && price.length <= 10) {
      for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ""));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, "Thousand"));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, "Lakh"));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, "Crore"));
          break;
        case 8:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 9:
          words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
      }
      str = words.reverse().join("")
    } else str = "";
    return str
  
  }
  

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

async function increaseSerial() {
    let serialRef = await firebase.database().ref("Utilities");
    let serialNo;
    await serialRef.on('value', (snap) => {
        const serialData = snap.val();
        for (let id in serialData) {
            serialNo = serialData[id].serialNo;
        }
    });

    serialRef = firebase.database().ref("Utilities").child("-MhbovXK-FVTfe87HBlh");
    const newSerial = {
        serialNo: serialNo + 1,
    }
    await serialRef.update(newSerial).then(() => {
        Toast.apiSuccessToast("SerialNo Updated")
    }).catch(() => {
        Toast.apiFailureToast("Server Error")
    })
}
async function increaseFileNo() {
    let serialRef = await firebase.database().ref("Utilities");
    let serialNo;
    await serialRef.on('value', (snap) => {
        const serialData = snap.val();
        for (let id in serialData) {
            serialNo = serialData[id].fileNo;
        }
    });

    serialRef = firebase.database().ref("Utilities").child("-MhbovXK-FVTfe87HBlh");
    const newSerial = {
        fileNo: serialNo + 1,
    }
    await serialRef.update(newSerial).then(() => {
        Toast.apiSuccessToast("SerialNo Updated")
    }).catch(() => {
        Toast.apiFailureToast("Server Error")
    })
}