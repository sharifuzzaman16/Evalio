
export interface Assignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
}


const assignments: Assignment[] = [
  {
    id: "1",
    title: "Setup Your Development Environment",
    description: "Install Node.js, VS Code, and set up your Next.js project.",
    deadline: "2025-08-15",
  },
  {
    id: "2",
    title: "Build the Authentication Flow",
    description: "Implement user registration and login using NextAuth.",
    deadline: "2025-08-20",
  },
];

export const getAssignments = async (): Promise<Assignment[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return assignments;
};

export const addAssignment = async (assignment: Omit<Assignment, "id">): Promise<Assignment> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const newAssignment: Assignment = {
    id: String(Date.now()), 
    ...assignment,
  };
  assignments.push(newAssignment);
  return newAssignment;
};