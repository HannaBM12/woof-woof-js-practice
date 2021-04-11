document.addEventListener('DOMContentLoaded', init)
const url = 'http://localhost:3000/pups/'
function init(){
    renderAllPups()
 
  
}

function renderAllPups(){
    fetch('http://localhost:3000/pups/')
    .then(response => response.json())
    .then(pupsData => pupsData.forEach(pup => { 
         renderAPup(pup)
        
    }))
}

function renderAPup(pup){
    
    const dogDiv = document.querySelector('#dog-bar')
    const span = document.createElement('span')
    span.dataset.id = pup.id
    span.innerText = pup.name
    dogDiv.append(span)

    span.addEventListener('click', _ =>{
            showDog(pup)
    })
        

  
}

function showDog(pup){
    
    
    const img = document.createElement('img')
    img.src = pup.image
    
    const h2 = document.createElement('h2')
    h2.innerText = pup.name
    const button = document.createElement('button')
    button.dataset.id = pup.id
    button.innerText = pup.isGoodDog? "Good Dog!" : "Bad Dog!"
    
    button.addEventListener('click', toggleDog)
    
    const mainDiv = document.querySelector('#dog-info')
    mainDiv.dataset.id = pup.id
    mainDiv.innerHTML = ' '
    mainDiv.append(img, h2, button)

    

    }

    function toggleDog(event){
       
        if (event.target.innerText === 'Good Dog!'){
            event.target.innerText = "Bad Dog!"
          
        } else {
            event.target.innerText = 'Good Dog!'
            
        }
        
        const buttonVal = {}
        if (event.target.innerText === "Good Dog!"){
            buttonVal.isGoodDog = true
        } else {
            buttonVal.isGoodDog = false
        }
        
        const buttonId = event.target.dataset.id
        // console.log(buttonVal)
        fetch(url+buttonId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buttonVal)
        })
        .then(res => res.json)
        .then(pupData => console.log(pupData))
        
                
    }