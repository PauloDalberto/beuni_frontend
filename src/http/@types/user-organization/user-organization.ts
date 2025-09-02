export interface UserOrganization {
  orgId: string;
  orgName: string;
  role: "admin" | "manager" | "user"
}