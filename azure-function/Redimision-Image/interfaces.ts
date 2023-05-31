export interface IImage {
  name: string;
  mimeType: string;
  filename: string;
  bufferFile: Buffer;
  enconding?: string;
}

export interface IResizeResult {
  error: boolean;
  filename: string;
  width: number;
  image: Buffer;
}
