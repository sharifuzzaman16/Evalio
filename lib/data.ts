

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

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submissionUrl: string;
  note: string;
  status: "Pending" | "Accepted" | "Rejected";
  feedback?: string;
}

const submissions: Submission[] = [];


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


export const getAssignmentById = async (id: string): Promise<Assignment | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return assignments.find((a) => a.id === id);
};

export const addSubmission = async (submissionData: Omit<Submission, "id" | "status">): Promise<Submission> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const newSubmission: Submission = {
    id: String(Date.now()),
    status: "Pending",
    ...submissionData,
  };
  submissions.push(newSubmission);
  return newSubmission;
};

export const getSubmissionForStudent = async (assignmentId: string, studentId: string): Promise<Submission | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return submissions.find(
    (s) => s.assignmentId === assignmentId && s.studentId === studentId
  );
};


export const getSubmissionsForAssignment = async (assignmentId: string): Promise<Submission[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return submissions.filter((s) => s.assignmentId === assignmentId);
};

export const updateSubmissionStatus = async (
  submissionId: string,
  status: "Pending" | "Accepted" | "Rejected",
  feedback: string
): Promise<Submission | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const submissionIndex = submissions.findIndex((s) => s.id === submissionId);

  if (submissionIndex === -1) {
    return undefined;
  }

  submissions[submissionIndex] = {
    ...submissions[submissionIndex],
    status,
    feedback,
  };

  return submissions[submissionIndex];
};

export const getSubmissionStatusCounts = async (): Promise<{ [key: string]: number }> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const counts = submissions.reduce((acc, submission) => {
        acc[submission.status] = (acc[submission.status] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });

    return counts;
};