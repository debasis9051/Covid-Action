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
// var firebaseConfig = {
//     apiKey: "AIzaSyB65Gi_g6KxftPytbB7xkN5rYGtzpNmF78",
//     authDomain: "book-inventory-7a96c.firebaseapp.com",
//     databaseURL: "https://book-inventory-7a96c.firebaseio.com",
//     projectId: "book-inventory-7a96c",
//     storageBucket: "book-inventory-7a96c.appspot.com",
//     messagingSenderId: "987737645849",
//     appId: "1:987737645849:web:80f03e213e0028d40f1b88",
//   };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  let category
  let currentCatData
  let currentCatFieldId
  let mapArr = {"Oxygen" :[{"Organization" : ["Name of Organization/Dealer","text"],
                            "Address" : ["Address/Area","text"],
                            "Contact" : ["Contact number of Organization/Dealer","number"],
                            "Description" : ["Description","text"],
                            "Verification" : ["Latest Verification","datetime-local"]},
                            "Oxygen/Vendors"],
                "Plasma" :[{"Organization" : ["Name of Organization/Dealer","text"],
                            "Address" : ["Address/Area","text"],
                            "Contact" : ["Contact number of Organization/Dealer","number"],
                            "Description" : ["Description","text"],
                            "Verification" : ["Latest Verification","datetime-local"]},
                            "Plasma/Vendors"], 
                "Blood" : [{"Organization" : ["Name of Organization/Dealer","text"],
                            "Address" : ["Address/Area","text"],
                            "Contact" : ["Contact number of Organization/Dealer","number"],
                            "Description" : ["Description","text"],
                            "Verification" : ["Latest Verification","datetime-local"]},
                            "Blood/Vendors"], 
                "Hospital" :[{  "Organization" : ["Name of Organization/Dealer","text"],
                                "Address" : ["Address/Area","text"],
                                "Contact" : ["Contact number of Organization/Dealer","number"],
                                "Beds" : ["Availabilty of Beds","text"],
                                "Description" : ["Description","text"],
                                "Verification" : ["Latest Verification","datetime-local"]},
                                "Hospital/Vendors"], 
                "Telephonic Doctor Consultation" :[{"Doctor" : ["Name of Doctor","text"],
                                                    "Contact" : ["Doctor's Number","number"],
                                                    "Availability" : ["Availability","text"],
                                                    "Description" : ["Description","text"],
                                                    "Verification" : ["Latest Verification","datetime-local"]},
                                                    "Doctor/Vendors"],
                "Food Service" : [{ "Organization" : ["Name of Organization/Dealer","text"],
                                    "Address" : ["Address/Area","text"],
                                    "Contact" : ["Contact number of Organization/Dealer","number"],
                                    "Rate" : ["Rate","text"],
                                    "Type" : ["Type of Food","text"],
                                    "Description" : ["Description","text"],
                                    "Verification" : ["Latest Verification","datetime-local"]},
                                    "Food/Vendors"],
                }

function dataSubmit()
{
    let tempObj = {}
    for(let i=0;i<currentCatFieldId.length;i++)
        tempObj[currentCatFieldId[i]] = document.querySelector(`#${currentCatFieldId[i]}`).value.trim()

    if(checkInputs(tempObj))
    {
        let timeStamp = Date.now()
        switch(category)
        {
            case "Oxygen" :
            case "Plasma" :
            case "Blood" :
            case "Hospital" :
            case "Food Service" :
            case "Telephonic Doctor Consultation" : tempObj["Counter"] = 1
                                                    tempObj["Status"] = "Working"                                                        
                                                    tempObj["id"] = timeStamp
                                                    break
            default: console.log("error")
        }

        let vendorsDB= firebase.database().ref(mapArr[category][1]);
        let p = vendorsDB.child(timeStamp).set(tempObj)
        p.then(()=>{console.log("Data Uploaded")})
        p.catch(()=>{console.log("Data Upload Error")})
    }
}


function checkInputs(inputObj)
{
    let myCheck = true
    let tempList = Object.keys(inputObj) 
    for(let i=0;i<tempList.length;i++)
    {
        if(inputObj[tempList[i]]=="")
        {
            myCheck = false
            break
        }
    }

    if(myCheck)
    {
        firebase.analytics().logEvent(`LeadsGivingSuccess-${category}`, {
            userClickedCategory: category,
            leadsGive : "Data Uploaded",
            Page : "Give leads"
        });
        gtag('event', `LeadsGivingSuccess-${category}`, {
        userClickedCategory: category,
        leadsGive : "Data Uploaded",
        Page : "Give leads"
        });

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
    else 
    {   
        
        firebase.analytics().logEvent(`LeadsGivingError-${category}`, {
            userClickedCategory: category,
            leadsGive : "error Uploading! User End",
            Page : "Give leads"
        });
        gtag('event', `LeadsGivingError-${category}`, {
        userClickedCategory: category,
        leadsGive : "error Uploading! User End",
        Page : "Give leads"
        });

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

document.querySelector("#Category").addEventListener("change",(e)=>{
    let fieldsBody = ""
    category = e.target.value
    
    if(category!="Select Category..")
    {
        document.querySelector("#leadSubmit").classList.remove("d-none")

        currentCatData = mapArr[category][0]
        currentCatFieldId = Object.keys(currentCatData)
        let j=0

        for(let i=0;i<parseInt(currentCatFieldId.length/2);i++)       
        {
            let tr = `  <div class="form-row mt-3 ml-3 mr-3">
                            <div class="col-md-2"></div>
                            <div class="form-group col-md-4">
                                <label for="${currentCatFieldId[j]}">${currentCatData[currentCatFieldId[j]][0]}</label>
                                <input type="${currentCatData[currentCatFieldId[j]][1]}" class="form-control" id="${currentCatFieldId[j]}">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="${currentCatFieldId[j+1]}">${currentCatData[currentCatFieldId[j+1]][0]}</label>
                                <input type="${currentCatData[currentCatFieldId[j+1]][1]}" class="form-control" id="${currentCatFieldId[j+1]}">
                            </div>
                            <div class="col-md-2"></div>
                        </div>`
            j+=2
            fieldsBody += tr
        }
        
        if(j==currentCatFieldId.length-1)
        {
            let tr = `  <div class="form-row mt-3 ml-3 mr-3">
                            <div class="col-md-2"></div>
                            <div class="form-group col-md-4">
                                <label for="${currentCatFieldId[j]}">${currentCatData[currentCatFieldId[j]][0]}</label>
                                <input type="${currentCatData[currentCatFieldId[j]][1]}" class="form-control" id="${currentCatFieldId[j]}">
                            </div>
                            <div class="col-md-6"></div>
                        </div>`
            fieldsBody += tr
        }
    }
    else
    {
        document.querySelector("#leadSubmit").classList.add("d-none")      
    }

    document.querySelector("#Fields").innerHTML = fieldsBody
})

function startGiveLead()
{
    let list = Object.keys(mapArr)
    document.querySelector("#Category").innerHTML = `<option>Select Category..</option>`
    for(let i=0;i<list.length;i++)
    {
        document.querySelector("#Category").innerHTML += `<option>${list[i]}</option>`
    }
}

startGiveLead()