import React from 'react'
import FormLocation from '../../_components/form-location';
import { getLocationById } from '../../lib/data';
import { redirect } from 'next/navigation';

type Tparams = {
    id: string;
}

interface EditPageProp {
    params: Tparams;
}

export default async function EditPage({params}: EditPageProp) {
    const { id } = await params;
    const data = await getLocationById(id);

    if(!data) {
        return redirect("/dashboard/locations");
    }
    console.log(data);

  return <FormLocation type="EDIT" data={data}/>
}
