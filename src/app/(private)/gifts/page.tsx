'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetBirthdayMonthEmployee } from "@/src/http/employee/get-birthday-month";
import { useOrganizationStore } from "@/src/stores/organization-store";
import { months } from "@/src/utils/months";
import { useState } from "react";

export default function Gifts() {
  const { selectedOrg } = useOrganizationStore();
  const [month, setMonth] = useState<number | undefined>(undefined);
  const { data: BirthdayMonth } = useGetBirthdayMonthEmployee(month ?? 1, selectedOrg?.orgId)

 return (
   <div className="grid grid-cols-2 gap-4">
    <Card >
      <CardHeader>
        <CardTitle>Aniversários por departamento</CardTitle>
      </CardHeader>
      <CardContent>
        <Select  onValueChange={(value) => setMonth(Number(value))}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Selecione um mês" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m.value} value={String(m.value)}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {BirthdayMonth?.map((item, key) => (
          <div key={key}>
            {item.name} - {item.birth_date} - {item.job_title}
          </div>
        ))}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Aniversários por mês</CardTitle>
      </CardHeader>
      <CardContent>
        aqui a logica de ver os aniversários por mês
        
      </CardContent>
    </Card>
   </div>
 );
}