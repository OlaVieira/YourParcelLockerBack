import {Router} from 'express';
import {PackageRecord} from "../records/package.record";
import {ValErr} from "../utils/errors";

export const packageRouter = Router()
    .delete('/:code', async (req, res) => {
        const packageToDelete = await PackageRecord.getOnePackage(Number(req.params.code));

        if (!packageToDelete) {
            throw new ValErr('Nie ma takiej paczki.');
        }
        await packageToDelete.delete();
        res.end();
    })
    .get('/', async (req, res) => {
        const packages = await PackageRecord.getAllPackages();
        res.json(packages);
    })

    .get('/search/:code', async (req, res) => {
        const packageInfo = await PackageRecord.getOnePackage(Number(req.params.code));
        res.json(packageInfo);
    })


