import * as mongoose from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Injectable} from "@nestjs/common";
import {Model} from "mongoose";
import {OrderProblem} from "../types/orderProblem";

@Injectable()
export class OrderProblemsService {
    constructor(
        @InjectModel("OrderProblems") private userModel: Model<OrderProblem>,
    ) {}
}