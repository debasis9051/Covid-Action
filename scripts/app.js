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

    let pt = firebase.database().ref(`Oxygen`).get(`Vendors`)
    let vendorsDB
    pt.then((value)=>{value.forEach((values)=>{
        vendorsDB=values.val()
        let tb=``
        let mapArr = {0: "table-success",1: "table-danger",2: "table-yellow",3: "table-warning",4: ""}
        for(let i=0;i<Object.keys(vendorsDB).length;i++)
        {
            let currentData = vendorsDB[Object.keys(vendorsDB)[i]];
            console.log(currentData)
            let tr= `<tr class="${mapArr[currentData.Status]}">
                        <td>${currentData.HospitalName}</td>
                        <td>${currentData.ContactName}</td>
                        <td>${currentData.Contact}</td>
                        <td>${currentData.Address}</td>
                        <td>${currentData.Rate}</td>
                        <td>${currentData.Type}</td>
                        <td>${currentData.Available}</td>
                        <td>${currentData.TRtime}</td>       
                        <td>${currentData.Verification}</td>       
                        <td>${currentData.Comments}</td>
                    </tr>`
            tb+=tr
        }
        document.getElementById("tableBody").innerHTML = tb
    })})




      




