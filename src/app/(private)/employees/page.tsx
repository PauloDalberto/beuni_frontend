'use client'

import FormAddress from "@/components/form/address";
import FormEmployee from "@/components/form/employee";
import { DataTable } from "@/components/table/datatable";
import { useGetEmployee } from "@/src/http/employee/get-employee";
import { useOrganizationStore } from "@/src/stores/organization-store";

export default function Employees() {
  const { selectedOrg } = useOrganizationStore();
  const { data } = useGetEmployee(selectedOrg?.orgId);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
        <FormAddress />

        <FormEmployee />
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-2">Meus funcionários</h1>
        {data && <DataTable data={data} />}
      </div>
    </div>
 );
}