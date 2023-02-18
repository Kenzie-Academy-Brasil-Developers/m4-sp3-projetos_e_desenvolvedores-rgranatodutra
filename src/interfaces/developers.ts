export interface Developer {
    id: number;
    name: string;
    email: string;
    developerInfoId: number | null;
};

export interface DeveloperInfo {
    id: number;
    developerSince: string;
    preferredOS: OperationalSystem;
};

export type DeveloperInfoBody = Omit<DeveloperInfo, 'id'>;
export type DeveloperBody = Omit<Developer, 'id'>;
export type OperationalSystem = "Windows" | "Linux" | "macOS";