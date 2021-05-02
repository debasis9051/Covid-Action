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
  startApp()
  let cate
  let vendorsDB
  function displayData(category)
  {
    cate = category
    firebase.database().ref(category).once("value").then((snapshot)=>{
        if(!snapshot.exists())
            document.getElementById("tableBody").innerHTML = ""
    })
    let pt = firebase.database().ref(category).get(`Vendors`)
    pt.then((value)=>{value.forEach((values)=>{
        vendorsDB=values.val()
        let tb=""
        for(let i=0;i<Object.keys(vendorsDB).length;i++)
        {
            let currentData = vendorsDB[Object.keys(vendorsDB)[i]];
            // console.log(currentData)
            let tr= `<tr>
                        <td>${i+1}</td>
                        <td>${currentData.Organization}</td>
                        <td>${currentData.Contact}</td>
                        <td>${currentData.Address}</td>
                        <td>${currentData.Verification.replace("T"," @")}</td>
                        <td>${currentData.Description}</td>
                        <td>${currentData.Status}</td>
                        <td>${currentData.Counter}</td>
                        <td class="flex1">
                            <button class="btn btn-success verifyLead" onclick="leadVerification(${Object.keys(vendorsDB)[i]})">Verify our Lead</button>
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
    $("#myModal").modal('show')
    document.querySelector(".modal-title").innerHTML = `Last verified on ${vendorsDB[key].Verification.replace("T"," @")}`
    document.querySelector(".modal-body").innerHTML = ` <h4 id="modalNumber">${vendorsDB[key].Contact}<button class="btn btn-light ml-3" onclick="copyToClipboard()"><i class="fa fa-copy fa-lg"></i></button></h4>
                                                        <h4>Current Description</h4>
                                                        <p>${vendorsDB[key].Description}</p>
                                                        <h4>Update the description</h4>
                                                        <textarea id="newDescription" class="text-center" style="resize: vertical;"></textarea>`
    document.querySelector(".modal-footer").innerHTML = `   <button type="button" class="btn btn-outline-success" onclick="modalSubmit(${key},true)">Working</button>
                                                            <button type="button" class="btn btn-outline-danger" onclick="modalSubmit(${key},false)">Not Working</button>`
  }  

  function modalSubmit(key,check)
  {
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

  function copyToClipboard()
  {
    let temp = $("<input>")
    $("body").append(temp)
    temp.val($("#modalNumber").text()).select();
    document.execCommand("copy");
    temp.remove();
  }

  function filterData(filterCategory,filterText)
  {
    if(filterCategory!="Select Category for Filter..")
    {
        let tb=""
        for(let i=0,j=1;i<Object.keys(vendorsDB).length;i++)
        {
            let currentData = vendorsDB[Object.keys(vendorsDB)[i]];
            // console.log(currentData)
            let mapArr = {"Name of the Organization/Dealer" : currentData.Organization.toLowerCase() ,"Address/Area" : currentData.Address.toLowerCase()}

            if(mapArr[filterCategory].search(filterText.toLowerCase()) != -1)
            {
                let tr= `<tr>
                            <td>${j}</td>
                            <td>${currentData.Organization}</td>
                            <td>${currentData.Contact}</td>
                            <td>${currentData.Address}</td>
                            <td>${currentData.Verification.replace("T"," @")}</td>
                            <td>${currentData.Description}</td>
                            <td>${currentData.Status}</td>
                            <td>${currentData.Counter}</td>
                            <td class="flex1">
                                <button class="btn btn-success verifyLead" onclick="leadVerification(${Object.keys(vendorsDB)[i]})">Verify our Lead</button>
                                <a class="btn btn-primary" href="tel:${currentData.Contact}">Call</a>
                            </td>
                        </tr>`
                tb+=tr
                j++
            }
        }
        document.getElementById("tableBody").innerHTML = tb
    }
  }

  function startApp()
  {
    $("#myModal").modal('show')
    document.querySelector(".close").remove();
    document.querySelector("#myModal").classList.add("big12")
    document.querySelector(".modal-content").classList.add("big")
    document.querySelector(".modal-title").innerHTML = `Select Leads Category`
    document.querySelector(".modal-body").innerHTML = `
    <div class="text-center" id="categoriesModal">
      <button class="btn btn-success" onclick="displayData('Hospital');temp();">Hospital</button>
      <button class="btn btn-info" onclick="displayData('Oxygen');temp();">Oxygen</button>
      <button class="btn btn-danger" onclick="displayData('Blood');temp();">Blood</button>
      <button class="btn btn-warning" onclick="displayData('Plasma');temp();">Plasma</button>
      
      
      <!-- <a class="btn btn-success " href="/index.html">Ambulance</a>
      <a class="btn btn-warning " href="/index.html">Covid Test</a>
      <a class="btn btn-secondary  " href="/index.html">Food Service</a> -->

    </div>`

    // document.querySelector(".categories").addEventListener("click" , ()=>{
    //     $("#myModal").modal('hide')
    // })
 

  }

  function temp()
  {
    $("#myModal").modal('hide')
  }
  


