import React from 'react'
import { Icons } from './Icons'

const Search = ({otherStyles}) => {
  return (
    <div className={`flex py-2.5 px-3.5 shadow-custom items-center gap-3 border border-[#B0B0B0] rounded-[32px] ${otherStyles}`}>
      <Icons.search />
      <input type='text' placeholder='Search' className='flex-1 outline-none placeholder:text-[#707070] bg-transparent' />
    </div>
  )
}

export default Search