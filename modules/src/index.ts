
import { resolve } from 'path';
import { Super } from './../../node_modules/acorn/dist/acorn.d';
import { rejects } from 'assert';

function formatString(input: string, toUpper?: boolean): string{
   
  return (toUpper===false)?input.toLowerCase(): input.toUpperCase()
}
console.log(formatString("HELLO",false))



function filterByRating(items: { title: string; rating: number }[]): { title: string; rating: number }[]{
   return items.filter(i=>i.rating>=4)
    
}

const books = [
    { title: "Book A", rating: 4.5 },
    { title: "Book B", rating: 3.2 },
    { title: "Book C", rating: 5.0 }
  ];
  
  console.log(filterByRating(books))

 

function concatenateArrays<T>(...arrays: T[][]): T[] {
  
  return ([] as T[]).concat(...arrays);  
}
console.log(concatenateArrays([1,2,3,4],[2,3,4,5]))



class Vehicle{
    private make:string
    private year:number

    constructor(make:string, year:number){
        this.make=make;
        this.year=year;
    }
      getInfo(){
        console.log(`"Make: ${this.make} ,Year: ${this.year}"`)
      } 
}

class Car extends Vehicle{
    private model:string
   constructor(make:string,year:number,model:string){
    super(make,year);
    this.model=model

   }
   getModel(){
    console.log(`"Model: ${this.model}"`)
   }
  
}

const myCar=new Car("Toyota",2020,"Corolla");

myCar.getInfo();
myCar.getModel();




function processValue(value:string | number):number{
    return (typeof value ==="string")?value.length : value*2;
}

console.log(processValue(10));
console.log(processValue("hello"));



interface Product {
    name: string;
    price: number;
  }
  
  function getMostExpensiveProduct(products: Product[]): Product | null {
    let max_price=products[0]
     for(let i=1;i<products.length;i++){
        if(products[i].price>max_price.price){
            max_price=products[i]
        }     
     }
     return max_price;

  }

  const products = [
    { name: "Pen", price: 10 },
    { name: "Notebook", price: 25 },
    { name: "Bag", price: 50 }
  ]
console.log( products.length)
  console.log(getMostExpensiveProduct(products))





  enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
  }
  
  function getDayType(day: Day): string{
    
    if(day===6 ||day===5){
        return "weekend"
    }
    else{
        return "weeked";
    }
  }

 console.log( getDayType(Day.Sunday))

 

 
 async function squareAsync(n: number): Promise<number>{
     const data:number=await new Promise((resolve,reject)=>{
        if(n>=0){
            setTimeout(()=>{
            resolve(n*n)
        },1000)
        }
        else{
            reject('Error: Negative number not allowed')
        }
     })
     return data
 }
 squareAsync(-4).then(console.log).catch(console.error)





