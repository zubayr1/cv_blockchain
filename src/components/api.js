const baseAPI = '/api';


const profAPI ={
    get(email)
    {
        
        new Promise((resolve, reject)=>
        {
            
            fetch(`${baseAPI}/doc`)
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
    
    create(prof)
    {
        return new Promise((resolve, reject) =>
        {
            fetch(`${baseAPI}/prof`, {
                method: 'POST',
                body: (prof),
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
                    reject(err)
                })
        })
    }
}

export default profAPI;