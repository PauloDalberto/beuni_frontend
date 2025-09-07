export interface EmployeeData {
  id: string
  birth_date: string
  job_title: string
  name: string
  email: string
  created_at: string
  department: string
}

export interface CreateEmployeeData {
  user_id: string;
  job_title: string;
  birth_date: string;
  department_id: string;
  organization_id: string;
}

export interface BirthdayEmployeeData {
  id: string
  user_id: string
  organization_id: string
  name: string
  job_title: string
  birth_date: string
}
