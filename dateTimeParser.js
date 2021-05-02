let arr=["5:30 pm 26.04.2021",
"12:17 pm 26.04.2021",
"12:19 pm 26.04.2021",
"12:25 pm 26.04.2021",
"8:03 pm 26.04.2021",
"18:22 pm 28.04.2021",
"12:24 pm 26.04.2021",
"12:58 pm 26.04.2021",
"12:59 pm 26.04.2021",
"13:01 pm 26.04.2021",
"20:50 27.04.2021",
"13:04 pm 26.04.2021",
"13:05 pm 26.04.2021",
"13:06 pm 26.04.2021",
"13:07 pm 26.04.2021",
"",
"",
"13:08 pm 26.04.2021",
"13:10 pm 26.04.2021",
"13:11 pm 26.04.2021",
"13:12 pm 26.04.2021",
"13:13 pm 26.04.2021",
"13:14 pm 26.04.2021",
"13:14 pm 26.04.2021",
"13:16 pm 26.04.2021",
"3:08 pm 26.04.2021",
"8:10 pm 26.04.2021",
"",
"8:11 pm 28.04.2021",
"14:14 26.04.2021",
"",
"14:16 26.04.2021",
"",
"",
"19:00 28.04.2021",
"11:37 am 26.04.2021",
"09:40 28.04.2021",
"14:19 26.04.2021",
"14:21 26.04.2021",
"8:39 pm 26.04.2021",
"8:45 pm 26.04.2021",
"8:54 pm 26.04.2021",
"",
"",
"",
"",
"",
"",
"",
"8:52 pm 26.04.2021",
"8:51 pm 26.04.2021",
"09:50 28.04.2021",
"8:48 pm 26.04.2021",
"8:47 pm 26.04.2021",
"8:06 pm 26.04.2021",
"8:20 pm 26.04.2021",
"8:32 pm 26.04.2021",
"8:56 pm 26.04.2021",
"19:00 28.04.2021",
"12:38 am 27.04.2021",
"12:20 am 27.04.2021",
"12:21 am 27.04.2021",
"12:53 am 27.04.2021",
"12:58 am 27.04.2021",
"1:07 am 27.04.2021",
"22:12 27.04.2021",
"22:12 27.04.2021",
"12:37 am 27.04.2021",
"12:39 am 27.04.2021",
"19:00 28.04.2021",
"19:00 28.04.2021",
"9:14 pm 26.04.2021",
"1:07 am 27.04.2021",
"10:30 pm 26.04.2021",
"19:10 pm 27.04.2021",
"19:39 pm 28.04.2021",
"16:27 27.04.2021",
"11:48 am 26.04.2021",
"11:49 am 26.04.2021",
"11:50 am 26.04.2021",
"19:00 28.04.2021",
"15:40 28.04.2021",
"12:59 pm 26.04.2021",
"1:13 pm 26.04.2021",
"7:00 pm 27.04.2021",
"10:04 pm 26.04.2021",
"4:28 pm 26.04.2021",
"4:14 pm 26.04.2021",
"",
"11:50 pm 26.04.2021",
"",
"",
"3:33 am 27.04.2021",
"3:33 am 27.04.2021",
"3:33 am 27.04.2021",
"8:12 pm 26.04.2021",
"",
"3:37 pm 26.04.2021",
"4:19 pm 26.04.2021",
"1:35 am 27.04.2021",
"11:35 am 27.04.2021",
"12:30 pm 27.04.2021",
"19:45 28.04.2021",
"",
"11:10 am 27.04.2021",
"11:00 am 27.04.2021",
"14:15 27.04.2021",
"11:40 28.04.2021",
"10:00 28.04.2021",
"09:48 28.04.2021",
"11:30 28.04.2021",
"11:30 28.04.2021",
"14:12 28.04.2021",
"",
"",
"",
"18:20 pm 28.04.2021",
""]

for(let i=0;i<arr.length;i++)
{
    if(arr[i]!="")
    {
    let min,hr,year,month,date
    let x=arr[i].indexOf(":")
    min=arr[i].substring(x+1,x+3)
    hr=arr[i].substring(0,x)

    year=arr[i].substring(arr[i].length-4,arr[i].length)
    month=arr[i].substring(arr[i].length-7,arr[i].length-5)
    date=arr[i].substring(arr[i].length-10,arr[i].length-8)
    min = parseInt(min)
    hr = parseInt(hr)
    if(hr<12)
    {
        if(arr[i].includes("pm"))
        {
            hr+=12
        }
    }
    let newCalmaString=year+"-"+month+"-"+date+"T"+hr+":"+min
    console.log(`${newCalmaString}`)
    }
    else{
        console.log()
    }
}