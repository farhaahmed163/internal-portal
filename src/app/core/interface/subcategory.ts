export interface Subcategory {
  id: string;
  preferredLabel: string;
  altLabel: string | null;
}

interface ApiResponse {
  status: string;
  message: string;
  data: { [category: string]: Subcategory[] };
}
