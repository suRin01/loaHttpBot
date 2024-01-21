export interface File{
    fileIdx?: number;
    fileName: string;
    fileExtension: string;
    filePath: string;
    inputId: string;
    inputDt?: Date;
    updateId?: string;
    updateDt?: Date;
}