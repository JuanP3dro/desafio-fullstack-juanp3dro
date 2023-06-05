import { contactData } from '@/pages/schemas/contacts.schema'
import React from 'react'
import { IoIosContact } from 'react-icons/io'
import{BsTelephoneFill} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'

interface ICardProps {
    contact:contactData
}

function Card({contact}: ICardProps) {
  return (
    <li className='border border-black flex flex-col items-start justify-center space-y-2 py-1 px-1 w-full h-[110px] max-w-[250px]'>
        <div className='flex space-x-1 items-center'>
            <IoIosContact/>
            <p>{contact.name}</p>
        </div>
        <div className='flex space-x-1 items-center'>
            <MdEmail/>
            <p>{contact.email}</p>
        </div>
        <div className='flex space-x-1 items-center'>
            <BsTelephoneFill/>
            <p>{contact.telefone}</p>
        </div>
    </li>
  )
}

export default Card