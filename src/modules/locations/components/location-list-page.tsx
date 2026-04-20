import { AdminResourcePage } from "@/components/dashboard/admin-resource-page"
import { locationColumns } from "../columns"
import { getLocations } from "../data"

export async function LocationListPage() {
  const locations = await getLocations()

  return (
    <AdminResourcePage
      title="Locations"
      description="Manage your locations and view their sales performance."
      createHref="/dashboard/locations/create"
      createLabel="Add Location"
      columns={locationColumns}
      data={locations}
    />
  )
}
