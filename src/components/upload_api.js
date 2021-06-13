
const baseAPI = '/api';


const UpldAPI ={
    get(email)
    {
        
        new Promise((resolve, reject)=>
        {
            
            fetch(`${baseAPI}/getupld`)
            .then(result => result.json()
            )
            .then(json => 
                {
                    resolve(json)

                    if(json.some(item => item.email === email)===true)
                    {
                        console.log(json.some(item => item.email === email));
                        console.log(email);

                        return 'true'
                    }

                   

                }
                    
            )
            .catch(err => reject(err))
        })
        // return false

        
    },
    
    create(upld)
    {
        return new Promise((resolve, reject) =>
        {
            fetch(`${baseAPI}/upld`, {
                method: 'POST',
                body: (upld),
                headers:
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(err =>
                {
                    console.log(err);
                    reject(err)
                })
        })
    }
}

export  default UpldAPI;