import {FileStorageService} from "./file-storage.service";
import {PutObjectCommand, S3} from "@aws-sdk/client-s3";
import {ConfigService} from "@nestjs/config";
import {Injectable, Logger} from "@nestjs/common";
import {UploadFilesParams, UploadResponse} from "../dto/upload-files.dto";

@Injectable()
export class DoFileStorageService implements FileStorageService {

    private readonly s3Client: S3;
    private readonly logger = new Logger(FileStorageService.name);
    private static BUCKET = "knvas";

    constructor(
        private readonly configService: ConfigService
    ) {
        this.s3Client = new S3({
            forcePathStyle: false,
            endpoint: configService.get("STORAGE_BUCKET_ENDPOINT"),
            region: "us-east-1",
            credentials: {
                accessKeyId: configService.get<string>("STORAGE_BUCKET_KEY"),
                secretAccessKey: configService.get<string>("STORAGE_BUCKET_SECRET")
            }
        });
    }

    async uploadFileToBucket(params: UploadFilesParams): Promise<UploadResponse> {
        try {

            const data = await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: DoFileStorageService.BUCKET,
                    Key: params.fileKey,
                    Body: params.body,
                    ACL: params.acl ?? "public-read"
                })
            );

            const url = `${this.configService.get("STORAGE_BUCKET_CDN_ENDPOINT")}/${params.fileKey}`;

            this.logger.debug(`File has been successfully uploaded to: ${url}`);

            return {
                requestId: data.$metadata.requestId,
                statusCode: data.$metadata.httpStatusCode,
                url,
            };
        } catch (error) {
            this.logger.error("Failed to upload file", error);
        }

        return Promise.resolve(undefined);
    }


}