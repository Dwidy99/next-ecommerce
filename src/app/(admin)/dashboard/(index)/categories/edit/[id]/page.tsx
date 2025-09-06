import React from 'react'
import FormCategory from '../../_components/form-category';
import { getCategoryById } from '../../lib/data';
import { redirect } from 'next/navigation';

type Tparams = {
    id: string;
}

interface EditPageProp {
    params: Tparams;
}

export default async function EditPage({params}: EditPageProp) {
    const { id } = await params;
    const data = await getCategoryById(id);

    if(!data) {
        return redirect("/dashboard/categories");
    }
    console.log(data);

  return <FormCategory type="EDIT" data={data}/>
}
