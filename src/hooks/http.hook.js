import { useCallback } from "react";
import { useState } from "react/cjs/react.development";

export const useHttp = () => {
    const [process, setProcess] = useState('loading');
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(url, {method, body, headers});
            if(!response.ok) {
                throw new Error (`ERROR! status: ${response.status}`);
            }
            const data = await response.json();
            return data; 
        } catch(e) {
            setProcess('error')
            throw e;
        }
        
    }, []);
    

    return {request, process, setProcess}
}