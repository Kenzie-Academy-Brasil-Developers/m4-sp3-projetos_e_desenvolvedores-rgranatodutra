export interface Project {
    id: number;
    name: string;
    description: string;
    estimatedTime: string;
    repository: string;
    startDate: string;
    endDate: string | null;
    developerId: number;
}

export type ProjectBody = Omit<Project, 'endDate'>;