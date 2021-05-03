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
  let currentTableFilter = []
  let currentTableSort = []
  function displayData(category)
  {
    document.querySelector("#hospitalCategory").classList.remove("highlighter")
    document.querySelector("#oxygenCategory").classList.remove("highlighter")
    document.querySelector("#bloodCategory").classList.remove("highlighter")
    document.querySelector("#plasmaCategory").classList.remove("highlighter")
    document.querySelector(`#${category.toLowerCase()}Category`).classList.add("highlighter")

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
    document.querySelector(".tools").classList.remove("d-none")
    document.querySelector(".table-responsive").classList.remove("d-none")
    
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

    let now = new Date()
    let dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = now.getFullYear();
    
    let dateStringWithTime = yyyy+"-"+mm+"-"+dd+"T"+now.getHours()+":"+now.getMinutes()
    console.log(dateStringWithTime)
    temp["Verification"] = dateStringWithTime 

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
      document.querySelector("#exitFilter").classList.remove("d-none")

      let keyList
      if(currentTableSort.length == 0)
        keyList = Object.keys(vendorsDB)
      else
        keyList = currentTableSort
      
      let finalKeyList = []

      let tb=""
      for(let i=0,j=1;i<keyList.length;i++)
      {
          let currentKey = keyList[i]
          let currentData = vendorsDB[currentKey];
          let mapArr = {"Name of the Organization/Dealer" : currentData.Organization.toLowerCase() ,"Address/Area" : currentData.Address.toLowerCase() ,"Status" : currentData.Status.toLowerCase() ,"Latest Verification" : currentData.Verification}

          let myCheck
          if(filterCategory=="Status")
          {
            if(mapArr[filterCategory] === filterText.toLowerCase())
              myCheck = true
          }
          else
          {
            if(mapArr[filterCategory].search(filterText.toLowerCase()) != -1)
              myCheck = true
          }

          if(myCheck)
          {
            finalKeyList.push(currentKey)
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
                            <button class="btn btn-success verifyLead" onclick="leadVerification(${currentKey})">Verify our Lead</button>
                            <a class="btn btn-primary" href="tel:${currentData.Contact}">Call</a>
                        </td>
                    </tr>`
            tb+=tr
            j++
          }
      }

      if(currentTableSort.length == 0)
        currentTableFilter = finalKeyList

      document.getElementById("tableBody").innerHTML = tb
    }

  }

  function filterClose()
  {
    currentTableFilter = []
    if(document.querySelector("#exitSort").classList.contains("d-none"))
    {
      let temp2
      if(document.querySelector("#hospitalCategory").classList.contains("highlighter"))
        temp2="Hospital"
      else if(document.querySelector("#oxygenCategory").classList.contains("highlighter"))
        temp2="Oxygen"
      else if(document.querySelector("#bloodCategory").classList.contains("highlighter"))
        temp2="Blood"
      else if(document.querySelector("#plasmaCategory").classList.contains("highlighter"))
        temp2="Plasma"
      else
        console.log("Error in filterClose")
      displayData(temp2)
    }
    else
      sortData(document.querySelector("#sortCategory").value,document.querySelector("#sortOrder").value)
    
    document.querySelector("#exitFilter").classList.add("d-none")
  }

  function temp()
  {
    $("#myModal").modal('hide')
  }

  function sortData(sortCategory,sortOrder)
  {
    if((sortCategory!="Select Category for Sorting..")&&(sortOrder!="Select Order for Sorting.."))
    {
      document.querySelector("#exitSort").classList.remove("d-none")

      let keyList
      if(currentTableFilter.length == 0)
        keyList = Object.keys(vendorsDB)
      else
        keyList = currentTableFilter
        

      let valueList = []
      for(let i=0;i<keyList.length;i++)
      {
        let mapArr ={"No. of times Verified" : vendorsDB[keyList[i]].Counter}
        valueList[i] = mapArr[sortCategory]
      }

      let tempObjArr = []
      for(let i=0;i<keyList.length;i++)
      {
        let temp2 = {}
        temp2["key"] = keyList[i]
        temp2["val"] = valueList[i]
        tempObjArr.push(temp2)
      }

      tempObjArr.sort((a,b)=>{
        if(sortOrder == "Ascending")
          return a.val - b.val
        else
          return b.val - a.val
      })

      let finalKeyList = []
      for(let i=0;i<tempObjArr.length;i++)
        finalKeyList.push(tempObjArr[i].key)
      
      if(currentTableFilter.length == 0)
        currentTableSort = finalKeyList

      let tb=""
      for(let i=0;i<finalKeyList.length;i++)        
      {
          let currentData = vendorsDB[finalKeyList[i]];
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
                          <button class="btn btn-success verifyLead" onclick="leadVerification(${finalKeyList[i]})">Verify our Lead</button>
                          <a class="btn btn-primary" href="tel:${currentData.Contact}">Call</a>
                      </td>
                  </tr>`
          tb+=tr
      }
      document.getElementById("tableBody").innerHTML = tb
    }
  }

  function sortClose()
  {
    currentTableSort = []
    if(document.querySelector("#exitFilter").classList.contains("d-none"))
    {
      let temp2
      if(document.querySelector("#hospitalCategory").classList.contains("highlighter"))
        temp2="Hospital"
      else if(document.querySelector("#oxygenCategory").classList.contains("highlighter"))
        temp2="Oxygen"
      else if(document.querySelector("#bloodCategory").classList.contains("highlighter"))
        temp2="Blood"
      else if(document.querySelector("#plasmaCategory").classList.contains("highlighter"))
        temp2="Plasma"
      else
        console.log("Error in filterClose")
      displayData(temp2)
    }
    else
      filterData(document.querySelector("#filterCategory").value,document.querySelector("#filterText").value)

    document.querySelector("#exitSort").classList.add("d-none")
  }

document.querySelector("#filterCategory").addEventListener("change",()=>{
  if(document.querySelector("#filterCategory").value == "Latest Verification")
  {
    document.querySelector("#filterText").setAttribute("type", "date")
  }
  else
  {
    document.querySelector("#filterText").setAttribute("type", "text")
  }
})
