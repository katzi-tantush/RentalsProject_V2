export class Calculator{
    static timeDiffInDays(earlyDate: Date, lateDate: Date, dailyCost: number): number | null {
        let timeDiffMilliseconds: number = new Date(lateDate).getTime() - new Date(earlyDate).getTime();
        let timeDiffDays: number = Math.ceil(timeDiffMilliseconds / (1000 * 60 * 60 * 24))
        if (timeDiffMilliseconds < 0) {
            return null;
        }
        return timeDiffDays * dailyCost;
    }
}