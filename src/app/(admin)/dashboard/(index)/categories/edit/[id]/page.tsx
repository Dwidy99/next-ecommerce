import React from 'react'
import FormCategory from '../../_components/form-category';
import { getCategoryById } from '../../lib/data';
import { redirect } from 'next/navigation';
import { Tedit } from '@/types';

export default async function EditPage({params}: Tedit) {
    const { id } = await params;
    const data = await getCategoryById(id);

    if(!data) {
        return redirect("/dashboard/categories");
    }
    console.log(data);

  return <FormCategory type="EDIT" data={data}/>
}
