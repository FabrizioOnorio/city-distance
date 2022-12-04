"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const geolib_1 = require("geolib");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.get("/api/distance/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const citiesSearch = req.query.cities;
        if (!citiesSearch) {
            res.status(400).json({
                message: "Bad request, 'cities' is missing in the quiery. Check the read-me file for instructions.",
            });
        }
        else {
            const requestRegexMatching = (0, utils_1.queryRegex)(citiesSearch);
            if (requestRegexMatching) {
                const citiesArray = citiesSearch.split("-");
                const cityOne = (0, utils_1.capitaliseCity)(citiesArray[0]);
                const cityTwo = (0, utils_1.capitaliseCity)(citiesArray[1]);
                const dataCityOne = yield (0, utils_1.getCoordinates)(cityOne);
                const dataCityTwo = yield (0, utils_1.getCoordinates)(cityTwo);
                if (dataCityOne.name !== "not found" &&
                    dataCityTwo.name !== "not found") {
                    const distance = (0, geolib_1.getDistance)(dataCityOne, dataCityTwo);
                    const response = {
                        cityOne: dataCityOne.name,
                        cityTwo: dataCityTwo.name,
                        distance,
                    };
                    res.send(response);
                }
                else {
                    const response = {
                        cityOne,
                        cityTwo,
                        message: "One of the two cities is either misspelled or does not exist",
                    };
                    res.status(400).json(response);
                }
            }
            else {
                res.status(400).json({
                    message: "Bad request, in the query two cities names need to be present and be separated from '-'. Check the read-me file for more infos.",
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map