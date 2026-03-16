document.getElementById("userForm").addEventListener("submit", adduser);
 async function  adduser(e){
    e.preventDefault()
    let name = document.getElementById("name").value ;
    let age =  document.getElementById("age").value ;
    let domain =  document.getElementById("domain").value;

     let res = await fetch("http://localhost:8000/user",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name:name,
            age:age,
            topic:domain
        })
        
       
    });
        let data = await res.json("");
         window.alert(data);
    
}

async function getUsers(){

    let res = await fetch("http://localhost:8000/users");

    let data = await res.json();

  console.table(data);

}