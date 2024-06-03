interface CustomField {
    customFieldName: string;
    value: string;
    type: string;

  }

interface ItemWithLikesResponse {
    name: string;
    likesCount: number;
    customFields: CustomField[];
    liked: boolean;
  }
  export type { ItemWithLikesResponse };
  