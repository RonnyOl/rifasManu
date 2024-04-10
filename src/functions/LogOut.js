

export default async function LogOut() {
  
    try{
        const res = await fetch("api/auth/logout", {
          method: "POST",
        });
        const data = await res.json()
        console.log(data, " --------")
        location.reload()
    
    }catch(error){
        }

    return {
        
  }
}
