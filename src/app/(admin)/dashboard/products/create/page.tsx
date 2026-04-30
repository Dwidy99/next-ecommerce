import FormProduct from "../_components/form-product"
import { getProductFormOptions } from "../lib/data"

export default async function CreateProductPage() {
  const options = await getProductFormOptions()

  return <FormProduct type="ADD" data={null} options={options} />
}
