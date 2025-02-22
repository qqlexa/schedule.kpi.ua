import moment from "moment";
import { DAYS, TIME_POINTS } from "../../common/constants/scheduleParams";
import { getActiveTimePoint } from "../../common/utils/getActiveTimePoint";
import { Schedule } from '../../models/Schedule';
import { Pair } from '../../models/Pair';

export interface ScheduleMatrixCell extends Pair {
  currentPair: boolean;
}

export type UnknownScheduleMatrixCell = ScheduleMatrixCell | ScheduleMatrixCell[] | null;
export type ScheduleMatrixRow = UnknownScheduleMatrixCell[];

export type ScheduleMatrix = ScheduleMatrixRow[];

export const generateScheduleMatrix = <T extends Pair,>(weekSchedule: Schedule<T>[]): ScheduleMatrix => {
  const scheduleMatrix = new Array(TIME_POINTS.length)
    .fill(null)
    .map(() => new Array(DAYS.length).fill(null));

  const activePair: number = getActiveTimePoint();
  const currentDay = moment().day();

  weekSchedule.forEach((schedule) => {
    const yIndex = DAYS.findIndex((item) => item === schedule.day);

    schedule.pairs.forEach((pair) => {
      const xIndex = TIME_POINTS.findIndex((item) => item === pair.time);
      const cell = scheduleMatrix[xIndex][yIndex];
      let newCell: ScheduleMatrixCell | ScheduleMatrixCell[] = {
        ...pair,
        currentPair:
          activePair !== -1 && currentDay === yIndex && activePair === xIndex,
      };

      if (cell) {
        let extendedCell: ScheduleMatrixCell[] = [];

        if (Array.isArray(cell)) {
          extendedCell = [...cell];
        } else {
          extendedCell = [cell];
        }

        extendedCell.push({ ...pair, currentPair: newCell.currentPair });
        newCell = extendedCell;
      }

      scheduleMatrix[xIndex][yIndex] = newCell;
    });
  });

  return scheduleMatrix;
};
