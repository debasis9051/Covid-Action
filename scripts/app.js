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

  let cate
  let vendorsDB
  function displayData(category)
  {
    cate = category
    let pt = firebase.database().ref(category).get(`Vendors`)
    pt.then((value)=>{value.forEach((values)=>{
        vendorsDB=values.val()
        let tb=``
        for(let i=0;i<Object.keys(vendorsDB).length;i++)
        {
            let currentData = vendorsDB[Object.keys(vendorsDB)[i]];
            // console.log(currentData)
            let tr= `<tr>
                        <td>${currentData.Organization}</td>
                        <td>${currentData.Contact}</td>
                        <td>${currentData.Address}</td>
                        <td>${currentData.Verification.replace("T"," @")}</td>
                        <td>${currentData.Description}</td>
                        <td>${currentData.Status}</td>
                        <td>${currentData.Counter}</td>
                        <td>
                            <button class="btn btn-success" onclick="leadVerification(${Object.keys(vendorsDB)[i]})">Verify our Lead</button>
                            <a class="btn btn-primary" href="tel:${currentData.Contact}">Call</a>
                        </td>
                    </tr>`
            tb+=tr
        }
        document.getElementById("tableBody").innerHTML = tb
    })})
  }

  function leadVerification(key)
  {
    document.querySelector(".modal").style.display = "block"
    document.querySelector(".modal-title").innerHTML = `Verified on ${vendorsDB[key].Verification.replace("T"," @")}`
    document.querySelector(".modal-body").innerHTML = ` <h4>Current Description</h4>
                                                        <p>${vendorsDB[key].Description}</p>
                                                        <h4>Update the description</h4>
                                                        <textarea id="newDescription" style="resize: vertical;"></textarea>`
    document.querySelector(".modal-footer").innerHTML = `   <button type="button" class="btn btn-outline-success" onclick="modalSubmit(${key},true)">Working</button>
                                                            <button type="button" class="btn btn-outline-danger" onclick="modalSubmit(${key},false)">Not Working</button>`
  }  

  function modalSubmit(key,check)
  {
    document.querySelector(".modal").style.display = "none"
    let ref = firebase.database().ref(`${cate}/Vendors/${key}`)
    let temp
    if(check)
        temp = {"Status": "Working"}
    else
        temp = {"Status": "Not Working"}

    let newDesc = document.querySelector("#newDescription").value.trim()
    if(newDesc)
    {
        temp["Description"] = newDesc
    }
    temp["Counter"] = vendorsDB[key].Counter + 1

    let p = ref.update(temp)
    p.then(()=>location.reload())
    p.catch(()=>console.log("Error uploading from modal"))
  }   

  displayData("Oxygen");


