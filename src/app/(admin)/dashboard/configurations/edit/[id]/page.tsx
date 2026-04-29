import { notFound } from "next/navigation"

import { FormConfiguration } from "../../_components/form-configuration"
import { getConfigurationById } from "../../lib/data"

interface EditConfigurationPageProps {
  params: Promise<{ id: string }> | { id: string }
}

export default async function EditConfigurationPage({
  params,
}: EditConfigurationPageProps) {
  const { id } = await params
  const configId = Number(id)

  if (Number.isNaN(configId)) return notFound()

  const config = await getConfigurationById(configId)

  if (!config) return notFound()

  return <FormConfiguration config={config} />
}

