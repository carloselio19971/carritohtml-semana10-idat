//Seleccionar variables
const shoppingBasket=document.querySelector("#shoppingBasketList");
const courseList=document.querySelector("#courseList");
const clearallcourseList=document.querySelector("#clearShoppingBasket")
const shoppingBasketList=document.querySelector("#shoppingBasketList tbody");
let coursesShoppingBasket=[];

loadListener();
//Listener
function loadListener(){
    courseList.addEventListener('click',addShoppingBasket);
    shoppingBasket.addEventListener('click',detelecourse);
    //Mostrar curso del localstorage
    document.addEventListener('DOMContentLoaded',()=>{
        coursesShoppingBasket=JSON.parse(localStorage.getItem('course') || []);
        printCourseListShoppingBasket();
    })

    clearallcourseList.addEventListener('click',()=>{
        coursesShoppingBasket=[];
        printCourseListShoppingBasket();
        console.log(coursesShoppingBasket);
    });
}

function addShoppingBasket(e){
    e.preventDefault();
    let agregarCarrito=e.target.classList.contains('addShoppingBasket');
    if(agregarCarrito){
        const courseSelected=e.target.parentElement.parentElement;
        readCourseToShoppingBasket(courseSelected);
        console.log(coursesShoppingBasket);
    }
}

function detelecourse(e){
        if(e.target.classList.contains('deleteCourse')){
                const courseId=e.target.getAttribute('data-id');
                //Eliminar del arreglo
                coursesShoppingBasket=coursesShoppingBasket.filter(course=>course.id!==courseId);
                console.log(coursesShoppingBasket);
                printCourseListShoppingBasket();
        };
}


function readCourseToShoppingBasket(courseSelected){
    console.log(courseSelected);

    const dataCourseSelected={
        image:courseSelected.querySelector("img").src,
        title:courseSelected.querySelector("h4").textContent,
        price:courseSelected.querySelector("p span").textContent,
        id:courseSelected.querySelector("a").getAttribute('data-id'),
        quantity:1
    }
    const exist=coursesShoppingBasket.some((course)=> course.id===dataCourseSelected.id);
    console.log(exist);

    if(exist){
        const coursecoursesShoppingBasketFiltered=coursesShoppingBasket.map((course)=>{
                if(course.id===dataCourseSelected.id){
                        course.quantity++;
                        return course;
                }
                else{
                    return course;
                }

        });

        coursesShoppingBasket=[...coursecoursesShoppingBasketFiltered];
    }
    else {
        coursesShoppingBasket=[...coursesShoppingBasket,dataCourseSelected];
    }

    //console.log(coursesShoppingBasket);
    printCourseListShoppingBasket();
}



function printCourseListShoppingBasket(){
    clearContainerShoppingBasket();
    coursesShoppingBasket.forEach((course)=>{
    
 let {image,title,price,quantity}=course;
 const row=document.createElement('tr');
              row.innerHTML=`
              <td><img src="${image}"</td>
              <td>${title}</td>
              <td>${quantity}</td>
              <td>${price}</td> 
              <td><a href="#" class="deleteCourse" data-id="${course.id}">X </td>
              `;
        shoppingBasketList.appendChild(row);   
        localstorageCourseListShoppingBasket();
        //Sincronizar al localstorage al carrito
        function localstorageCourseListShoppingBasket(){
                localStorage.setItem('course',JSON.stringify(coursesShoppingBasket));
        }

    });
 }

 function clearContainerShoppingBasket(){
    shoppingBasketList.textContent='';
    localStorage.removeItem('course');
   
 }





