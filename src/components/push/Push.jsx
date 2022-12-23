import React, {useState} from 'react'
import bg from '../../assets/Smartwatch.png'
import { useContext } from 'react'
import Auth from '../../context/Auth'

const Push = () => {
    const {sendNotification} = useContext(Auth)
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')

    const notify = (e) => {
        e.preventDefault()
        sendNotification(title, body)
        setTitle('')
        setBody('')
    }
  return (
    <>
        <img src={bg} alt="" />
          <form
            className="flex flex-col items-center justify-center"
          >
            <input
              type="text"
              placeholder="Stream Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <input
              type="text"
              placeholder="Stream Description"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
            <button
              type="submit"
              variant="primary"
              className="w-screen sm:w-48 btn-style"
              onClick={notify}
            >
              Notify
            </button>
          </form>
    </>
  )
}

export default Push
