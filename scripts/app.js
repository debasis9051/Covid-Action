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



  var studentsDB= firebase.database().ref(`Oxygen/Vendors`);
  studentsDB.child(`1212`.trim()).set({
      Hospital :"peer",
      Contact:9051459406,
      Address :"em bypass",
      Rate :600,
      Type : "refil",
      Available :"no"
    })

    let pt = firebase.database().ref(`Oxygen`).get(`Vendors`)

    let vendorsDB
     pt.then((value)=>{value.forEach((values)=>{
           
        vendorsDB=values.val()
        let vendors;
        if(vendorsDB)
        {
            vendors = Object.keys(vendorsDB)

        }

        console.log(vendorsDB)

        })})


    //     let htmlElement =
    //     `
    //     <tr class="table-danger">
    //     <th scope="row">Danger</th>
    //     <td>Column content</td>
    //     <td>Column content</td>
    //     <td>Column content</td>
    //     <td>Column content</td>
    //     <td>Column content</td>
    //     <td>Column content</td>
    //     <td>Column content</td>       
    //   </tr>
    //     `

        let append1 = document.querySelector(".append")

        var cln = append1.cloneNode(true);
        append1.after(cln)




      




