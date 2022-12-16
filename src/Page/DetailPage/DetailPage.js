import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../Component/Header/Header';

export default function DetailPage() {
    let params = useParams();
  return (
    <div>
        {params.id}
    </div>
  )
}
