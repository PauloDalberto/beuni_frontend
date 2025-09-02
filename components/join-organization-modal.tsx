import { useUserStore } from "@/src/stores/user-store";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useJoinOrganizationMutation } from "@/src/http/organization/join-organization";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface JoinOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const joinOrganizationSchema = z.object({
  orgId: z.uuid("Digite um ID válido")
})

type JoinOrganizationSchemaForm = z.infer<typeof joinOrganizationSchema>

export default function JoinOrganizationModal({ open, onOpenChange }: JoinOrganizationModalProps) {

  const { user } = useUserStore()
  const { mutate: joinOrganization } = useJoinOrganizationMutation()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<JoinOrganizationSchemaForm>({
      resolver: zodResolver(joinOrganizationSchema)
    })

  const onSubmit = async (data: JoinOrganizationSchemaForm) => {
    if (!user) return
    
    joinOrganization({ ...data, userId: user?.id,}, {
      onSuccess: () => {
        onOpenChange(false);
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Entrar em uma organização</DialogTitle>
          <DialogDescription>
            Insira o ID da organização na qual você quer entrar
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <Label htmlFor="orgId">ID da organização</Label>
            <Input
              id="orgId"
              type="text"
              placeholder="Ex: df3g-34bb..."
              required
              {...register("orgId")}
            />
            {errors.orgId  && (
              <p className="text-sm text-red-500">{errors.orgId.message}</p>
            )}
            <div>
              <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                Entrar na organização
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
