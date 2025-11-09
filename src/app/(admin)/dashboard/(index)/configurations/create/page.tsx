import { FormConfiguration } from "../_components/form-configuration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateConfigurationPage() {
  return (
    <section className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <FormConfiguration />
        </CardContent>
      </Card>
    </section>
  );
}
