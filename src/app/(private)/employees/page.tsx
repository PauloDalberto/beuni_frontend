'use client'

import { DataTable } from "@/components/datatable";
import { useGetEmployee } from "@/src/http/employee/get-employee";
import { useOrganizationStore } from "@/src/stores/organization-store";

export default function Employees() {
  const { selectedOrg } = useOrganizationStore();
  const { data } = useGetEmployee(selectedOrg?.orgId)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl font-bold mb-2">My team</h1>
        {data && <DataTable data={data} />}
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-2">Registrar novo funcionário</h1>
      </div>
    </div>
 );
}