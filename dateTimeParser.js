let arr=["11:52 AM 28.04.21",
"11:52 AM 28.04.21",
"11:52 AM 28.04.21",
"11:52 AM 04.05.2021",
"11:56 AM 04.05.2021",
"11:57 AM 04.05.2021",
"12:00 PM 28.04.21",
"12:00 PM 04.05.2021",
"12:52 PM 04.05.2021",
"12:54 PM 04.05.2021",
"12:55 PM 04.05.2021",
"12:56 PM 04.05.2021",
"12:58 PM 04.05.2021",
"1:00 PM 04.05.2021",
"1:00 PM 04.05.2021",
"1:00 PM 04.05.2021",
"1:00 PM 04.05.2021",
"1:17 PM 04.05.2021",
"1:19 PM 04.05.2021",
"1:19 PM 04.05.2021",
"1:20 PM 04.05.2021",
"1:21 PM 04.05.2021",
"1:21 PM 04.05.2021",
"1:22 PM 04.05.2021",
"1:24 PM 04.05.2021",
"1:25 PM 04.05.2021",
"1:25 PM 04.05.2021",
"1:27 PM 04.05.2021",
"1:35 PM 04.05.2021",
"",
"1:42 PM 04.05.2021",
"1:46 PM 04.05.2021",
"1:52 PM 04.05.2021",
"2:07 PM 04.05.2021",
"7:11 PM 28.04.21",
"7:11 PM 28.04.21",
"7:24 PM 28.04.21",
"",
"",
"11:00 AM 28.04.21"]

for(let i=0;i<arr.length;i++)
{
    if(arr[i]!="")
    {
    let min,hr,year,month,date
    let x=arr[i].indexOf(":")
    min=arr[i].substring(x+1,x+3)
    hr=arr[i].substring(0,x)

    year="20"+arr[i].substring(arr[i].length-2, arr[i].length)
    month=arr[i].substring(arr[i].indexOf(".")+1, arr[i].lastIndexOf("."))
    date=arr[i].substring(arr[i].lastIndexOf(" ")+1, arr[i].indexOf("."))
    min = parseInt(min)
    hr = parseInt(hr)
    if(hr<12)
    {
        if((arr[i].includes("pm"))||(arr[i].includes("PM")))
        {
            hr+=12
        }
    }
    // console.log("   "+year+" "+month+" "+date+"    "+hr+"    "+min)
    let newCalmaString=year+"-"+month+"-"+date+"T"+hr+":"+min
    console.log(`${newCalmaString}`)
    }
    else{
        console.log()
    }
}