'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateOrganizationMutation } from "@/src/http/organization/create-organization"
import { useState } from "react"
import { OrganizationDataResponse } from "@/src/http/@types/organization/organization"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const organizationSchema = z.object({
  name: z.string().min(3, "Insira pelo menos 3 caracteres")
})

type OrganizationSchemaForm = z.infer<typeof organizationSchema>

export function OrganizationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate } = useCreateOrganizationMutation();
  const [createdOrg, setCreatedOrg] = useState<OrganizationDataResponse | null>(null);
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OrganizationSchemaForm>({
    resolver: zodResolver(organizationSchema)
  })

  const onSubmit = (data: OrganizationSchemaForm) => {
    mutate(data, {
      onSuccess: (org) => setCreatedOrg(org[0])
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Cria sua organização</CardTitle>
          <CardDescription>
            Digite um nome para sua organização!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome da organização</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Ex: Microsoft"
                  required
                  {...register("name")}
                
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}> 
                  Criar organização
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {createdOrg && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Sua organização foi criada!</CardTitle>
            <CardDescription>
              Este é seu ID da organização, salve-o para se cadastrar:
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-2">
            <p className="font-mono">{createdOrg.id}</p>
            <Button 
              onClick={() => {
                navigator.clipboard.writeText(createdOrg.id)
                toast("ID copiado com sucesso!")
                router.push("/login")
              }}
            >
              Copiar e ir para login
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
