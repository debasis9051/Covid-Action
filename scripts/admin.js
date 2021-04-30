var firebaseConfig = {
    apiKey: "AIzaSyAlKXFgSrn4SYecGI8xXO3ZdsD-JcnnELQ",
    authDomain: "covid-action-2021.firebaseapp.com",
    databaseURL: "https://covid-action-2021-default-rtdb.firebaseio.com",
    projectId: "covid-action-2021",
    storageBucket: "covid-action-2021.appspot.com",
    messagingSenderId: "625663046445",
    appId: "1:625663046445:web:2e7ada6f91b29f4261d9a4",
    measurementId: "G-F3GTRYTY12"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  //   var studentsDB= firebase.database().ref(`Oxygen/Vendors`);
//   studentsDB.child(Date.now()).set({
//       HospitalName: "Medica",
//       ContactName: "Hritwick",
//       Contact: 6289608042,
//       Address: "ruby",
//       Rate: 900,
//       Type: "can refill",
//       Available: "yes",
//       TRtime: "31/04/21",
//       Verification: "Yes 31/04/21 @3pm",
//       Comments: "Visit directly incase they don't pick up call"
//     })






document.querySelector(".dataSubmit").addEventListener("click",()=>{

    let hospital =document.querySelector("#HospitalName").value
let contactName=document.querySelector("#ContactName").value
let contact=document.querySelector("#Contact").value
let address=document.querySelector("#Address").value
let rate=document.querySelector("#Rate").value
let type=document.querySelector("#Type").value
let available=document.querySelector("#Available").value
let trTime=document.querySelector("#TRtime").value
let verify=document.querySelector("#Verification").value
let comments =document.querySelector("#Comments").value
// console.log("click")

//     console.log(hospital,contactName,contact)


           var studentsDB= firebase.database().ref(`Oxygen/Vendors`);
  studentsDB.child(Date.now()).set({
      HospitalName: hospital,
      ContactName: contactName,
      Contact: contact,
      Address: address,
      Rate: rate,
      Type: type,
      Available: available,
      TRtime: trTime,
      Verification: verify,
      Comments: comments
    }).then(()=>{
        console.log("Data Uploaded")
    }) 

})