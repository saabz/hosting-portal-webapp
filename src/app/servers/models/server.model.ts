export interface ServerStorage {
  title: string;
  type: string;
  value: string;
}
export interface Server {
  model: string;
  price: string;
  ram: ServerStorage;
  location: string;
  hdd: ServerStorage;
}

export interface ServerResponseData {
  resultCount: number;
  results: Server[];
}
export interface ServerApiResponse {
  responseCode: number;
  responseMessage: string;
  responseData: ServerResponseData;
}

export interface ServerFilters {
  pageNumber: number;
  resultsPerPage: number;
  storage: string;
  hardDiskType: string;
  memory: string;
  model: string;
  location: string;
}
