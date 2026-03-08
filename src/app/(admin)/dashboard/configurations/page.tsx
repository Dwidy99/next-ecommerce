import { getConfigurations } from "./lib/data";
import Link from "next/link";

export default async function ConfigurationsPage() {
  const configs = await getConfigurations();

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Configurations</h1>
        <Link
          href="/dashboard/configurations/create"
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Add Configuration
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th>Webname</th>
            <th>Language</th>
            <th>Email</th>
            <th>Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {configs.map((cfg) => (
            <tr key={cfg.id} className="border-t">
              <td className="p-2">{cfg.id}</td>
              <td>{cfg.webname}</td>
              <td>{cfg.language}</td>
              <td>{cfg.email}</td>
              <td>{new Date(cfg.date).toLocaleDateString()}</td>
              <td>
                <Link
                  href={`/dashboard/configurations/edit/${cfg.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
