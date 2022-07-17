import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'parcel_locker',
    namedPlaceholders: true,
    decimalNumbers: true,
});
