import React, { useState, useCallback, useEffect } from 'react'
import dropfile from '../../image/drop_file.png'
import { useDropzone } from 'react-dropzone'
import './dropfile.css'
import uploadPic from '../../image/upload.png'


function DropUploadLicense({ files, setFiles, isTb }) {
    // const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles]);

    let randomGen = (() => {
        return Math.floor(Math.random() * 4);
    })();
    console.log(`random number is ${randomGen}`)


    const { getRootProps,
        getInputProps,
        // isDragAccept,
        // isDragReject,
        // isDragActive
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png'
    });

    const thumbs = files.map(file => (
        <div key={file.name} className="boxxer">
            <div style={{ position: "relative" }}>
                <div style={{ display: isTb ? "block" : "none", "background": "red", width: '200px', height: '200px', position: 'absolute', opacity: '30%' }}></div>
                {randomGen === 0 ? <div style={{ display: isTb ? "block" : "none", position: "absolute", left: "5%", top: "10%", width: "180px", height: "30px", border: "2px solid green" }}></div> : <></>}
                {randomGen === 1 ? <div style={{ display: isTb ? "block" : "none", position: "absolute", left: "15%", top: "25%", width: "40px", height: "30px", border: "2px solid green" }}></div> : <></>}
                {randomGen === 2 ? <div style={{ display: isTb ? "block" : "none", position: "absolute", left: "55%", top: "30%", width: "80px", height: "30px", border: "2px solid green" }}></div> : <></>}
                {randomGen === 3 ? <div style={{ display: isTb ? "block" : "none", position: "absolute", left: "35%", top: "30%", width: "40px", height: "40px", border: "2px solid green" }}></div> : <></>}
                <img src={file.preview} alt={file.name} style={{ width: '200px', height: '200px' }} />
            </div>

            <div style={{ fontSize: "20px" }}>{(file.size / 1000000).toFixed(2)} MB </div>
        </div>
    ));

    //clean up 
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);


    return (
        <>
            <div className=''>
                <div className="license-dropfile"  {...getRootProps()} style={{ paddingRight: "12px" }}>
                    <input {...getInputProps()} />
                    <img src={uploadPic} alt="upload" />
                    <p style={{ fontSize: "30px" }}>Upload file</p>
                </div>
            </div>
            <div className="box-items">
                {thumbs}
            </div>
        </>
    )
}

export default DropUploadLicense
