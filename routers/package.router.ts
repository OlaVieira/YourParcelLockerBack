import {Router} from 'express';
import {PackageRecord} from "../records/package.record";
import {ValErr} from "../utils/errors";

export const packageRouter = Router()
    .get('/', async (req, res) => {
        const packages = await PackageRecord.getAllPackages();
        res.json(packages);
    })

    .get('/search/:id', async (req, res) => {
        const packageInfo = await PackageRecord.getOnePackage(req.params.id);
        res.json(packageInfo);
    })

    .delete('/:id', async (req, res) => {
        const packageToDelete = await PackageRecord.getOnePackage(req.params.id);

        if (!packageToDelete) {
            throw new ValErr('Nie ma takiej paczki.');
        }
        await packageToDelete.delete();
        res.end();
    })
