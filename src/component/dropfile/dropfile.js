import React, {useState, useCallback, useEffect} from 'react'
import dropfile from '../../image/drop_file.png'
import { useDropzone } from 'react-dropzone'
import './dropfile.css'

function Dropfile() {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles =>{
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, []);

    
    const { getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
        isDragActive
    } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
    });

    const thumbs = files.map(file=>(
        <div key={file.name} className="boxxer">
            <img src={file.preview} alt={file.name} style={{ width: '100px'}}/>
            <span>{file.name} -- {(file.size / 1000000).toFixed(2)} MB   </span>
            
        </div>
    ));

    //clean up 
    useEffect(()=>()=>{
        files.forEach(file=> URL.revokeObjectURL(file.preview));  
    }, [files]);


  return (
    // <!-- DropFile Here -->
    <div className='container-drop'>
        <div className="box-drop" {...getRootProps()}> 
        {/* <div className="box-drop"> <!-- New Line --> */}
            <input {...getInputProps()}/>
        <div>
            <img src={dropfile} alt="dropfile"/>
          </div>
          <button className='dropfile_button'><span>Drop a file</span></button>
        </div>
        <div className="box-items">
            {thumbs}
        </div>
    </div>

  )
}

export default Dropfile
