'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateDepartmentMutation } from "@/src/http/department/create-department";
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
    <div>
      <h1>Verificar meus departamentos</h1>

      <form className="mt-6 flex gap-2 flex-col" onSubmit={handleSubmit(onSubmit)}>
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
    </div>
 );
}