import { getUrl } from 'aws-amplify/storage';
import { useState, useEffect } from 'react';

export const DownloadLinkButton = () => {
    const [url, setUrl] = useState<string | undefined >("");
    async function urlDiscovery(){

        const linkToStorageFile = await getUrl({
          path: "picture-submissions/LandLab.png",
          // Alternatively, path: ({identityId}) => `album/{identityId}/1.jpg`
          options: {
            validateObjectExistence: false,  // defaults to false
            expiresIn: 200, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
            useAccelerateEndpoint: false,// Whether to use accelerate endpoint.
          },
        });
        console.log('signed URL: ', linkToStorageFile.url);
        console.log('URL expires at: ', linkToStorageFile.expiresAt);
        setUrl(linkToStorageFile.url.toString());
        
        
        }
        useEffect(() => {
            urlDiscovery();
          }, []);
        
        
        
    return <div><a href={url} target="_blank" >download link</a></div> ;
  };