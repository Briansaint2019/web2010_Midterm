//select Elements  && defining variables
const rows = document.querySelectorAll(".row")
const labels = document.querySelectorAll(".row1 .col")
const shtml = document.querySelectorAll(".row2 .col")
const refresh = document.querySelector(".refresh")
const newPrice = document.querySelector(".newPrice")
const poS = [0,2,3,4,5,6]




//define functions and classes
class Bitcoin{
  constructor(poS){
    /* Create properties using this and invoke methods that should be called automatically here */
  this.poS = poS
  this.getPrices()
  }
  getPrices(){
    $.ajax({
      url: "https://bitpay.com/api/rates",
      dataType: "json",
      success: data =>{
       this.prices = data
       this.setPrices(this.poS)
       
        console.log(data)
      },
      error: error=>{
        console.log("There was an error")
      }
    })
  }
  setPrices(nums){
   
      nums.forEach((num, index) =>{
        shtml[index +1].textContent = this.prices[num].rate.toFixed(2)
    })
    console.log(nums)

  }
     
  
  refresh(){
    this.getPrices()
    console.log("Refreshing the prices")
  }
  }
  const bit = new Bitcoin(poS)
//adding event listeners, calling functions, and creating instances of classes
refresh.addEventListener("click", e=>{
  console.log("Refresh has been clicked")
  bit.refresh()
})

newPrice.addEventListener("click", e=>{
  const code = window.prompt("What Country are you looking for?")
  bit.prices.forEach((price,index) =>{
    if(price.code === code.toUpperCase()){
      bit.poS.push(index)
      //create the next column of the table and add the label and the price
      rows[0].innerHTML += `<div class="col"> BTC/${code.toUpperCase()} </div>`
      rows[1].innerHTML += `<div class="col"> ${price.rate.toFixed(2)} </div>`
    }
  })
})


