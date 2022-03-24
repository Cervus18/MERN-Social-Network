import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Searchbar = () => {
const [query,setQuery] = useState("")

  return (
    <div className='search'>
        <input placeholder='Search for developers like you' type="text" value={query} onChange={(e)=> setQuery(e.target.value)} />
        <Link to={`/profiles/${query}`} style={{"padding":"0", "margin":"0"}} onClick={(e)=> { (query==="" && e.preventDefault()) ; setQuery("")}}><button>Search</button></Link>
    </div>
  )
}

export default Searchbar