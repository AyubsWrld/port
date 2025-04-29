

const ColorsArray = 
[
    4,
    3,
    2,
    1
]


function TimeTwo( x ) 
{
 return  x * 2 ; 
}

const Destination = [
  TimeTwo(ColorsArray[0]), 
  TimeTwo(ColorsArray[1]), 
  TimeTwo(ColorsArray[2]), 
  TimeTwo(ColorsArray[3]), 
]


Destination.forEach( element => {
  console.log(element) ;
})
