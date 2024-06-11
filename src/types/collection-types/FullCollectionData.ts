import { CustomField } from "../CustomField";

interface FullCollectionData {
    name: string;
    category: string;
    description: string;
    imageUrl: string;
    public: boolean;
    customFields: CustomField[];
  }
  export type { FullCollectionData };
  