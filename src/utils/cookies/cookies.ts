

export const setCookie=(variableName:string,value:string):boolean=>{


    try{

      document.cookie=`${variableName}=${value}`;

      return true;

    }catch(err){

       return false;

    }


}

export const getCookie=(variableName:string):string|boolean=>{

    try{

        const myCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${variableName}=`));

        if(myCookie){

            const cookieValue = myCookie.split("=")[1];

            return cookieValue;

        }
        
        return false;

    }catch(err){

        return false;


    }


}