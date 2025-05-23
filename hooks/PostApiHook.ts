import { useState } from 'react';
import config from "@/settings";
import i18n from "@/i18n/i18n";

const PostApiHook = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const postData = async (body , token= "", ur = "") => {
        setLoading(true);
        setError(null);

        if(ur != ""){
            url = ur
        }

        try {
            const lang = i18n.language || 'en';
            const response = await fetch(config.apiBaseUrl+url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': lang,
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                },
                body: JSON.stringify(body),
            });
            const json = await response.json();

            if (!response.ok) {

                if(response.status == 401){
                    setError(json.detail)
                }

            }

            setData(json);
            return json;
        } catch (e) {
            setError(e);
            console.error('Error:', e);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { postData, loading, error, data };
};

export default PostApiHook;
