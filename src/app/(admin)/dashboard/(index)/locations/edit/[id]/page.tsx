import React from 'react'
import FormLocation from '../../_components/form-location';
import { getLocationById } from '../../lib/data';
import { redirect } from 'next/navigation';
import { Tedit } from '@/types';

export default async function EditPage({params}: Tedit) {
    const { id } = await params;
    const data = await getLocationById(id);

    if(!data) {
        return redirect("/dashboard/locations");
    }
    console.log(data);

  return <FormLocation type="EDIT" data={data}/>
}
