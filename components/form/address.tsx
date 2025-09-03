'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useOrganizationStore } from "@/src/stores/organization-store";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateAddressMutation } from "@/src/http/address/create-address";
import { useGetEmployee } from "@/src/http/employee/get-employee";

const addressSchema = z.object({
  cep: z.string().min(1, "Digite algum valor válido"),
  city: z.string().min(1, "Digite algum valor válido"),
  neighborhood: z.string().min(1, "Digite algum valor válido"),
  number: z.string().min(1, "Digite algum valor válido"),
  state: z.string().min(1, "Digite algum valor válido").max(2, "Digite apenas o UF"),
  street: z.string().min(1, "Digite algum valor válido"),
  complement: z.string().min(1, "Digite algum valor válido"),
  employee_id: z.string().min(1, "Digite algum valor válido"),
})

type AddressSchemaForm = z.infer<typeof addressSchema>

export default function FormAddress() {
  const { selectedOrg } = useOrganizationStore();
  const { mutate } = useCreateAddressMutation();
  const { data: dataEmployee } = useGetEmployee(selectedOrg?.orgId);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<AddressSchemaForm>({
    resolver: zodResolver(addressSchema)
  })

  const employeeId = watch("employee_id")

  const onSubmit: SubmitHandler<AddressSchemaForm> = (data) => {
    if (!selectedOrg?.orgId) {
      toast("Selecione uma organização");
      return;
    }

    mutate(data)
  }

  return (
    <Card className="p-2">
      <h1 className="text-3xl font-bold mb-2">Registrar novo endereço</h1>
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">

          <div className="grid gap-2">
            <Label htmlFor="user_id">Selecione um funcionário</Label>
            <Select
              onValueChange={(value) => setValue("employee_id", value)}
              value={employeeId || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um empregado!" />
              </SelectTrigger>
              <SelectContent>
                {dataEmployee?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name} - ({item.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.employee_id && (
              <p className="text-sm text-red-500">{errors.employee_id.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="cep">CEP</Label>
            </div>
            <Input id="cep" {...register("cep")} type="text" required />
            {errors.cep && (
              <p className="text-sm text-red-500">{errors.cep.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="city">Cidade</Label>
            </div>
            <Input id="city" {...register("city")} type="text" required />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="neighborhood">Vizinhança</Label>
            </div>
            <Input id="neighborhood" {...register("neighborhood")} type="text" required />
            {errors.neighborhood && (
              <p className="text-sm text-red-500">{errors.neighborhood.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="number">Número</Label>
            </div>
            <Input id="number" {...register("number")} type="text" required />
            {errors.number && (
              <p className="text-sm text-red-500">{errors.number.message}</p>
            )}
          </div>


          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="state">UF</Label>
            </div>
            <Input id="state" {...register("state")} type="text" required />
            {errors.state && (
              <p className="text-sm text-red-500">{errors.state.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="street">Rua</Label>
            </div>
            <Input id="street" {...register("street")} type="text" required />
            {errors.street && (
              <p className="text-sm text-red-500">{errors.street.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="complement">Complemento</Label>
            </div>
            <Input id="complement" {...register("complement")} type="text" required />
            {errors.complement && (
              <p className="text-sm text-red-500">{errors.complement.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>Registrar Endereço</Button>

        </div>
      </form>

    </Card>
  );
}