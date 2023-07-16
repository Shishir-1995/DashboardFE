import { LeaveStatus } from "../enum/leave-status.enum";

export interface LeaveData {
  id: number;
  startDate: Date;
  endDate: Date;
  startSession: number;
  endSession: number;
  reason: string;
  status: LeaveStatus;
  isCancelled: boolean;
  statusChangedBy: string;
  rejectReason: string;
  createdOn: Date;
  updatedOn: Date;
  handoverTask: { assignedTo: string; details: string }[];
  userEmail: string;
}
