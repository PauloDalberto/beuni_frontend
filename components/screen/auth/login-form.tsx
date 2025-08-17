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
import { useLoginMutation } from "@/src/http/user/login"
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"

const loginSchema = z.object({
  email: z.email("Digite um email válido"),
  password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres")
})

type LoginSchemaForm = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate } = useLoginMutation();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchemaForm>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (data: LoginSchemaForm) => {
    mutate(data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Logue com sua conta</CardTitle>
          <CardDescription>
            Digite seus dados abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
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
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}> 
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Registre-se
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              Deseja criar uma organização?{" "}
              <Link href="/organization" className="underline underline-offset-4">
                Clique aqui!
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
