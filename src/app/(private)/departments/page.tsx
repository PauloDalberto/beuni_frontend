'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateDepartmentMutation } from "@/src/http/department/create-department";
import { useGetDepartment } from "@/src/http/department/get-department";
import { useOrganizationStore } from "@/src/stores/organization-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const departmentSchema = z.object({
  name: z.string().min(3, "Digite um nome válido"),
})

type DepartmentSchemaForm = z.infer<typeof departmentSchema>

export default function Departments() {
  const { mutate: createDepartment } = useCreateDepartmentMutation()
  const { selectedOrg } = useOrganizationStore();
  const { data: getDepartment } = useGetDepartment(selectedOrg?.orgId)
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DepartmentSchemaForm>({
    resolver: zodResolver(departmentSchema)
  })

  const onSubmit: SubmitHandler<DepartmentSchemaForm> = (data) => {
    if (!selectedOrg?.orgId) {
      toast("Selecione uma organização");
      return;
    }

    createDepartment({
      ...data,
      organization_id: selectedOrg.orgId
    })
  }
  
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-2xl">Criar novo departamento</h1>

      <form className="flex gap-2 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label htmlFor="name">Nome da organização</Label>
          <Input
            id="name"
            type="name"
            placeholder="Ex: RH"
            required
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}> 
            Criar Departamento
          </Button>
        </div>
      </form>

      <div className="flex gap-2 flex-col">
        <h1 className="font-bold text-2xl">Meus departamentos</h1>
        <div className="flex flex-row gap-2">
          {getDepartment?.map((item) => (
            <Card key={item.id}>
              <CardContent>  
                {item.name}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>    
    </div>
 );
}