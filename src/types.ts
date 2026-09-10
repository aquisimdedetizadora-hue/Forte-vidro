export interface ImageSequenceConfig {
  frameCount: number;
  basePath: string;
  fileNamePattern?: (frameIndex: number) => string;
}

export interface ArchitectureSolution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
}

export interface ProjectInquiry {
  name: string;
  email: string;
  phone: string;
  architecturalType: string;
  message: string;
}
