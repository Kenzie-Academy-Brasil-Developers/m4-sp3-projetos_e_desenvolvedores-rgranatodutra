export interface Technology {
    id: number;
    name: string;
};

export interface ProjectTechnology {
    id: number;
    addedIn: string;
    projectId: number;
    technologyId: number;
};

export type TechnologyBody = Omit<Technology, 'id'>;