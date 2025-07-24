import { time, timeStamp } from 'node:console';
import fs from 'node:fs'
import { LogFilters, LogRes } from './types';


export function logParser(path: string, filters: LogFilters) {
    let file: string = '';
    let results: LogRes[] = [];
    try {
        file = fs.readFileSync(path, 'utf-8');
    } catch (err) {
        console.log("Error in oppening file:", err);
        return;
    }

    const lines = file.split('\n');
    const regex = /\[(\d+)\] \[(\S+)\] \[(\w+)\] (.+)/;
    for (const line of lines) {
        const match = line.match(regex);
        if (match) {
            const [full, timestampStr, uuid, type, message] = match;
            if (filters.uuid && uuid !== filters.uuid) continue;
            const timestamp = new Date(Number(timestampStr));
            if(filters.from && filters.from > timestamp) continue;
            if(filters.to && filters.to < timestamp) continue;
            results.push({
                uuid,
                time: timestamp,
                type,
                message
            });
        }
    }
    return results;
}