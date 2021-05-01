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

document.querySelector(".dataSubmit").addEventListener("click",()=>{
    let hospital =document.querySelector("#Organization").value
    let contact=document.querySelector("#Contact").value
    let description=document.querySelector("#Description").value
    let address=document.querySelector("#Address").value
    let verification=document.querySelector("#Verification").value
    let category=document.querySelector("#category").value
    
    if(checkInputs(hospital,contact,description,address,verification,category))
    {
        let mapArr = {"Oxygen": "Oxygen/Vendors", "Blood": "Blood/Vendors", "Plasma": "Plasma/Vendors", "Hospital": "Hospital/Vendors"}
        var studentsDB= firebase.database().ref(mapArr[category]);
        studentsDB.child(Date.now()).set({
            Organization: hospital,
            Contact: contact,
            Description: description,
            Address: address,
            Verification: verification,
            Counter: 1,
            Status: "Working"
        }).then(()=>{
            console.log("Data Uploaded")
        })
    }
})


function checkInputs(hospital,contact,description,address,verification,category)
{
    if(hospital && contact && description && address && verification && category!="Select Category..")
    {       
        console.log("True")
        let error=document.querySelector(".error");
        error.classList.toggle("alert-success",true)
        error.style.display="block"
        document.querySelector(".errorText").innerHTML="Data Uploaded to Crowd Sourcing Database"
        setTimeout(()=>{
            document.querySelector(".error").style.display="none"
            error.classList.toggle("alert-success",false)}
        ,8000)
        return true
    }
    else {
        console.log("False")
        let error=document.querySelector(".error");
        error.classList.toggle("alert-danger",true)
        error.style.display="block"
        document.querySelector(".errorText").innerHTML="Please enter data in all fields"
        setTimeout(()=>{
            document.querySelector(".error").style.display="none"
            error.classList.toggle("alert-danger",false)}
        ,8000)
        return false
    }
}