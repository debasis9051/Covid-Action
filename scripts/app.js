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
  
  let mapArr = {"Oxygen" : [["Sl. No.", "Name of Organization/Dealer", "Contact number of Organization/Dealer", "Address/Area", "Description", "Latest Verification", "Status", "No. of times Verified","Actions"],
                            ["Organization", "Contact", "Address", "Description", "Verification", "Status", "Counter"],
                            {"Name of Organization/Dealer" : 1, "Address/Area" : 3, "Latest Verification" : 5, "Status" : 6},
                            {"No. of times Verified" : 7}],
                "Plasma" : [["Sl. No.", "Name of Organization/Dealer", "Contact number of Organization/Dealer", "Address/Area", "Description", "Latest Verification", "Status", "No. of times Verified","Actions"],
                            ["Organization", "Contact", "Address", "Description", "Verification", "Status", "Counter"],
                            {"Name of Organization/Dealer" : 1, "Address/Area" : 3, "Latest Verification" : 5, "Status" : 6},
                            {"No. of times Verified" : 7}],
                "Blood" :  [["Sl. No.", "Name of Organization/Dealer", "Contact number of Organization/Dealer", "Address/Area", "Description", "Latest Verification", "Status", "No. of times Verified","Actions"],
                            ["Organization", "Contact", "Address", "Description", "Verification", "Status", "Counter"],
                            {"Name of Organization/Dealer" : 1, "Address/Area" : 1, "Latest Verification" : 5, "Status" : 6},
                            {"No. of times Verified" : 7}],
                "Hospital" : [["Sl. No.", "Name of Organization/Dealer", "Contact number of Organization/Dealer", "Address/Area", "Avalability of Beds", "Description", "Latest Verification", "Status", "No. of times Verified","Actions"],
                              ["Organization", "Contact", "Address", "Beds", "Description", "Verification", "Status", "Counter"],
                              {"Name of Organization/Dealer" : 1, "Address/Area" : 3, "Latest Verification" : 6, "Status" : 7, "Avalability of Beds" : 4},
                              {"No. of times Verified" : 8}],
                "Doctor" : [["Sl. No.", "Name of Doctor", "Doctor's Number", "Availability", "Description", "Latest Verification", "No. of times Verified","Actions"],
                            ["Doctor", "Contact", "Availability", "Description", "Verification", "Counter"],
                            {"Availability" : 3, "Latest Verification" : 5},
                            {"No. of times Verified" : 6}]}

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
    document.querySelector("#doctorCategory").classList.remove("highlighter")
    document.querySelector(`#${category.toLowerCase()}Category`).classList.add("highlighter")

    cate = category

    let filterCatOptions = Object.keys(mapArr[category][2])
    let myOpts = "<option>Select Category for Filter..</option>"
    for(let i=0;i<filterCatOptions.length;i++)
    {
      myOpts+= `<option>${filterCatOptions[i]}</option>`
    }
    document.querySelector("#filterCategory").innerHTML = myOpts

    let sortCatOptions = Object.keys(mapArr[category][3])
    let myOpts2 = "<option>Select Category for Sort..</option>"
    for(let i=0;i<sortCatOptions.length;i++)
    {
      myOpts2+= `<option>${sortCatOptions[i]}</option>`
    }
    document.querySelector("#sortCategory").innerHTML = myOpts2


    firebase.database().ref(category).once("value").then((snapshot)=>{
        if(!snapshot.exists())
            document.getElementById("tableBody").innerHTML = ""
    })

    let currentColumns = mapArr[category][0]
    
    let tr= `<tr>`
    for(let i=0;i<currentColumns.length;i++)
      tr += `<th scope="col">${currentColumns[i]}</th>`
    tr+= `</tr>`        
    document.getElementById("tableHead").innerHTML = tr

    let pt = firebase.database().ref(category).get(`Vendors`)
    pt.then((value)=>{value.forEach((values)=>{

        vendorsDB=values.val()
        let currentCatKeysList = mapArr[category][1]
        let tb=""
        for(let i=0;i<Object.keys(vendorsDB).length;i++)
        {
          let currentData = vendorsDB[Object.keys(vendorsDB)[i]];

          let tr2= `<tr>`
          tr2+= `<td>${i+1}</td>`
          for(let j=0;j<currentCatKeysList.length;j++)
          {
            if(currentCatKeysList[j] == "Verification")
              tr2+= `<td>${currentData[currentCatKeysList[j]].replace("T"," @")}</td>`
            else
              tr2+= `<td>${currentData[currentCatKeysList[j]]}</td>`
          }
          tr2+= `<td class="flex1">
                    <button class="btn btn-success verifyLead" onclick="leadVerification(${Object.keys(vendorsDB)[i]})">Verify our Lead</button>
                    <a class="btn btn-primary" href="tel:${currentData.Contact}">Call</a>
                </td>`

          tb+=tr2
        }
        document.getElementById("tableBody").innerHTML = tb
    })})
    
    document.querySelector(".toolsText").classList.remove("d-none")
    document.querySelector(".table-responsive").classList.remove("d-none")
    document.querySelector("#guideDiv").classList.remove("d-none")
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

      let filter, table, tr, td, txtValue;
      let currentCatFilterData = mapArr[cate][2]
      
      filter = filterText.toUpperCase();
      table = document.getElementById("tableBody");
      tr = table.getElementsByTagName("tr");
      for(let i=0;i<tr.length;i++) 
      {
        td = tr[i].getElementsByTagName("td")[currentCatFilterData[filterCategory]];
        if(td)
        {
          txtValue = td.textContent || td.innerText;
          if(filterCategory == "Status")
          {
            if(txtValue.toUpperCase() !== filter.toUpperCase())    
              tr[i].classList.add("d-none");
          }
          else
          {
            if(txtValue.toUpperCase().indexOf(filter) <= -1) 
              tr[i].classList.add("d-none");
          }
          
        }
      }
    }
  }
  function filterClose()
  {
    displayData(cate)
    if(!document.querySelector("#exitSort").classList.contains("d-none"))
    {
      sortData(document.querySelector("#sortCategory").value,document.querySelector("#sortOrder").value)
    }
    
    document.querySelector("#exitFilter").classList.add("d-none")
  }


  function sortData(sortCategory,sortOrder)
  {
    if((sortCategory!="Select Category for Sorting..")&&(sortOrder!="Select Order for Sorting.."))
    {
      document.querySelector("#exitSort").classList.remove("d-none")

      let table = document.getElementById("tableBody");
      let rows, i, x, y, count = 0;
      let switching = true;

      let direction = sortOrder.toLowerCase();
      let Switch
      let currentCatSortData = mapArr[cate][3]

      while(switching)
      {
          switching = false;
          rows = table.rows;

          for(i=0;i<rows.length-1;i++)
          {
              Switch = false;

              x = rows[i].getElementsByTagName("TD")[currentCatSortData[sortCategory]];
              y = rows[i + 1].getElementsByTagName("TD")[currentCatSortData[sortCategory]];
              if(direction == "ascending")
              {
                if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())
                {
                  Switch = true;
                  break;
                }
              } 
              else if(direction == "descending")
              {
                if(x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
                {
                    Switch = true;
                    break;
                }
              }
          }

          if(Switch)
          {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;

            count++;
          }
          else 
          {
            if(count == 0 && direction == "ascending")
            {
              direction = "descending";
              switching = true;
            }
          }
      }
    }
  }
  function sortClose()
  {
    let myTempa = document.querySelector("#filterCategory").value
    let myTempb = document.querySelector("#filterText").value
    console.log(myTempa,myTempb)
    displayData(cate)
    if(!document.querySelector("#exitFilter").classList.contains("d-none"))
    {
      filterData(myTempa,myTempb)
    }

    document.querySelector("#exitSort").classList.add("d-none")
  }
  // function filterData(filterCategory,filterText)
  // {
  //   if(filterCategory!="Select Category for Filter..")
  //   {
  //     document.querySelector("#exitFilter").classList.remove("d-none")

  //     let keyList
  //     if(currentTableSort.length == 0)
  //       keyList = Object.keys(vendorsDB)
  //     else
  //       keyList = currentTableSort
      
  //     let finalKeyList = []

  //     let tb=""
  //     for(let i=0,j=1;i<keyList.length;i++)
  //     {
  //         let currentKey = keyList[i]
  //         let currentData = vendorsDB[currentKey];
  //         let mapArr = {"Name of the Organization/Dealer" : currentData.Organization.toLowerCase() ,"Address/Area" : currentData.Address.toLowerCase() ,"Status" : currentData.Status.toLowerCase() ,"Latest Verification" : currentData.Verification}

  //         let myCheck
  //         if(filterCategory=="Status")
  //         {
  //           if(mapArr[filterCategory] === filterText.toLowerCase())
  //             myCheck = true
  //         }
  //         else
  //         {
  //           if(mapArr[filterCategory].search(filterText.toLowerCase()) != -1)
  //             myCheck = true
  //         }

  //         if(myCheck)
  //         {
  //           finalKeyList.push(currentKey)
  //           let tr= `<tr>
  //                       <td>${j}</td>
  //                       <td>${currentData.Organization}</td>
  //                       <td>${currentData.Contact}</td>
  //                       <td>${currentData.Address}</td>
  //                       <td>${currentData.Verification.replace("T"," @")}</td>
  //                       <td>${currentData.Description}</td>
  //                       <td>${currentData.Status}</td>
  //                       <td>${currentData.Counter}</td>
  //                       <td class="flex1">
  //                           <button class="btn btn-success verifyLead" onclick="leadVerification(${currentKey})">Verify our Lead</button>
  //                           <a class="btn btn-primary" href="tel:${currentData.Contact}">Call</a>
  //                       </td>
  //                   </tr>`
  //           tb+=tr
  //           j++
  //         }
  //     }

  //     if(currentTableSort.length == 0)
  //       currentTableFilter = finalKeyList

  //     document.getElementById("tableBody").innerHTML = tb
  //   }

  // }

  // function filterClose()
  // {
  //   currentTableFilter = []
  //   if(document.querySelector("#exitSort").classList.contains("d-none"))
  //   {
  //     let temp2
  //     if(document.querySelector("#hospitalCategory").classList.contains("highlighter"))
  //       temp2="Hospital"
  //     else if(document.querySelector("#oxygenCategory").classList.contains("highlighter"))
  //       temp2="Oxygen"
  //     else if(document.querySelector("#bloodCategory").classList.contains("highlighter"))
  //       temp2="Blood"
  //     else if(document.querySelector("#plasmaCategory").classList.contains("highlighter"))
  //       temp2="Plasma"
  //     else
  //       console.log("Error in filterClose")
  //     displayData(temp2)
  //   }
  //   else
  //     sortData(document.querySelector("#sortCategory").value,document.querySelector("#sortOrder").value)
    
  //   document.querySelector("#exitFilter").classList.add("d-none")
  // }

  function temp()
  {
    $("#myModal").modal('hide')
  }

  // function sortData(sortCategory,sortOrder)
  // {
  //   if((sortCategory!="Select Category for Sorting..")&&(sortOrder!="Select Order for Sorting.."))
  //   {
  //     document.querySelector("#exitSort").classList.remove("d-none")

  //     let keyList
  //     if(currentTableFilter.length == 0)
  //       keyList = Object.keys(vendorsDB)
  //     else
  //       keyList = currentTableFilter
        

  //     let valueList = []
  //     for(let i=0;i<keyList.length;i++)
  //     {
  //       let mapArr ={"No. of times Verified" : vendorsDB[keyList[i]].Counter}
  //       valueList[i] = mapArr[sortCategory]
  //     }

  //     let tempObjArr = []
  //     for(let i=0;i<keyList.length;i++)
  //     {
  //       let temp2 = {}
  //       temp2["key"] = keyList[i]
  //       temp2["val"] = valueList[i]
  //       tempObjArr.push(temp2)
  //     }

  //     tempObjArr.sort((a,b)=>{
  //       if(sortOrder == "Ascending")
  //         return a.val - b.val
  //       else
  //         return b.val - a.val
  //     })

  //     let finalKeyList = []
  //     for(let i=0;i<tempObjArr.length;i++)
  //       finalKeyList.push(tempObjArr[i].key)
      
  //     if(currentTableFilter.length == 0)
  //       currentTableSort = finalKeyList

  //     let tb=""
  //     for(let i=0;i<finalKeyList.length;i++)        
  //     {
  //         let currentData = vendorsDB[finalKeyList[i]];
  //         let tr= `<tr>
  //                     <td>${i+1}</td>
  //                     <td>${currentData.Organization}</td>
  //                     <td>${currentData.Contact}</td>
  //                     <td>${currentData.Address}</td>
  //                     <td>${currentData.Verification.replace("T"," @")}</td>
  //                     <td>${currentData.Description}</td>
  //                     <td>${currentData.Status}</td>
  //                     <td>${currentData.Counter}</td>
  //                     <td class="flex1">
  //                         <button class="btn btn-success verifyLead" onclick="leadVerification(${finalKeyList[i]})">Verify our Lead</button>
  //                         <a class="btn btn-primary" href="tel:${currentData.Contact}">Call</a>
  //                     </td>
  //                 </tr>`
  //         tb+=tr
  //     }
  //     document.getElementById("tableBody").innerHTML = tb
  //   }
  // }

  // function sortClose()
  // {
  //   currentTableSort = []
  //   if(document.querySelector("#exitFilter").classList.contains("d-none"))
  //   {
  //     let temp2
  //     if(document.querySelector("#hospitalCategory").classList.contains("highlighter"))
  //       temp2="Hospital"
  //     else if(document.querySelector("#oxygenCategory").classList.contains("highlighter"))
  //       temp2="Oxygen"
  //     else if(document.querySelector("#bloodCategory").classList.contains("highlighter"))
  //       temp2="Blood"
  //     else if(document.querySelector("#plasmaCategory").classList.contains("highlighter"))
  //       temp2="Plasma"
  //     else
  //       console.log("Error in filterClose")
  //     displayData(temp2)
  //   }
  //   else
  //     filterData(document.querySelector("#filterCategory").value,document.querySelector("#filterText").value)

  //   document.querySelector("#exitSort").classList.add("d-none")
  // }

document.querySelector("#filterCategory").addEventListener("change",(e)=>{
  let currField = document.querySelector("#filterText")
  let parentDiv = currField.parentElement
  currField.remove()

  if(e.target.value == "Latest Verification")
  { 
    let select = `<input type="date" id="filterText">`
    parentDiv.innerHTML+= select
  }
  else if(e.target.value == "Status")
  {  
    let select = `<select id="filterText">
                  <option>Working</option>
                  <option>Not Working</option>
                  <select>`
    parentDiv.innerHTML+= select
  }
  else
  {
    let select = `<input type="text" id="filterText">`
    parentDiv.innerHTML+= select
  }
})

document.querySelector("#toolsButton").addEventListener("click",()=>{
  document.querySelector(".tools").classList.toggle("d-none")
})