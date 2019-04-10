import React, {useState} from 'react'
import axios from 'axios'

const FileUpload = () => {
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('Choose File')
    const [uploadedFile, setUploadedFile] = useState({})

    const onChange = e => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }
    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', file)
        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const { fileName, filePath } = res.data

            setUploadedFile({ fileName, filePath })
        } catch(err) {
            if(err.response.status === 500) {
                console.log("There was a problem with the server")
            } else {
                console.log(err.response.data.msg)
            }
        }
    }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
            <input type="file" 
            onChange={onChange}
            className="custom=file-input" 
            id="customFile"
            />

            <label className="custom=file-label" 
            htmlFor="customFile">
            {fileName}
            </label>
        </div>
        <button 
        type="submit" 
        value="upload" 
        className="btn btn-primary btn-block mt-4">Upload</button>
        </form>
        { uploadedFile ? <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <h3 className="text-center">{ uploadedFile.fileName} </h3>    
                <img style={{width: '100%'}} src={uploadedFile.filePath} alt="" />
            </div>
        </div>
        : null
        }
    </>
  )
}

export default FileUpload
