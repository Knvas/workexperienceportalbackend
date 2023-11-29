export interface UploadFilesParams {
  readonly fileKey: string;
  readonly body: string | Buffer;
  readonly acl?: "public-read" | "private";
}

export interface UploadResponse {
  readonly requestId: string;
  readonly statusCode: number;
  readonly url: string;
}