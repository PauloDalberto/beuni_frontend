'use client'

import { DataTable } from "@/components/table/datatable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDepartment } from "@/src/http/department/get-department";
import { useCreateEmployeeMutation } from "@/src/http/employee/create-employee";
import { useGetEmployee } from "@/src/http/employee/get-employee";
import { useOrganizationStore } from "@/src/stores/organization-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const employeeSchema = z.object({
  user_id: z.string().min(1, "Digite algum valor válido"),
  department_id: z.string().min(1, "Digite algum valor válido"),
  birth_date: z.string(),
  job_title: z.string().min(1, "Digite algum valor válido"),
})

type EmployeeSchemaForm = z.infer<typeof employeeSchema>

export default function Employees() {
  const { selectedOrg } = useOrganizationStore();
  const { data } = useGetEmployee(selectedOrg?.orgId);
  const { mutate } = useCreateEmployeeMutation();
  const { data: getDepartment } = useGetDepartment(selectedOrg?.orgId)

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<EmployeeSchemaForm>({
    resolver: zodResolver(employeeSchema)
  })

  const departmentId = watch("department_id")

  const onSubmit: SubmitHandler<EmployeeSchemaForm> = (data) => {
    if (!selectedOrg?.orgId) {
      toast("Selecione uma organização");
      return;
    }

    mutate({ 
      ...data,  
      organization_id: selectedOrg?.orgId 
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl font-bold mb-2">My team</h1>
        {data && <DataTable data={data} />}
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-2">Registrar novo funcionário</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">

            <div className="grid gap-2">
              <Label htmlFor="user_id">Selecione um departamento</Label>
              <Select
                onValueChange={(value) => setValue("department_id", value)}
                value={departmentId || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um departamento!" />
                </SelectTrigger>
                <SelectContent>
                  {getDepartment?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department_id && (
                <p className="text-sm text-red-500">{errors.department_id.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="user_id">Id do Usuário</Label>
              </div>
              <Input id="user_id" {...register("user_id")} type="text" required />
              {errors.user_id && (
                <p className="text-sm text-red-500">{errors.user_id.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="birth_date">Data de nascimento</Label>
              </div>
              <Input id="birth_date" {...register("birth_date")} type="date" required />
              {errors.birth_date && (
                <p className="text-sm text-red-500">{errors.birth_date.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="job_title">Função</Label>
              </div>
              <Input id="job_title" {...register("job_title")} type="text" required />
              {errors.job_title && (
                <p className="text-sm text-red-500">{errors.job_title.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>Registrar funcionário</Button>

          </div>
        </form>

      </div>
    </div>
 );
}