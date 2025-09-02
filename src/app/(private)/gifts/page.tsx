import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Gifts() {
 return (
   <div className="grid grid-cols-2 gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Aniversários por departamento</CardTitle>
      </CardHeader>
      <CardContent>
        aqui a logica de ver os aniversários pelo departamento
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