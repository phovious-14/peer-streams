import React, { useContext } from 'react'
import './style.css'
import Auth from '../../context/Auth'

const Posts = () => {
  let splitImg;

  const {posts} = useContext(Auth)
  return (
    <div className='container3'>
      {
        posts.length !== 0 ? (
        posts.map((item) => (
          <div className="wrapper3" data-aos="flip-down" data-aos-delay="200">
            <div className="card3">
              <div className='side'>
              {
                item.metadata.media.length !== 0 &&
                (item.metadata.media).map(img => (
                    <img src={'https://lens.infura-ipfs.io/ipfs/'+(img.original.url).slice(7, img.original.url.length)} alt="" />
                )) 
              }     
              </div>          
              <div className="price3">
                <p>{item.metadata.description}</p>
              </div>
            </div>
          </div>
        ))
        ) : (
          <iframe src="https://embed.lottiefiles.com/animation/54026" title='j'></iframe>
        )}
    </div>
  )
}

export default Posts
