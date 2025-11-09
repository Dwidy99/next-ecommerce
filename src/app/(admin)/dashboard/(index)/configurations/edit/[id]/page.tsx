import { getConfigurationById } from "../../lib/data";
import { FormConfiguration } from "../../_components/form-configuration";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EditConfigurationPageProps {
  params: { id: string };
}

export default async function EditConfigurationPage({
  params,
}: EditConfigurationPageProps) {
  const id = Number(params.id);
  const config = await getConfigurationById(id);

  if (!config) return notFound();

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <FormConfiguration config={config} />
        </CardContent>
      </Card>
    </section>
  );
}
