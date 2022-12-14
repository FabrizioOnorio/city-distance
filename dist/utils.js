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
exports.capitaliseCity = exports.queryRegex = exports.getCoordinates = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const getCoordinates = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, node_fetch_1.default)("https://api.api-ninjas.com/v1/city?name=" + city, {
        headers: {
            "X-Api-Key": process.env.CITY_API_KEY,
        },
    });
    const data = yield response.json();
    if (data.length === 0) {
        return { name: "not found", latitude: 0, longitude: 0 };
    }
    else {
        return {
            name: data[0].name,
            latitude: data[0].latitude,
            longitude: data[0].longitude,
        };
    }
});
exports.getCoordinates = getCoordinates;
const queryRegex = (query) => {
    const stringPattern = /[a-z]+\s?[a-z]+-[a-z]+\s?[a-z]+$/i;
    return stringPattern.test(query);
};
exports.queryRegex = queryRegex;
const capitaliseCity = (city) => {
    return city.charAt(0).toUpperCase() + city.slice(1);
};
exports.capitaliseCity = capitaliseCity;
//# sourceMappingURL=utils.js.map