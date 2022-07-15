export type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

type BaseType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type File = BaseType & {
  name: string;
  mime: string;
  size: number;
  provider: string;
  path: string;
  pipeFrom: string;
  thumbnailPipeFrom: string;
}