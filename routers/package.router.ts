import {Router} from 'express';
import {PackageRecord} from "../records/package.record";

export const packageRouter = Router()
    .get('/', async (req, res) => {
        const packages = await PackageRecord.getAllPackages();
        res.json(packages);
    })
    .get('/:id', async (req, res) => {
        const packageInfo = await PackageRecord.getOnePackage(req.params.id);
        res.json(packageInfo);
    })

    .delete('/delete/:id', async (req, res) => {
        await PackageRecord.deletePackage(req.params.id);
    })
