let arr=["12:00 PM 28.04.2021",
"12:00 PM 28.04.2021",
"19:50 5.8.2021",
"19:50 5.8.2021",
"12:02 PM 28.04.2021",
"12:05 PM 28.04.2021",
"12:05 PM 28.04.2021",
"12:08 PM 28.04.2021",
"12:09 PM 28.04.2021",
"12:10 PM 28.04.2021",
"12:12 PM 28.04.2021",
"",
"4:44 PM 28.04.2021",
"12:14 PM 28.04.2021",
"1:40 PM 28.04.2021",
"",
"1:25 PM 28.04.2021",
"1:28 PM 28.04.2021",
"1:35 PM 28.04.2021",
"1:30 PM 28.04.2021",
"",
"1:15 PM 29.04.2021",
"1:29 PM 29.04.2021",
"1:23 PM 29.04.2021",
"",
"",
"4:45 PM 28.04.2021",
"4:44 PM 28.04.2021",
"",
"1:37 PM 29.04.2021",
"",
"4:30 PM 28.04.2021",
"4:15 PM 28.04.2021",
"",
"4:10 PM 28.04.2021",
"",
"3:55 PM 28.04.2021",
"3:50 PM 28.04.2021",
"3:46 PM 28.04.2021",
"3:40 PM 28.04.2021",
"",
"",
"3:26 PM 28.04.2021",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"19:50 5.8.2021",
"19:50 5.8.2021",
"",
"",
"",
""]

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
    else
    {
        console.log()
    }
}