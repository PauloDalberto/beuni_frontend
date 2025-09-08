'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDepartment } from "@/src/http/department/get-department";
import { useGetBirthdayMonthEmployee } from "@/src/http/employee/get-birthday-month";
import { useGetBirthdayDepartmentEmployee } from "@/src/http/employee/get-bithday-department";
import { useOrganizationStore } from "@/src/stores/organization-store";
import { months } from "@/src/utils/months";
import { useState } from "react";

export default function Gifts() {
  const { selectedOrg } = useOrganizationStore();
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined)
  const { data: BirthdayMonth } = useGetBirthdayMonthEmployee(month ?? 1, selectedOrg?.orgId)
  const { data: BirthdayDepartment } = useGetBirthdayDepartmentEmployee(selectedDepartment ?? '', selectedOrg?.orgId)
  const { data: getDepartment } = useGetDepartment(selectedOrg?.orgId)  

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
            {item.name} - {new Date(item.birth_date).toLocaleDateString("pt-BR")} - {item.job_title}
          </div>
        ))}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Aniversários por mês</CardTitle>
      </CardHeader>
      <CardContent>
        <Select  onValueChange={(value) => setSelectedDepartment(value)}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Selecione um mês" />
          </SelectTrigger>
          <SelectContent>
            {getDepartment?.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {BirthdayDepartment?.map((item, key) => (
          <div key={key}>
            {item.name} - {new Date(item.birth_date).toLocaleDateString("pt-BR")} - {item.job_title}
          </div>
        ))}
      </CardContent>
    </Card>
   </div>
 );
}