document.getElementById("userForm").addEventListener("submit", adduser);
 async function  adduser(e){
    e.preventDefault()
    let name = document.getElementById("name").value ;
    let age =  document.getElementById("age").value ;
    let domain =  document.getElementById("domain").value;
    let image = document.querySelector('input[name="image"]').files[0];

    const formData = new FormData();
    formData.append("name",name);
    formData.append("age",age);
    formData.append("domain",domain);
    formData.append("image",image);

     let res = await fetch("http://localhost:8000/user",{
        method:"POST",
        body: formData
            
      
        
       
    });
        let data = await res.json();
         window.alert(data);
    
}

async function getUsers(){

    let res = await fetch("http://localhost:8000/users");

    let data = await res.json();

  console.table(data);

  const box = document.getElementById("userdata");

  box.innerHTML = "";

  data.forEach(element => {
    box.innerHTML+= `
            <p>Name: ${element.name}</p>
            <p>Age: ${element.age}</p>
            <p>Domain: ${element.domain}</p>
            <img src="http://localhost:8000/uploads/${element.img || 'default.png'}" width="120">
            <hr> 
                    `
  });

}