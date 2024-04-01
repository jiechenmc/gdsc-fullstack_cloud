import { ChangeEvent, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [imageUrl, setImageUrl] = useState("Upload an image to get started!")

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    // Note: our cloud function can only accept pdf right now

    const uploadFile = e.target.files![0]
    const uploadFileName = uploadFile.name

    // Replace this link with your own cloud function url
    // Source code available here: https://github.com/jiechenmc/gdsc-serverless_compute/tree/main
    const gcf_url = `https://us-east1-loqi-loqi.cloudfunctions.net/function-1/?dest=${uploadFileName}`

    const fd = new FormData()

    const blob = new Blob([uploadFile], { type: 'application/pdf' })

    fd.append("data", blob);

    fetch(gcf_url, { method: "POST", body: fd }).then(response => response.text().then(text => setImageUrl(text)))
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input name="file" type='file' accept=".pdf" onChange={e => handleImageUpload(e)} />
        <p>
          <a href={imageUrl} target='_blank'>
            {imageUrl.startsWith("https://") ? imageUrl : "Upload an pdf to get started!"}
          </a>
        </p>
      </div>
      <p className="read-the-docs">
        Uploading a pdf file will generate a public url where you can view your file on cloud storage!
      </p>
    </>
  )
}

export default App
