import React, {useState} from 'react'
import './style.css'
import bg from '../../../assets/Launch.png'
import { useContext } from 'react'
import Auth from '../../../context/Auth'

const CreateChannel = () => {

    const {CreateChannel, getChannelData} = useContext(Auth)

    const [channelName, setChannelName] = useState("");
    const [bio, setBio] = useState("");
    const [twitter, setTwitter] = useState("");
    const [discord, setDiscord] = useState("");
    const [website, setWebsite] = useState("");

    const submitForm = (e) => {
        e.preventDefault()
        CreateChannel(channelName, bio, twitter, discord, website)
        // getChannelData()
    }

  return (
    <div className="container">
      <img src={bg} alt="" className="fixed w-[500px] ml-[500px]" />
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={submitForm}
        >
          <input
            type="text"
            placeholder="Channel name"
            onChange={(e) => setChannelName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            type="url"
            placeholder="Twitter"
            onChange={(e) => setTwitter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Discord"
            onChange={(e) => setDiscord(e.target.value)}
          />
          <input
            type="url"
            placeholder="Website / Portfolio"
            onChange={(e) => setWebsite(e.target.value)}
          />
          <button
            type="submit"
            variant="primary"
            className="w-screen sm:w-48 btn-style"
          >
            Create Channel
          </button>
        </form>
    </div>
  )
}

export default CreateChannel