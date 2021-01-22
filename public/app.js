
console.log('hii');

const form=document.querySelector('.form')
form.addEventListener('submit',registerUser)

async function registerUser(e){
    e.preventDefault()
    const user=document.getElementById('user').value
    const pass=document.getElementById('pass').value
     
    const result= await fetch('/api/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            user,pass
        })

    }).then(res=>res.json())

    if (result.status==='error'){
        alert('USER EXIST OR INVALID DATA')
    }
    if (result.status==='ok'){
        alert('Register Successfully . Kindly Login')
    }
}





