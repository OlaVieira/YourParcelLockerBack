import {PackageEntity, SecPackageEntity} from "../types";
import {ValErr} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type PackageRecordResults = [PackageEntity[], FieldPacket[]];

export class PackageRecord implements PackageEntity {
    id: string;
    code: number;
    phone: number;

    constructor(obj: SecPackageEntity) {
        //walidacja! jesli bedzie opcja dodawania psa przez formularz to się przyda i do bazy tez
        if (!obj.code || obj.code > 9999 || obj.code < 1000) {
            throw new ValErr('Kod musi zawierać 4 cyfry!');
        }
        if (!obj.phone || obj.phone > 999999999 || obj.phone < 99999999) {
            throw new ValErr('Numer telefonu musi składać się z 9 cyfr!');
        }



        this.id = obj.id;
        this.code = obj.code;
        this.phone = obj.phone;

    }
    //szukamy konkretnej paczki, pamietaj ze moze byc null, chcemy wszystkie informacje

    static async getOnePackage(id: string): Promise<PackageRecord> | null {
        const [results] = await pool.execute("SELECT * FROM `packages` WHERE `id` = :id", {
            id: id,
        }) as PackageRecordResults;

        return results.length === 0? null : new PackageRecord(results[0]);
    }
    //chcemy wszystkie paczki

    static async getAllPackages(): Promise<PackageEntity[]> | null {
        const [results] = await pool.execute("SELECT * FROM `packages`") as PackageRecordResults;

        return results.length === 0? null : results.map(result => {
            const {
                id, code, phone,
            } = result;
            return {
                id, code, phone,
            };
        });
    }

    //usuwamy paczkę, jeśli ktoś ją odebrał
    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `packages` WHERE `id` = :id", {
            id: this.id,
        });
    }
}
