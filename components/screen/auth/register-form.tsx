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
import { useRegisterMutation } from "@/src/http/user/register"

const registerSchema = z.object({
  name: z.string().min(3, "Inclua no minimo 3 caracteres"),
  email: z.email("Digite um email válido"),
  password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
  confirm_password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!")
}).refine((data) => data.password === data.confirm_password, {
  message: "As senhas não são iguais!",
  path: ["confirm_password"]
})

type RegisterSchemaForm = z.infer<typeof registerSchema>

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate, isError } = useRegisterMutation();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterSchemaForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    }
  })

  const onSubmit = (data: RegisterSchemaForm) => {
    mutate(data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crie sua conta!</CardTitle>
          <CardDescription>
            Digite os dados abaixo para criar sua conta! 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Ex: joão"
                  required
                  {...register("name")}
                
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input id="password" {...register("password")} type="password" required />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirm_password">Confirmar senha</Label>
                </div>
                <Input id="confirm_password" {...register("confirm_password")} type="password" required />
                {errors.confirm_password && (
                  <p className="text-sm text-red-500">{errors.confirm_password.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <Button type="submit" className="w-full cursor-pointer">
                  Registrar-se
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
