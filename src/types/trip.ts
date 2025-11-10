export interface Trip {
  id: number;
  title: string;
  description: string;
  photos: string[];
  tags: string[];
  latitude: number;
  longitude: number;
  authorId: number;
  authorDisplayName: string;
  createdAt: string;
  updatedAt: string;
}
