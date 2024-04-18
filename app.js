const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const  dropdown=document.querySelectorAll(".dropdown select");
let i=0;
let btn=document.querySelector('button');
let from_curr=document.querySelector(".from select")
let to_curr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
btn.addEventListener("click",async (evt)=>
{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value

    if(amtval===""||amtval<1)
    {
        amtval=1;
        amount.value="1";
    }
    let url=`${base_url}/${from_curr.value.toLowerCase()}/${to_curr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data= await response.json();
    let rate=data[to_curr.value.toLowerCase()];
    console.log(rate)
    let finalamount=amount.value*rate;
    msg.innerText=`${amount.value} ${from_curr.value} = ${finalamount} ${to_curr.value}`

  

// console.log(from_curr.value)
// console.log(to_curr.value);

})

for(let select of  dropdown)
{
    for(curr_code in countryList)
{
let newoption=document.createElement("option");
newoption.innerText=curr_code;
newoption.value=curr_code;
if(select.name==="From"&& curr_code==="USD"
)
{
    newoption.selected="selected";
}
if(select.name==="to"&& curr_code==="INR")
{
    newoption.selected="selected";
}
select.append(newoption);

}
select.addEventListener("change",(evt)=>
{
updateFlag(evt.target);

})
}
let updateFlag=(element)=>
{
    let curr_code=element.value;
    let country=countryList[curr_code];
    let src=`https://flagsapi.com/${country}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=src

}