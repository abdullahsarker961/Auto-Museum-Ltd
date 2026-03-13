export interface Car {
  id: string;
  name: string;
  spec: string;
  price: string;
  year: string;
  status?: string;
  image_url: string;
  is_featured: boolean;
  is_latest: boolean;
  body_type: string;
  engine?: string;
  mileage?: string;
  fuel_type?: string;
  transmission?: string;
  description?: string;
  created_at: string;
}
