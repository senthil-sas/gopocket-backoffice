import axios from "axios";
import { authHeader, kycURI } from '../services/env';

export default {
    async loginEmailAndMobile(requestData) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.post(`${kycURI}reEkyc/logIn`, requestData, requestOptions);


    },
    async verifyOTP(requestData) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.post(`${kycURI}reEkyc/verifyLogin`, requestData, requestOptions);
    },
    async UpdateMobileNumber(NewMobile, id) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}reEkyc/updateMobileNo?id=${id}&mobileNo=${NewMobile}`, requestOptions);
    },

    async verifyMobileNumber(otp, id) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}reEkyc/updateMobileNoVerify?id=${id}&updateMobileNoOtp=${otp}`, requestOptions);
    },

    async UpdateEmailId(NewEmail, id) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}reEkyc/updateEmailId?id=${id}&emailID=${NewEmail}`, requestOptions);
    },
    async UpdateEmailIdverify(otp, id) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}reEkyc/updateEmailIdVerify?id=${id}&updateEmailIdOtp=${otp}`, requestOptions);
    },
}

