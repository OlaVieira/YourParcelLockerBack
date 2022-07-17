export interface PackageEntity {
    id: string;
    code: number;
    phone: number;
}

export interface SecPackageEntity extends Omit<PackageEntity, 'id'> {
    id?: string;
}
