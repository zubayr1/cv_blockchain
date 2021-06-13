import React from 'react'
import Firebase from 'firebase';
import {useState, useEffect, useRef} from 'react';

export default function Notification_CA(props) {

    var CAemail = props.dataParentToChild


    const [dbinfo , setdbinfo] = useState(0);

    
    const data = useRef(null);
  

    useEffect(()=>
    {

        
       new Promise((resolve, reject)=>
       {
           
           fetch(`api/doc`)
           .then(result => result.json()
           )
           .then(json => 
               {
                   resolve(json)

                   var list = JSON.stringify(json).split('},')

                   var count=0

                   
                   for(count=0; count<list.length; count++)
                   {
                     if(list[count].includes('ca') && list[count].includes(CAemail))
                     {

                       var string = list[count].replace(']','').replace('[','')

                      //  console.log(string);
                      if(!string.endsWith('}'))
                      {
                        string = string+'}'
                      }
                       var final_json = JSON.parse(string)


                        var PATH = '/'+ final_json.name
                       let ref = Firebase.database().ref(PATH);
                        ref.on('value', snapshot => {
                            const state = snapshot.val();
                            
                            data.current = state

                        });
                        



                      }

                      

                   }
                   

               }
                   
           )
           
           .catch(err => reject(err))
       })

       

    },[])


    console.log(data.current);
    
    

    return (
        
    
    <div  ref={data}>
        
        Original
        </div>
    )
}
