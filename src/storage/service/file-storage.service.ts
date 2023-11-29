import { UploadFilesParams, UploadResponse } from "../dto/upload-files.dto";

export abstract class FileStorageService {

  abstract uploadFileToBucket(params: UploadFilesParams): Promise<UploadResponse>

}